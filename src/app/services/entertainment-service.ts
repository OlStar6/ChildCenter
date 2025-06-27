import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../shared/api';
import { Observable, Subject } from 'rxjs';
import { Ienters, Ientertanment, IEnterTypeSelect } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
    private enterTypeSubject = new Subject<IEnterTypeSelect>();
  readonly enterType$ = this.enterTypeSubject.asObservable();

  private enterDateSubject = new Subject<Date>();
  readonly enterDate$ = this.enterDateSubject.asObservable();

  private enterAllSubject = new Subject<Ienters>();
  readonly enterEnter$ = this.enterAllSubject.asObservable();

  private clearSubject = new Subject<void>();
  readonly clearEnter$ = this.clearSubject.asObservable();
  
  name: string;
  description: string;
  price: string;
  img: string;
  id: string;
  _id:number;
  age: string;
private apiUrl = 'http://localhost:3002/enters';

  constructor(private http: HttpClient) { }

   EntersAll(): Observable<Ientertanment[]> {
   const enters: Ientertanment = {
    name:this.name,
    description: this.description,
    price:this.price,
    img:this.img,
    age: this.age
   }
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

initChangeEnterType(val:IEnterTypeSelect): void {
  this.enterTypeSubject.next(val);

}
initChangeEnterDate(val:Date): void{
 this.enterDateSubject.next(val);
}
}
