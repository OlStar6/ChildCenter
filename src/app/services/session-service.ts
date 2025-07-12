import { Injectable, OnInit } from '@angular/core';
import { Ienters, Session } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SessionService implements OnInit {
  private sessions: Session[] = [];
  id: string;
  startTime: string;
  endTime: string;
  date: Date;
  availableSlots: number;
  maxSlots: number;
  isAvailable: boolean;
  enterId: string;

  constructor(private http: HttpClient) {
   
  }
  ngOnInit(): void {
const today = new Date();

  }


  getAllSessions(): Observable<Session[]> {
    const path = 'http://localhost:3002/session/'
    const session: Session = {
      startTime: this.startTime,
      endTime: this.endTime,
      date: this.date,
      availableSlots: this.availableSlots,
      maxSlots: this.maxSlots,
      isAvailable: this.isAvailable,
      enterId: this.enterId
    };

    return this.http.get<Session[]>(path);

  }
  getSessionsByEnterId(enterId: string): Observable<Session[]> {
  return this.http.get<Session[]>(`http://localhost:3002/session?enterId=${enterId}`);
}




  getSessionById(id: string): Observable<Session> {
    const path = 'http://localhost:3002/session';
    const sessionId: Session = {
      id: this.id,
      startTime: this.startTime,
      endTime: this.endTime,
      date: this.date,
      availableSlots: this.availableSlots,
      maxSlots: this.maxSlots,
      isAvailable: this.isAvailable,
      enterId: this.enterId
    }
    console.log('session', sessionId.id);
    return this.http.get<Session>(`${path}/${id}`)

  }

  getSessionIdEnter(enterId: string): Observable<Session[]> {
    const path = 'http://localhost:3002';
    const sessionId: Session = {
      id: this.id,
      startTime: this.startTime,
      endTime: this.endTime,
      date: this.date,
      availableSlots: this.availableSlots,
      maxSlots: this.maxSlots,
      isAvailable: this.isAvailable,
      enterId: this.enterId
    }
    console.log('enter', this.enterId);
    return this.http.get<Session[]>(`${path}/session?=${enterId}`)

  }

  deleteSessionId(id:string): Observable<any> {
   //    const path = 'http://localhost:3002/session';
return this.http.delete(`http://localhost:3002/session/${id}`)
  }
  getAvailableSessions(date: Date): Session[] {
    return this.sessions.filter(session =>
      session.date.toDateString() === date.toDateString() &&
      session.isAvailable
    );
  }

  bookSession(sessionId: number): boolean {
    const session = this.sessions.find(s => s.availableSlots === sessionId);
    if (session && session.availableSlots > 0) {
      session.availableSlots--;
      if (session.availableSlots === 0) {
        session.isAvailable = false;
      }
      return true;
    }
    return false;
  }
}