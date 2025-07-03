import { Injectable } from '@angular/core';
import { Session } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessions: Session[] = [];
  id: number;
  startTime: string;
  endTime: string;
  date: Date;
  availableSlots: number;
  maxSlots: number;
  isAvailable: boolean;
  enterId:string;

  constructor(private http: HttpClient) {
    this.generateSampleSessions();
  }

  private generateSampleSessions(): void {
    // Генерация тестовых сеансов
    const today = new Date();
    
   /* this.sessions = [
      {
        id: 1,
        startTime: '09:00',
        endTime: '10:00',
        date: new Date(today),
        availableSlots: 5,
        maxSlots: 10,
        isAvailable: true
      },
      {
        id: 2,
        startTime: '10:00',
        endTime: '11:00',
        date: new Date(today),
        availableSlots: 0,
        maxSlots: 10,
        isAvailable: false
      },
      // Добавьте больше сеансов по необходимости
    ];*/
  }


  getSession(): Observable<Session[]> {
  const session: Session = {
  startTime: this.startTime,
  endTime: this.endTime,
  date: this.date,
  availableSlots: this.availableSlots,
  maxSlots: this.maxSlots,
  isAvailable: this.isAvailable,
  enterId:this.enterId
  }
    
      return this.http.get<Session[]>('http://localhost:3002/session/');
    
  }
  getAvailableSessions(date: Date): Session[] {
    return this.sessions.filter(session => 
      session.date.toDateString() === date.toDateString() && 
      session.isAvailable
    );
  }

  bookSession(sessionId: number): boolean {
    const session = this.sessions.find(s => s.id === sessionId);
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