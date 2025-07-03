export interface IUser {
    login: string;
    psw?: string;
    repeatPsw?: string;
    email?:string
    role?: 'admin' | 'user';
    id?:string;
}
 export interface IUserRegister {
    login: string;
    psw?: string;
    repeatPsw:string;
    email:string

 }
export interface Ienters {
  name: string;
  img: string;
  description: string;
  price: string; 
   id?: string;
  _id?:string;
  age: string;
    date?: string;
}

export interface Ientertanment {
  name: string;
  img: string;
  description: string;
  price: string;
  age: string;
}

export interface IEnterTypeSelect {
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



export interface Appointment {
  id?: number;
  enterId: string;
  timeSlotId: number;
  clientName: string;
  date: Date;
}


  export interface Session {
  id?: number;
  startTime: string;
  endTime: string;
  date?: Date;
  availableSlots?: number;
  maxSlots?: number;
  isAvailable: boolean;
  enterId: string;
}



export interface ICustomStatisticUser {
  login: string,
  email: string,
  }
export interface IStatisticUser {
  login: string,
  email:string

  }


