export interface ILoginErrors {
  email: string;
  password: string;
}

export interface ILoginStore {
  email: string;
  password: string;
  errors: ILoginErrors;
}
