export interface IRegisterErrors {
  email: string;
  password: string;
}

export interface IRegisterStore {
  email: string;
  password: string;
  errors: IRegisterErrors;
}
