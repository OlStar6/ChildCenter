import { Injectable } from '@angular/core';
import { ICustomStatisticUser } from '../models/interfaces';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private http: HttpClient) { }
  getUserStatistic(): Observable<ICustomStatisticUser[]> {
    return this.getUserStatistic1().pipe(
      map((data) => {
        return data.map((e) => ({
          login: e.login,
          email: e.email
        } as ICustomStatisticUser))
      })
    )
  }
  getUserStatistic1() {
    return this.http.get<ICustomStatisticUser[]>("http://localhost:3002/users/")
  }
}
