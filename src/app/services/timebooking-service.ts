import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, TimeSlot } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class TimebookingService {
  private apiUrl = 'http://localhost:3002/enter';
  constructor(private http: HttpClient) { }


  getAvailableSlots(enterId:number, date:Date): Observable<TimeSlot[]> {
    const dateStr = date.toISOString().split('T')[0];
    return this.http.get<TimeSlot[]>(
      '${this.apiUrl}/enterId&date=${dateStr}'
    );
  }

  bookAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  
}
