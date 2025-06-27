import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Session } from '../../../models/interfaces';
import { SessionService } from '../../../services/session-service';


@Component({
  selector: 'app-session-booking',
  templateUrl: './session-booking.html',
  styleUrls: ['./session-booking.scss'],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class SessionBookingComponent implements OnInit {
  selectedDate: Date = new Date();
  availableSessions: Session[] = [];
  bookingSuccess = false;
  bookingError = false;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.availableSessions = this.sessionService.getAvailableSessions(this.selectedDate);
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const date = input.valueAsDate;
    
    // Проверяем, что дата валидна
    if (date) {
      this.selectedDate = date;
      this.loadSessions();
    } else {
      // Можно добавить обработку ошибки, если дата невалидна
      console.error('Invalid date selected');
    }
  }

  bookSession(sessionId: number): void {
    const success = this.sessionService.bookSession(sessionId);
    if (success) {
      this.bookingSuccess = true;
      this.bookingError = false;
      this.loadSessions();
      setTimeout(() => this.bookingSuccess = false, 3000);
    } else {
      this.bookingError = true;
      setTimeout(() => this.bookingError = false, 3000);
    }
  }
}