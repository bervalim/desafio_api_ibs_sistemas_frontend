export interface IPerson {
  id: string;
  name: string;
  email: string;
  password: string;
  sex: string;
  birthDate: string;
  civilState: string;
}

export interface IPersonData {
  name: string | null;
  email: string | null;
  password: string | null;
  sex: string | null;
  birthDate: string | null;
  civilState: string | null;
}

export type TPersonReturn = Omit<IPerson, 'password'>;

export type TRegisterBodyRequest = Omit<IPersonData, 'id'>;

export type TLoginBodyRequest = Pick<IPersonData, 'email' | 'password'>;

export interface IRegisterPersonReturn {
  person: TPersonReturn;
  age: number;
  daysUntilNextBirthday: number;
}
export interface IRegisterPersonReturnBirthday {
  person: TPersonReturn;
  age: number;
  message: string;
}

export interface ILoginPersonReturn {
  token: string;
  person: TPersonReturn;
}
