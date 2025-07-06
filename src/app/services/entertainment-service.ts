import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../shared/api';
import { BehaviorSubject, delay, Observable, Subject, tap } from 'rxjs';
import { IEnterIdSelect, Ienters,  Ientertanment, IEnterTypeSelect, Session } from '../models/interfaces';
import { IOrder, IOrderPerson, IPostorder } from '../models/order';
import { Router } from '@angular/router';
import { Iglory } from '../models/glory';
import { LoaderService } from './loader-service';


@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  private enterTypeSubject = new Subject<IEnterTypeSelect>();
  readonly enterType$ = this.enterTypeSubject.asObservable();

  private enterDateSubject = new Subject<Date>();
  readonly enterDate$ = this.enterDateSubject.asObservable();

  private sessionDateSubject = new Subject<Date>();
  readonly sessionDate$ = this.sessionDateSubject.asObservable();

  private enterAllSubject = new Subject<Session>();
  readonly enterEnter$ = this.enterAllSubject.asObservable();

  private enterIdSubject = new Subject<IEnterIdSelect>();
  readonly enterIdEnter$ = this.enterIdSubject.asObservable();

  private clearSubject = new Subject<void>();
  readonly clearEnter$ = this.clearSubject.asObservable();
  
  name: string;
  description: string;
  price: string;
  img: string;
  id: string;
  _id:string;
  age: string;
  userLogin: string  | null;
  enterId: Ienters;
   personalData: IPostorder;
   image:string;

  startTime: string;
  endTime: string;
  date: Date;
  availableSlots: number;
  maxSlots: number;
  isAvailable: boolean;




  constructor(private http: HttpClient,
    private router:Router,
    
  ) { }

   EntersAll(): Observable<Ientertanment[]> {
     

   const enters: Ientertanment = {
    name:this.name,
    description: this.description,
    price:this.price,
    img:this.img,
    age: this.age
   };
   
    return this.http.get<Ientertanment[]>('http://localhost:3002/enters/');
  }
    

  

  getEnterById(id:string): Observable<Ienters>{ 
    const path = 'http://localhost:3002/enters';
   const enter: Ienters = {
    id:this.id,
    name:this.name,
    description: this.description,
    price:this.price,
    img:this.img,
    age: this.age
   }
    return this.http.get<Ienters>(`${path}/${id}`);
  
  }

 getSession(): Observable<Session[]> {
    const path = 'http://localhost:3002/session/'
          return this.http.get<Session[]>(path);
    
}

initChangeEnterType(val:IEnterTypeSelect): void {
  this.enterTypeSubject.next(val);
  

}
initChangeEnterId(val:IEnterIdSelect): void {
  this.enterIdSubject.next(val);
  

}

initChangeEnterDate(val:Date): void{
 this.enterDateSubject.next(val);
 this.sessionDateSubject.next(val);
}
initChangeSession(val:Session):void{
  this.enterAllSubject.next(val);
}
postOrder(data:any): Observable<any> {
  return this.http.post<any>('http://localhost:3002/order', data)
}
    
    
    GloryAll(): Observable<Iglory[]> {
   const glory: Iglory = {
    id:this.id,
    image:this.image,
    description: this.description,
      }
    return this.http.get<Iglory[]>('http://localhost:3002/glory/');
  }}