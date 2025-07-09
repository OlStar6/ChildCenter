export interface IUser {
  login?: string;
  psw?: string;
  repeatPsw?: string;
  email?: string
  role?: 'admin' | 'user';
  id?: string;
  newPassword?: string;
  repeatPassword?: string;
}
export interface IUserRegister {
  login: string;
  psw?: string;
  repeatPsw?: string;
  email: string

}
export interface Ienters {
  name: string;
  img: string;
  description: string;
  price: string;
  id?: string;
  _id?: string;
  age: string;
  date?: string;
  session?: Session;
}
export interface IServerResponse {
enter:Ienters;
}


export interface Ientertanment {
  id?: string;
  name: string;
  img: string;
  description: string;
  price: string;
  age: string;
  session?: Session;
  _id?: string;
  date?: string;
  enterId?: string;

}

export interface IEnterServerResponse {
  enters: Ientertanment[];
}

export interface IEnterTypeSelect {
  label: string;
  key: string;
  date?: Date;
}
export interface IEnterIdSelect {
  label: string;
  key: string;
  date?: Date;
}
export interface IEnterSelect {
  name: string;
  value: string;
  date?: Date;
}

export interface IFilterTypeLogic {
  key: 'Все' | 'от 4 лет' | 'от 6 лет';
  label?: string
}

export interface ServerError {
  status: number,
  errorText: string
}
export interface IMenuType {
  type: 'custom' | 'extended',
  label: string
}

export const UserStorageKey = 'current_user';

export interface Session {
  id?: string;
  _id?: string;
  startTime: string;
  endTime: string;
  date?: Date;
  availableSlots?: number;
  maxSlots?: number;
  isAvailable: boolean;
  enterId?: string;
}

export interface ICustomStatisticUser {
  login: string,
  email: string,
}

export type Coords = {
  enterid: string;
};