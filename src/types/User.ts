export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
  nickname?: string;
  photo?: string;
  updatedAt: Date;
  createdAt: Date;
}

export type UserGetMeResponse = Promise<Omit<IUser, 'password'>>;
