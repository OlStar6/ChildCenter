import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ienters, Session } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor() {}

private orderDataSubject = new BehaviorSubject<{enterorder:Ienters} | null>(null)
orderData$ = this.orderDataSubject.asObservable();


setOrderData(enterorder:Ienters) {
  this.orderDataSubject.next({enterorder});
}

clearOrderData() {
  this.orderDataSubject.next(null);
}
 


}
