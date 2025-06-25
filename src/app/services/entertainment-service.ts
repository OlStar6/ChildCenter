import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../shared/api';
import { Observable } from 'rxjs';
import { Ienters, Ientertanment } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  name: string;
  description: string;
  price: string;
  img: string;
  id: string;
  _id:number;
private apiUrl = 'http://localhost:3002/enters';

  constructor(private http: HttpClient) { }

   EntersAll(): Observable<Ientertanment[]> {
   const enters: Ientertanment = {
    name:this.name,
    description: this.description,
    price:this.price,
    img:this.img
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
    img:this.img
   }
    return this.http.get<Ienters>(`${path}/${id}`);
  
  }
  
updateEnter(type: any) {

}

updateEnterList(data:any) {

}

}
