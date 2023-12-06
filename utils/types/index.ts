export interface IUser {
  id?: number;
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
  id?: number;
  role_id?: number;
  username?: string;
  email?: string;
  phone?: string;
  age?: number;
  avatar?: string;
  created_date?: Date;
}

export interface IUserGoogle {
  _json: {
    sub: string;
    name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };
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
  getUserById(id: number): Promise<IUserAttributes | undefined>;
}

export interface IUserService {
  checkAndCreateUser(
    email: string,
    name: string,
    picture: string
  ): Promise<any>;
  getUserProfile(email: string): Promise<any>;
  getUserById(id: number): Promise<any>;
}
