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
  getUserByEmail(email: string): Promise<IUserAttributes | undefined>;
  createUser(
    email: string,
    name: string,
    picture: string,
    role_id: number,
    createdDate: Date
  ): Promise<void>;
  getUserById(id: string): Promise<IUserAttributes | undefined>;
}

export interface IUserService {
  checkAndCreateUser(
    email: string,
    name: string,
    picture: string
  ): Promise<any>;
  getUserProfile(email: string): Promise<any>;
  getUserById(id: string): Promise<any>;
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
