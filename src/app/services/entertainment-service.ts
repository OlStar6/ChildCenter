import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, distinctUntilChanged, forkJoin, from, map, Observable, Subject, tap } from 'rxjs';
import { IEnterIdSelect, Ienters, IEnterServerResponse, Ientertanment, IEnterTypeSelect, IServerResponse, Session } from '../models/interfaces';
import { IPostorder } from '../models/order';
import { Iglory } from '../models/glory';



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

  private allSessions$ = new BehaviorSubject<Session[]>([]);
  
  private selectedEntertainmentId$ = new BehaviorSubject<string>('');

  public selectedDate$ = new BehaviorSubject<Date>(new Date());

  name: string;
  description: string;
  price: string;
  img: string;
  id: string;
  _id: string;
  age: string;
  userLogin: string | null;
  enterId: Ienters;
  personalData: IPostorder;
  image: string;



  constructor(private http: HttpClient

  ) { }

// Установка ID развлечения
  setEntertainmentId(id: string): void {
    this.selectedEntertainmentId$.next(id);
  }

  // Установка даты
  setSelectedDate(date: Date): void {
    this.selectedDate$.next(date);
    console.log(date)
  }

  // Обновление всех сеансов
  updateAllSessions(sessions: Session[]): void {
    this.allSessions$.next(sessions);
  }

  // Получение отфильтрованных сеансов
  getFilteredSessions(): Observable<Session[]> {
    return combineLatest([
      this.allSessions$,
      this.selectedEntertainmentId$.pipe(distinctUntilChanged()),
      this.selectedDate$.pipe(distinctUntilChanged())
    ]).pipe(
      map(([sessions, entertainmentId, selectedDate]) => {
        return sessions.filter(session => {
          // Фильтрация по виду развлечения
          const matchesEntertainment = session.enterId === entertainmentId;
          
          // Фильтрация по дате
          const matchesDate = this.isSameDate(session.date, selectedDate);
          
          return matchesEntertainment && matchesDate;
        });
      })
    );
  }

  // Вспомогательная функция для сравнения дат
  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  filterSessions(entertainmentId$: Observable<string>, date$: Observable<Date>): Observable<Session[]> {
  return combineLatest([this.allSessions$, entertainmentId$, date$]).pipe(
    map(([sessions, eId, date]) => 
      sessions.filter(s => 
        s.enterId === eId && this.isSameDate(s.date, date)
      )
    ),
    distinctUntilChanged((prev, curr) => 
      JSON.stringify(prev) === JSON.stringify(curr)
    )
  );
}

  EntersAll(): Observable<Ientertanment[]> {
    const enters: Ientertanment = {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      img: this.img,
      age: this.age
    }
    return this.http.get<Ientertanment[]>('http://localhost:3002/enters');

  }
  showSession(): Observable<Ientertanment[]> {
    const enters = this.http.get<IEnterServerResponse>('http://localhost:3002/enters');
    const sessions = this.http.get<Session[]>('http://localhost:3002/session');

    return forkJoin<[Session[], IEnterServerResponse]>([sessions, enters]).pipe(
      delay(1000),
      map((data) => {
        console.log('***массивы', data)
        let entersWithSession = [] as Ientertanment[];
        const entersArr = data[1];
        console.log('hjk', entersArr)
        const sessionsMap = new Map();

        data[0].forEach(session => {
          sessionsMap.set(session.enterId, session);
        });
        console.log("***ju", entersArr)


        if (Array.isArray(entersArr)) {
          console.log('***entersArr', entersArr)
          entersWithSession = entersArr.map((enter) => {

            return {
              ...enter,
              session: sessionsMap.get(enter._id) || null
            }

          });
        }
        return entersWithSession;

      }
      ));
  }

  getEnterById(id: string): Observable<Ienters> {
    const path = 'http://localhost:3002/enters';
    const enter: Ienters = {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      img: this.img,
      age: this.age
    }
     console.log('enterId', enter.id);
    return this.http.get<Ienters>(`${path}/${id}`);

  }
 

  initChangeEnterType(val: IEnterTypeSelect): void {
    this.enterTypeSubject.next(val);
  }
  initChangeEnterId(val: IEnterIdSelect): void {
    this.enterIdSubject.next(val);
  }

  initChangeEnterDate(val: Date): void {
    this.enterDateSubject.next(val);
    console.log('val',val)
    this.sessionDateSubject.next(val);
  }
  initChangeSession(val: Session): void {
    this.enterAllSubject.next(val);
  }
  postOrder(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3002/order', data)
  }

  GloryAll(): Observable<Iglory[]> {
    const glory: Iglory = {
      id: this.id,
      image: this.image,
      description: this.description,
    }
    return this.http.get<Iglory[]>('http://localhost:3002/glory/');
  }

 
}