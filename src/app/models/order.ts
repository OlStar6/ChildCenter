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
  date: string | null;
  participants: string | null;
  sessionChoice: string | null;

}

export interface IPostorder {

  clientName: string | null;
  childName: string | null;
  age: number | null;
  userId: string | null;
  date: string | null;
  participants: number | null;
  sessionChoice: string | null;
}

export interface IOrderResponse {
  data: IOrder[];
  count: number
}
