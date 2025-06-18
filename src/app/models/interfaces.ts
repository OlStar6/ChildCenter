export interface IUser {
    login: string;
    psw?: string;
      email:string
//    role: 'admin' | 'user';
}
 export interface IUserRegister {
    login: string;
    psw?: string;
    repeatPsw:string;
    email:string

 }
 export interface ServerError{
    status: number,
    errorText:string
}
export interface IMenuType {
  type: 'custom' | 'extended',
  label: string
}


 export const UserStorageKey = 'current_user';

 export interface IBuyer {
    firstName: string,
      lastName: string,
      cardNumber: number,
      birthDate: Date,
      age: number,
      citizenship: string,
    
 }