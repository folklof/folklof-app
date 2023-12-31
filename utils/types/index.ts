export interface IUser {
  id?: string;
  _json?: any;
  role_id?: { id: number; name: string };
  username?: string;
  email?: string;
  phone?: string;
  age?: number;
  avatar?: string;
  created_date?: Date;
}

export interface IUserAttributes {
  id?: string;
  role_id?: number;
  username?: string;
  email?: string;
  phone?: string;
  age?: number;
  avatar?: string;
  created_date?: Date;
}

export interface IResultAttributes {
  status: number;
  success: boolean;
  message: string;
  data: any;
}

export interface IUserDao {
  getUserByEmail(email: string): Promise<IUserAttributes | any>;
  createUser(
    email: string,
    name: string,
    picture: string,
    role_id: number,
    createdDate: Date
  ): Promise<void>;
  getUserById(id: string): Promise<IUserAttributes | any>;
  getAllUsers(): Promise<IUserAttributes[] | any>;
  updateUserById(
    id: string,
    phone: string,
    age: number,
    name: string,
    avatar: string
  ): Promise<IUserAttributes | any>;
}

export interface IUserService {
  checkAndCreateUser(
    email: string,
    name: string,
    picture: string
  ): Promise<any>;
  getUserProfile(email: string): Promise<any>;
  getUserById(id: string): Promise<any>;
  updateUserById(
    id: string,
    phone: string,
    age: number,
    name: string,
    avatar: string
  ): Promise<any>;
}

export interface ICategoryAttributes {
  id?: string | null;
  name?: string | null;
  created_date?: Date | null;
}

export interface ICategoryDao {
  getAllCategories(): Promise<ICategoryAttributes[] | undefined>;
  getCategoryById(id: string): Promise<ICategoryAttributes[] | undefined>;
  getCategoryByName(name: string): Promise<ICategoryAttributes[] | undefined>;
  getOneCategoryByName(name: string): Promise<ICategoryAttributes | any>;
  createCategory(
    name: string,
    desc: string
  ): Promise<ICategoryAttributes[] | undefined>;
  updateCategory(
    id: string,
    name: string,
    desc: string
  ): Promise<ICategoryAttributes[] | undefined>;
  deleteCategory(id: string): Promise<void>;
}

export interface ICategoryService {
  getAllCategories(): Promise<any>;
  getCategoryById(id: string): Promise<any>;
  getCategoryByName(name: string): Promise<any>;
}

export interface IBookAttributes {
  id?: string | null;
  category_id?: string | null;
  agegroup_id?: string | null;
  user_id?: string | null;
  book_code?: string | null;
  title?: string | null;
  desc?: string | null;
  duration?: string | null;
  audio_link?: string | null;
  image_cover?: string | null;
  created_date?: Date | null;
}

export interface IBookDao {
  createBook(
    title: string,
    agegroup_id: string,
    category_id: string,
    user_id: string,
    duration: string,
    desc: string,
    audio_link: string,
    cover_image: string
  ): Promise<IBookAttributes | any>;
  getAllBooks(
    page: number,
    limit: number,
    sort: number,
    agegroup_id?: string,
    category_id?: string
  ): Promise<IBookAttributes[] | undefined>;
  getBookById(id: string): Promise<IBookAttributes[] | undefined>;
  getBookByCode(book_code: string): Promise<IBookAttributes[] | undefined>;
  getBookByTitle(title: string): Promise<IBookAttributes[] | undefined>;
  getOneBookByTitle(title: string): Promise<IBookAttributes | any>;
  getBookByAgeGroupId(id: string): Promise<IBookAttributes[] | undefined>;
  getBookByCategoryId(
    category_id: string
  ): Promise<IBookAttributes[] | undefined>;
  updateBook(
    id: string,
    title: string,
    agegroup_id: string,
    category_id: string,
    user_id: string,
    duration: string,
    desc: string,
    audio_link: string,
    cover_image: string
  ): Promise<IBookAttributes[] | undefined>;
  deleteBook(id: string): Promise<IBookAttributes[] | undefined>;
  getCategoryById(id: string): Promise<ICategoryAttributes[] | undefined>;
  getAgeGroupById(id: string): Promise<IAgeGroupAttributes[] | undefined>;
}

export interface IBookService {
  createBook(
    title: string,
    agegroup_id: string,
    category_id: string,
    user_id: string,
    duration: string,
    desc: string,
    audio_link: string,
    cover_image: string
  ): Promise<any>;
  getAllBooks(
    page: number,
    limit: number,
    sort: number,
    agegroup_id?: string,
    category_id?: string
  ): Promise<any>;
  getBookById(id: string): Promise<any>;
  getBookByCode(book_code: string): Promise<any>;
  getBookByTitle(title: string): Promise<any>;
  getBookByCategoryId(category_id: string): Promise<any>;
  getBookByAgeGroupId(agegroup_id: string): Promise<any>;
  uploadImageToS3(image_file: any, title_book: string): Promise<any>;
  updateBook(
    id: string,
    title: string,
    category_id: string,
    agegroup_id: string,
    user_id: string,
    desc: string,
    duration: string,
    audio_link: string,
    cover_image: string
  ): Promise<any>;
  deleteBook(id: string): Promise<any>;
}

export interface IRoleAttributes {
  id?: number;
  name?: string;
}

export interface IRoleDao {
  getAllRoles(): Promise<IRoleAttributes[] | any>;
  getRoleById(id: number): Promise<IRoleAttributes[] | any>;
}

export interface IRoleService {
  getAllRoles(): Promise<any>;
}

export interface IAgeGroupAttributes {
  id?: string | null;
  name?: string | null;
  created_date?: Date | null;
}

export interface IAgeGroupDao {
  getAllAgeGroups(): Promise<IAgeGroupAttributes[] | undefined>;
  getAgeGroupById(id: string): Promise<IAgeGroupAttributes[] | undefined>;
}

export interface IAgeGroupService {
  getAllAgeGroups(): Promise<any>;
  getAgeGroupById(id: string): Promise<any>;
}

export interface IReviewAttributes {
  id?: string | null;
  user_id?: string | null;
  book_id?: string | null;
  rating?: number | null;
  comment?: string | null;
  created_date?: Date | null;
}

export interface IReviewDao {
  createReview(
    user_id: string,
    book_id: string,
    title: string,
    description: string,
    rating: number
  ): Promise<IReviewAttributes | any>;
  getAllReviews(): Promise<IReviewAttributes[] | undefined>;
  getReviewById(id: string): Promise<IReviewAttributes[] | undefined>;
  getUserById(id: string): Promise<IUserAttributes[] | undefined>;
  getBookById(id: string): Promise<IBookAttributes[] | undefined>;
  getBookRatingAverage(
    book_id: string
  ): Promise<IReviewAttributes[] | undefined>;
  getReviewByBookId(book_id: string): Promise<IReviewAttributes[] | undefined>;
  updateReviewById(
    id: string,
    user_id: string,
    title: string,
    description: string,
    rating: number
  ): Promise<IReviewAttributes[] | undefined>;
  deleteReviewById(
    id: string,
    user_id: string
  ): Promise<IReviewAttributes[] | undefined>;
}

export interface IReviewService {
  createReview(
    user_id: string,
    book_id: string,
    title: string,
    description: string,
    rating: number
  ): Promise<any>;
  getAllReviews(): Promise<any>;
  getReviewById(id: string): Promise<any>;
  getBookRatingAverage(book_id: string): Promise<any>;
  getReviewByBookId(book_id: string): Promise<any>;
  deleteReviewById(id: string, user_id: string): Promise<any>;
}

export interface IBookQuizAttributes {
  id?: string | null;
  book_id?: string | null;
  question?: string | null;
  option1?: string | null;
  option2?: string | null;
  option3?: string | null;
  correct_answer?: string | null;
  created_date?: Date | null;
}

export interface IBookQuizDao {
  createBookQuiz(
    book_id: string,
    question: string,
    option1?: string,
    option2?: string,
    option3?: string,
    correct_answer?: string
  ): Promise<IBookQuizAttributes | any>;
  getAllBookQuizzes(): Promise<IBookQuizAttributes[] | undefined>;
  getBookQuizById(id: string): Promise<IBookQuizAttributes[] | undefined>;
  answerBookQuiz(
    id: string,
    answer: string
  ): Promise<{ correct: boolean } | undefined>;
  getBookQuizByBookId(
    book_id: string
  ): Promise<IBookQuizAttributes[] | undefined>;
  updateBookQuizById(
    id: string,
    book_id: string,
    question: string,
    option1?: string,
    option2?: string,
    option3?: string,
    correct_answer?: string
  ): Promise<IBookQuizAttributes | undefined>;
  deleteBookQuizById(id: string): Promise<IBookQuizAttributes | undefined>;
}

export interface IBookQuizService {
  createBookQuiz(
    book_id: string,
    question: string,
    option1?: string,
    option2?: string,
    option3?: string,
    correct_answer?: string
  ): Promise<any>;
  getAllBookQuizzes(): Promise<any>;
  getBookQuizById(id: string): Promise<any>;
  answerBookQuiz(id: string, answer: string): Promise<any>;
  getBookQuizByBookId(book_id: string): Promise<any>;
  updateBookQuizById(
    id: string,
    book_id: string,
    question: string,
    option1?: string,
    option2?: string,
    option3?: string,
    correct_answer?: string
  ): Promise<any>;
  deleteBookQuizById(id: string): Promise<any>;
}

export interface IHistoryQuizAttributes {
  id?: string | null;
  user_id?: string | null;
  book_id?: string | null;
  score?: number | null;
  created_date?: Date | null;
}

export interface IHistoryQuizDao {
  createHistoryQuiz(
    user_id: string,
    book_id: string,
    score: number
  ): Promise<IHistoryQuizAttributes | any>;
  getAllHistoryQuizzes(): Promise<IHistoryQuizAttributes[] | undefined>;
  getHistoryQuizById(id: string): Promise<IHistoryQuizAttributes[] | undefined>;
  getBookQuizById(book_id: string): Promise<IBookQuizAttributes[] | undefined>;
  getHistoryQuizByBookQuizId(
    bookquiz_id: string
  ): Promise<IHistoryQuizAttributes[] | undefined>;
  getUserById(user_id: string): Promise<IUserAttributes[] | undefined>;
  getHistoryQuizByUserIdAndBookQuizId(
    bookquiz_id: string,
    user_id: string
  ): Promise<IHistoryQuizAttributes[] | undefined>;
  getHistoryQuizByUserId(
    user_id: string
  ): Promise<IHistoryQuizAttributes[] | undefined>;
  updateScoresHistoryQuizById(
    id: string,
    score: number
  ): Promise<IHistoryQuizAttributes | undefined>;
  deleteHistoryQuizById(
    id: string
  ): Promise<IHistoryQuizAttributes | undefined>;
}

export interface IHistoryQuizService {
  createHistoryQuiz(
    user_id: string,
    book_id: string,
    score: number
  ): Promise<any>;
  getAllHistoryQuizzes(): Promise<any>;
  getHistoryQuizById(id: string): Promise<any>;
  getHistoryQuizByBookQuizId(bookquiz_id: string): Promise<any>;
  getHistoryQuizByUserId(user_id: string): Promise<any>;
  updateScoresHistoryQuizById(id: string, score: number): Promise<any>;
  deleteHistoryQuizById(id: string): Promise<any>;
  getHistoryQuizByUserIdAndBookQuizId(
    bookquiz_id: string,
    user_id: string
  ): Promise<any>;
  calculateTotalScoreForUserInBookQuiz(
    user_id: string,
    bookquiz_id: string
  ): Promise<any>;
}

export interface ILibraryAttributes {
  id?: string | null;
  user_id?: string | null;
  book_id?: string | null;
  is_read?: boolean | null;
  created_date?: Date | null;
}

export interface ILibraryDao {
  createLibrary(
    user_id: string,
    book_id: string,
    is_read: boolean
  ): Promise<ILibraryAttributes | any>;
  getAllLibraries(): Promise<ILibraryAttributes[] | undefined>;
  getLibraryById(id: string): Promise<ILibraryAttributes[] | undefined>;
  getLibraryByUserIdAndBookId(
    user_id: string,
    book_id: string
  ): Promise<ILibraryAttributes[] | undefined>;
  getUserById(user_id: string): Promise<IUserAttributes[] | undefined>;
  getLibraryIsReadByUserId(
    user_id: string,
    is_read: boolean
  ): Promise<ILibraryAttributes[] | undefined>;
  getLibraryByUserId(
    user_id: string
  ): Promise<ILibraryAttributes[] | undefined>;
  updateIsReadLibraryById(
    id: string,
    is_read: boolean
  ): Promise<ILibraryAttributes | undefined>;
  deleteLibraryById(id: string): Promise<ILibraryAttributes | undefined>;
}

export interface ILibraryService {
  createLibrary(
    user_id: string,
    book_id: string,
    is_read: boolean
  ): Promise<any>;
  getAllLibraries(): Promise<any>;
  getLibraryIsReadByUserId(user_id: string, is_read: boolean): Promise<any>;
  getLibraryByUserId(user_id: string): Promise<any>;
  updateIsReadLibraryById(id: string, is_read: boolean): Promise<any>;
  deleteLibraryById(id: string): Promise<any>;
}

export interface IFavouriteAttributes {
  id?: string | null;
  user_id?: string | null;
  book_id?: string | null;
  is_added?: boolean | null;
  created_date?: Date | null;
}

export interface IFavouriteDao {
  createFavourite(
    user_id: string,
    book_id: string,
    is_added: boolean
  ): Promise<IFavouriteAttributes | any>;
  getAllFavourites(): Promise<IFavouriteAttributes[] | undefined>;
  getUserById(user_id: string): Promise<IUserAttributes[] | undefined>;
  getFavouriteById(id: string): Promise<IFavouriteAttributes[] | undefined>;
  getFavouriteByUserIdAndBookId(
    user_id: string,
    book_id: string
  ): Promise<IFavouriteAttributes[] | undefined>;
  getFavouriteIsFavouriteByUserId(
    user_id: string,
    is_added: boolean
  ): Promise<IFavouriteAttributes[] | undefined>;
  getFavouriteByUserId(
    user_id: string
  ): Promise<IFavouriteAttributes[] | undefined>;
  updateIsAddedFavouriteById(
    id: string,
    is_added: boolean
  ): Promise<IFavouriteAttributes | undefined>;
  deleteFavouriteById(id: string): Promise<IFavouriteAttributes | undefined>;
}

export interface IFavouriteService {
  createFavourite(
    user_id: string,
    book_id: string,
    is_added: boolean
  ): Promise<any>;
  getAllFavourites(): Promise<any>;
  getFavouriteIsFavouriteByUserId(
    user_id: string,
    is_added: boolean
  ): Promise<any>;
  getFavouriteByUserId(user_id: string): Promise<any>;
  updateIsAddedFavouriteById(id: string, is_added: boolean): Promise<any>;
  deleteFavouriteById(id: string): Promise<any>;
}
