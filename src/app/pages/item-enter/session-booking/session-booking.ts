import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Session } from '../../../models/interfaces';
import { SessionService } from '../../../services/session-service';
import { CardModule } from 'primeng/card';
import { EntertainmentService } from '../../../services/entertainment-service';
import { isValid } from 'date-fns';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-session-booking',
  templateUrl: './session-booking.html',
  styleUrls: ['./session-booking.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule
  ],
})
export class SessionBookingComponent implements OnInit {
  selectedDate: Date = new Date();
  session: any = [];
  sessionStore: Session[] = [];
  bookingSuccess = false;
  bookingError = false;
  subscription: Subscription;

  constructor(private sessionService: SessionService, 
    private entersService:EntertainmentService,
  private router:Router) {}

  ngOnInit(): void {
    this.loadSessions();
      this.sessionService.getSession().subscribe((data) => {
      if (Array.isArray(data)) {
        this.session = data;
        this.sessionStore = [...data];
      }
    });
this.subscription = this.entersService.enterEnter$.subscribe((enter) => {
     
      switch (enter.enterId) {

        case '685c60aad8810aa93c3389ca':
            this.session = this.sessionStore.filter((el) => el.enterId === '685c60aad8810aa93c3389ca')
        break;
        case '685c60bad8810aa93c3389cc':
            this.session = this.sessionStore.filter((el) => el.enterId === '685c60bad8810aa93c3389cc')
        break;
        case '685c60c9d8810aa93c3389ce':
            this.session = this.sessionStore.filter((el) => el.enterId === '685c60c9d8810aa93c3389ce')
        break;
        case '685c60d7d8810aa93c3389d0':
            this.session = this.sessionStore.filter((el) => el.enterId === '685c60d7d8810aa93c3389d0')
        break;
        case 'Все':
          this.session = [...this.sessionStore];
        break;
          }
}
)
  this.entersService.sessionDate$.subscribe((date) => {

      console.log('****date', date);
  
      this.session = this.sessionStore.filter((enter)=>{
     if (NaN) {
      return this.session=this.sessionStore;
     }

       else if (isValid (new Date(enter.date))) {

          const sessionDate = new Date(enter.date).setHours(0, 0, 0, 0);
          console.log('****sessionDate', sessionDate)
          const calendarDate = new Date(date).setHours(0, 0, 0);
          console.log('****calendarDate', calendarDate)
          return sessionDate === calendarDate;
        }else {
          return false;
        }
  }
);})
  }
  loadSessions(): void {
    this.sessionStore = this.sessionService.getAvailableSessions(this.selectedDate);
  }

  bookSession(sessionId: number): void {
    const success = this.sessionService.getSession();
    if (success) {
      this.bookingSuccess = true;
      this.bookingError = false;
      this.loadSessions();
       setTimeout(() => this.bookingSuccess = false, 1000);
    } else {
      this.bookingError = true;
      setTimeout(() => this.bookingError = false, 1000);
    }
    this.router.navigate(["order"])
    console.log('success', success)
  }
  }
  /*  
 
 
  loadSessions(): void {
    this.SessionStore = this.sessionService.getAvailableSessions(this.selectedDate);
  }

  /*onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const date = input.valueAsDate;
    
       if (date) {
      this.selectedDate = date;
      this.loadSessions();
    } else {
      console.error('Invalid date selected');
    }
  }

  
}*/