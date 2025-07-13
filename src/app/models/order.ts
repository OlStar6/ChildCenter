export interface IOrder {
  enterId?: string | null,
  sessionId?: string | null,
  userId?: string | null,
  orderPerson?: IOrderPerson,
}
export interface IOrderPerson {
  clientName: string,
  childName: string,
  age: number,
  date: Date | null;
  participants: string | null;
  sessionChoice: string | null;

}

export interface IPostorder {

  clientName: string | null;
  childName: string | null;
  age: number | null;
  userId: string | null;
  date: Date | null;
  participants: number | null;
  enter: string | null;
  startTime:string | null;
  sessionId:number;
}

export interface IOrderResponse {
  data: IOrder[];
  count: number
}
