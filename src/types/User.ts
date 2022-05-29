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
  birthday?: string;
  phone?: string;
  hobbies?: string;
  job?: string;
  school?: string;
  university?: string;
  photo: string;
  backgroundAvatar: string;
  lastOnline: Date;
  updatedAt: Date;
  createdAt: Date;
  subscribed: IUser['_id'][];
  subscribers: IUser['_id'][];
}

export interface UserData
  extends Omit<IUser, 'password' | 'createdAt' | 'updatedAt' | 'lastOnline'> {
  createdAt: string;
  updatedAt: string;
  lastOnline: string;
}

export type UpdateUserParams = Partial<
  Pick<IUser, 'fullName' | 'nickname' | 'photo' | 'backgroundAvatar' | 'lastOnline'>
>;

export type GetUserResponse = Promise<UserData>;

export type GetNonPaginatedUsersResponse = Promise<UserData[]>;

export interface GetCommunityPayload {
  userId: IUser['_id'];
  type: 'subscribers' | 'subscribed';
}

export type GetCommunityResponse = Promise<UserData[]>;
