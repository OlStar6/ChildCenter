import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomStatisticUser, IStatisticUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatisticRest {

  constructor(  private http: HttpClient
  ) {
  }

  getUserStatistic() {
    return this.http.get <ICustomStatisticUser[]>("http://localhost:3002/users/")
  }
}

