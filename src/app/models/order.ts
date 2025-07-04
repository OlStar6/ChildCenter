import { Ienters, Session } from "./interfaces";

export interface IOrder {
  enterId?: string | null,
  sessionId?: string | null,
  userId?: string | null,
  orderPerson?: IOrderPerson,
}
export interface IOrderPerson {
  clientName: string,
  childName: string,
  cardNumber: number,
  age: number,
  birthDate: string,

}

export interface IPostorder {

  clientName: string | null;
  childName: string  | null;
  age: string  | null;
  birthDate: string  | null;
  userId: string  | null;
  //enterId: string  | null;
 // sessionId: string  | null;
  date: string  | null;
  participants: string  | null;
enterChoice: string  | null;
      sessionChoice: string  | null;
}
export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}
export interface Booking {
  id?: number;
  clientName: string;
  email: string;
  phone: string;
  enterId: string;
  date: string;
  timeSlot: TimeSlot;
  participants: number;
  specialRequests: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface IOrderResponse {
  data: IOrder[];
  count: number
}

export interface Icol {
  field: string,
  header: string,
  subfield: string,
  isDate?: boolean

}
