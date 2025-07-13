import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ienters, Session } from '../../../models/interfaces';
import { SessionService } from '../../../services/session-service';
import { CardModule } from 'primeng/card';
import { EntertainmentService } from '../../../services/entertainment-service';
import { isValid } from 'date-fns';
import { Observable, Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-session-booking',
  templateUrl: './session-booking.html',
  styleUrls: ['./session-booking.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DatePickerModule
   
  ],
})
export class SessionBookingComponent implements OnInit {
    enters_sessions: Session[] = [];
  enters_sessionStore: Session[] = [];
  date:Date = null;
  selectedDate: Date = new Date();
  session: any = [];
  sessionStore: Session[] = [];
  bookingSuccess = false;
  bookingError = false;
  subscription: Subscription;
  enterId: string;
  enter: Ienters;
  entertainment$: Observable<Ienters>;
  relatedSessions$: Observable<Session[]>;
  dateEnterFilter:Date;
  constructor(private sessionService: SessionService,
    private entersService: EntertainmentService,
    private router: Router,
  private route: ActivatedRoute,
) { }
  ngOnInit(): void {
    this.loadSessions();
    this.sessionService.getAllSessions().subscribe((data) => {
      if (Array.isArray(data)) {
        this.session = data;
        this.sessionStore = [...data];
      }
    });
    const id = this.route.snapshot.paramMap.get('id');
      this.entertainment$ = this.entersService.getEnterById(id);
      this.relatedSessions$ = this.sessionService.getSessionsByEnterId(id);

      
   /* this.entersService.enterDate$.subscribe((date) => {
      console.log('****date', date);
      this.session = this.sessionStore.filter((session) => {
        if (NaN) {
          return this.session = this.sessionStore;
        }
        else if (isValid(new Date(session.date))) {
          const sessionDate = new Date(session.date).setHours(0, 0, 0, 0);
          console.log('****sessionDate', sessionDate)
          const calendarDate = new Date(date).setHours(0, 0, 0);
          console.log('****calendarDate', calendarDate)
          return sessionDate === calendarDate;
        } else {
          return false;
        }
      }
      );
    })*/
  }
  loadSessions(): void {
    this.session = this.sessionService.getAvailableSessions(this.selectedDate);
  }
  bookSession(sessionId: number): void {
    const success = this.sessionService.getAllSessions();
    if (success) {
      this.bookingSuccess = true;
      this.bookingError = false;
      this.loadSessions();
      setTimeout(() => this.bookingSuccess = false, 1000);
    } else {
      this.bookingError = true;
      setTimeout(() => this.bookingError = false, 1000);
    };
    this.router.navigate([['enters/order', this.enter._id]])
    console.log('success', success)
  }
 
  
    
 /* getSessionIdEnter(enterid: string) {
    this.sessionService.getSessionIdEnter(enterid);
  }*/
  changeDate(ev: Date): void {
    /*const input = event.target as HTMLInputElement;
    const date = input.valueAsDate;*/
    console.log('ev', ev)
    this.entersService.initChangeEnterDate(ev);
  }
}

/*this.subscription = this.entersService.enterEnter$.subscribe((enter) => {
     
      switch (enter._id) {

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
        
          }
}
)*/