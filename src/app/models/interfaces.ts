export interface IUser {
    login: string;
    password?: string;
//    role: 'admin' | 'user';
}
 export interface IUserRegister {
    login: string;
    password?: string;

 }

 export const UserStoragKey = 'current_user';

 export interface IBuyer {
    firstName: string,
      lastName: string,
      cardNumber: number,
      birthDate: Date,
      age: number,
      citizenship: string,
    
 }