export interface IUser {
    login: string;
    psw?: string;
    repeatPsw?: string;
    email?:string
//    role: 'admin' | 'user';
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
  _id?:number;
  age: string;
  type?: string;
  key?:string;
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

 
export interface TimeSlot {
  id: number;
  date: Date;
  startTime: string; // Формат "HH:mm"
  endTime: string;
  isAvailable: boolean;
  enterId: number;
}

export interface Appointment {
  id?: number;
  enterId: number;
  timeSlotId: number;
  clientName: string;
  date: Date;
}


  export interface Session {
  id: number;
  startTime: string;
  endTime: string;
  date: Date;
  availableSlots: number;
  maxSlots: number;
  isAvailable: boolean;
}
