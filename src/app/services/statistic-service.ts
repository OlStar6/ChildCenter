import { Injectable } from '@angular/core';
import { ICustomStatisticUser } from '../models/interfaces';
import { StatisticRest } from './statistic-rest';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private statisticRestService: StatisticRest) { }

  
  getUserStatistic(): Observable<ICustomStatisticUser[]> {
    return this.statisticRestService.getUserStatistic().pipe(
      map((data) => {
        return data.map((e) => ({
          login: e.login,
          email: e.email          
        } as ICustomStatisticUser))
      })
    )
  }
}
