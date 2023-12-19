import StandardError from "../utils/constants/standardError";
import { IBookService, IBookDao } from "../utils/types";
import openai from "../utils/config/openAiConfig";
import { randomInt } from "crypto";
import { S3_AWS, S3_BUCKET } from "../utils/config/awsConfig";

class BookService implements IBookService {
  private bookDao: IBookDao;

  constructor(bookDao: IBookDao) {
    this.bookDao = bookDao;
  }

  async createBook(
    title: string,
    category_id: string,
    agegroup_id: string,
    desc: string,
    duration: string,
    audio_link: string,
    cover_image: string
  ) {
    try {
      const getCategoryId = await this.bookDao.getCategoryById(category_id);
      const getAgeGroupById = await this.bookDao.getAgeGroupById(agegroup_id);
      const getBookTitle = await this.bookDao.getOneBookByTitle(title);

      if (!getAgeGroupById || getAgeGroupById.length === 0) {
        throw new StandardError({
          success: false,
          message:
            "Error creating a book: Age group not found. Please check the age group ID",
          status: 404,
        });
      }

      if (!getCategoryId || getCategoryId.length === 0) {
        throw new StandardError({
          success: false,
          message:
            "Error creating a book: Category not found. Please check the category ID",
          status: 404,
        });
      }

      if (getBookTitle) {
        throw new StandardError({
          success: false,
          message: "Error creating a book: Book title already exists",
          status: 400,
        });
      }

      const book = await this.bookDao.createBook(
        title,
        category_id,
        agegroup_id,
        desc,
        duration,
        audio_link,
        cover_image
      );

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error creating book");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async generateBookByAI(user_prompt: string, agegroup_id: string) {
    try {
      const user = await this.bookDao.getAgeGroupById(agegroup_id);

      if (!user || user.length === 0) {
        throw new StandardError({
          success: false,
          message: "Age group not found",
          status: 404,
        });
      }
      const generateBook = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a story teller expert that could generate children's story books. Your goal is to create engaging, fun, and age-appropriate stories based on user prompts. The English grammar level should based on ${user[0].name} kids, make it easier for them to understand & learn. Maximum character story should be 1200`,
          },
          { role: "user", content: user_prompt },
        ],
        model: "gpt-3.5-turbo-1106",
        max_tokens: 1000,
      });

      return {
        success: true,
        message: generateBook.choices[0]?.message?.content,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error generating book by AI");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async generateBookByAIStream(
    user_prompt: string,
    title_book: string,
    agegroup_id: string
  ) {
    try {
      const user = await this.bookDao.getAgeGroupById(agegroup_id);

      if (!user || user.length === 0) {
        throw new StandardError({
          success: false,
          message: "Age group not found",
          status: 404,
        });
      }

      const generateBook = openai.beta.chat.completions.stream({
        messages: [
          {
            role: "system",
            content: `You are a story teller expert that could generate children's story books only. Your goal is to create engaging, fun, and age-appropriate stories based on user prompt and its title name: ${title_book}. The grammar level should be like ${user[0].name} kids, make it easier for them to understand & learn. Maximum character story should be 1000`,
          },
          { role: "user", content: user_prompt },
        ],
        model: "gpt-3.5-turbo-1106",
        max_tokens: 1000,
      });

      for await (const chunk of generateBook) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
      }

      const chatCompletion = await generateBook.finalChatCompletion();

      return {
        success: true,
        message: chatCompletion.choices[0]?.message?.content,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error generating book by AI");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async generateTextToSpeechByAI(book_story: string, title_book: string) {
    try {
      const models = ["alloy", "fable", "shimmer", "echo", "onyx", "nova"];
      const randomModelIndex = randomInt(0, models.length);
      const selectedModel = models[randomModelIndex];

      const mp3 = await openai.audio.speech.create({
        model: "tts-1-hd",
        voice: selectedModel as "alloy" | "fable" | "shimmer" | "echo",
        input: book_story,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());

      const uploadParams: any = {
        Bucket: S3_BUCKET,
        Key: `audio/${title_book}.mp3`,
        Body: buffer,
        ACL: "public-read",
      };

      const uploadResult = await S3_AWS.upload(uploadParams).promise();

      return {
        success: true,
        message: uploadResult.Location,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error generating text to speech by AI");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async uploadImageToS3(image_file: any) {
    try {
      const uploadParams: any = {
        Bucket: S3_BUCKET,
        Key: `images/${image_file.originalname}`,
        Body: image_file.buffer,
        ACL: "public-read",
      };

      const uploadResult = await S3_AWS.upload(uploadParams).promise();

      return {
        success: true,
        message: uploadResult.Location,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error uploading image to S3");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async generateImageByAI(book_story: string, title_book: string) {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Children's story book image, only for front page. It should have the title image with "${title_book}". The story is about ${book_story}`,
        n: 1,
        size: "1024x1024",
      });

      if (!response.data) {
        throw new StandardError({
          success: false,
          message: "Error generating image by AI",
          status: 400,
        });
      }

      return {
        success: true,
        message: response.data[0].url,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error generating image by AI");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAllBooks(
    page: number,
    limit: number,
    sort: number,
    agegroup_id: string,
    category_id: string
  ) {
    try {
      const books = await this.bookDao.getAllBooks(
        page,
        limit,
        sort,
        category_id,
        agegroup_id
      );

      if (!books || books.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: books,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving all books");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookById(id: string) {
    try {
      const book = await this.bookDao.getBookById(id);

      if (!book || book.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book found",
          status: 404,
        });
      }

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by ID");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateBook(
    id: string,
    title: string,
    category_id: string,
    agegroup_id: string,
    duration: string,
    desc: string,
    audio_link: string,
    cover_image: string
  ) {
    try {
      const getCategoryId = await this.bookDao.getCategoryById(category_id);
      const getAgeGroupById = await this.bookDao.getAgeGroupById(agegroup_id);
      const getBookTitle = await this.bookDao.getOneBookByTitle(title);

      if (!getAgeGroupById || getAgeGroupById.length === 0) {
        throw new StandardError({
          success: false,
          message:
            "Error updating a book: Age group not found. Please check the age group ID",
          status: 404,
        });
      }

      if (!getCategoryId || getCategoryId.length === 0) {
        throw new StandardError({
          success: false,
          message:
            "Error updating a book: Category not found. Please check the category ID",
          status: 404,
        });
      }

      if (getBookTitle) {
        throw new StandardError({
          success: false,
          message: "Error updating a book: Book title already exists",
          status: 400,
        });
      }

      const book = await this.bookDao.updateBook(
        id,
        title,
        category_id,
        agegroup_id,
        desc,
        duration,
        audio_link,
        cover_image
      );

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error updating book");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookByAgeGroupId(agegroup_id: string): Promise<any> {
    try {
      const books = await this.bookDao.getBookByAgeGroupId(agegroup_id);

      if (!books || books.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: books,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by age group");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by age group",
        status: 500,
      });
    }
  }

  async deleteBook(id: string) {
    try {
      const book = await this.bookDao.deleteBook(id);

      if (!book || book.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error deleting book");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookByCategoryId(category_id: string) {
    try {
      const books = await this.bookDao.getBookByCategoryId(category_id);

      if (!books || books.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: books,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by category");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by category",
        status: 500,
      });
    }
  }

  async getBookByTitle(title: string) {
    try {
      const books = await this.bookDao.getBookByTitle(title);

      if (!books || books.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: books,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by title");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookByCode(book_code: string) {
    try {
      const book = await this.bookDao.getBookByCode(book_code);

      if (!book || book.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by code");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default BookService;
