interface IUser {
  email: string;
}

export interface IAppStore {
  theme: string;
  user: IUser | null;
}
