import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule} from '@angular/common';
import { Ienters, Session } from '../../models/interfaces';
import { EntertainmentService } from '../../services/entertainment-service';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../services/session-service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { isValid } from 'date-fns';


@Component({
  selector: 'app-item-enter',
  imports: [ButtonModule, CommonModule, CardModule, FormsModule, RouterLink],
  templateUrl: './item-enter.html',
  styleUrl: './item-enter.scss',

})
export class ItemEnter implements OnInit {
   enters_sessions: Session[] = [];
  enters_sessionStore: Session[] = [];
  filteredSessions$:Observable<Session[]>
   entertainment$: Observable<Ienters>;
  relatedSessions$: Observable<Session[]>;
  enterId: string;
  sessionId:string;
  enter: Ienters;
  session:Session;
  selectedDate: Date = new Date();
   dateEnterFilter:Date;
  private selectedDate$ = new BehaviorSubject<Date>(new Date());

  private sessions$ = new BehaviorSubject<Session[]>([]);
 


  constructor(
    private route: ActivatedRoute,
    private entersService:EntertainmentService,
    private sessionService:SessionService,
    private router:Router

  ) {}

  ngOnInit() {
    this.enterId = this.route.snapshot.paramMap.get('id');
      console.log('enterId', this.enterId)
      this.entersService.getEnterById(this.enterId).subscribe((enter)=> {
        this.enter = enter;
        })
        this.sessionId = this.route.snapshot.paramMap.get('id');
      console.log('sessionId', this.sessionId)
      this.sessionService.getSessionById(this.sessionId).subscribe((session)=> {
        this.session = session;
       
        })
         


this.filteredSessions$ = this.entersService.getFilteredSessions();


    const id = this.route.snapshot.paramMap.get('id');
    this.entertainment$ = this.entersService.getEnterById(id);
    console.log('enter',this.entertainment$)
        console.log('enter', this.entertainment$)
    const allSessions$ = this.sessionService.getAllSessions();
     console.log('all', allSessions$)
    this.relatedSessions$ = combineLatest([this.entertainment$, allSessions$]).pipe(
 
    map(([entertainment, sessions]) => 
    sessions.filter(session => session.enterId === entertainment._id)
    )
   )
  console.log('id', this.relatedSessions$)
    //Date
  this.entersService.enterDate$.subscribe((date) => {
            console.log('****date', date);
         //this.initTourFilterLogic();
           //if (date = null) {
            this.enters_sessions = this.enters_sessionStore.filter((enter)=>{
           if (NaN) {
            return this.enters_sessions=this.enters_sessionStore;
           }
      
             else if (isValid (new Date(enter.date))) {
      
                const sessionDate = new Date(this.session.date).setHours(0, 0, 0, 0);
                console.log('****enterDate', sessionDate)
                const calendarDate = new Date(date).setHours(0, 0, 0);
                console.log('****calendarDate', calendarDate)
                return sessionDate === calendarDate;
              }else {
                return false;
              }
        }
      );})
      
  
  }
   // Установить выбранную дату
  setSelectedDate(date: Date): void {
    this.selectedDate$.next(date);
  }
  
  // Обновить список сессий
  updateSessions(sessions: Session[]): void {
    this.sessions$.next(sessions);
  }
  // Получить отфильтрованные сессии по выбранной дате
  getFilteredSessions(): Observable<Session[]> {
    return combineLatest([this.sessions$, this.selectedDate$]).pipe(
      map(([sessions, selectedDate]) => {
        return sessions.filter(session => {
          // Сравниваем даты без времени
          return this.isSameDate(session.date, selectedDate);
        });
      })
    );
  }
  
  // Вспомогательная функция для сравнения дат без времени
  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  onDateChange(event: any) {
    const date = new Date(event.target.value);
    this.selectedDate = date;
    this.entersService.setSelectedDate(date);
  }

  loadSessions() {

 //this.entersService.updateSessions();
  }
  initOrder(ev: Event): void {
    
    this.router.navigate(['/enters/order', this.enter._id]);
    this.router.navigate(['/enters/order', this.session._id])
  }
 
}



/* bookSession() {
    if (this.selectedSession) {
      // Переход на страницу бронирования
      this.router.navigate(['/booking', this.item._id, this.selectedSession._id]);
    }
  }*/


/*export class ItemEnter implements OnInit {
  // date:Date = null;
  //value!: number;
  enterId: string = null;
  entertainment: any = [];
  selectedType: IEnterIdSelect = null;
  entertainment$: Observable<Ienters>;
  relatedSessions$: Observable<Session[]>;
  sessionStore: Session[] = [];
  session: Session[] = [];

  enter: Ienters;
  sessions: Session[]
  filteredsession: Session[];
  selectedDate: Date;
  selectedSessions: Session;
  subscription: Subscription;

  constructor(
    private enterService: EntertainmentService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionService,


  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
        console.log('Id', id)

   this.entertainment$ = this.enterService.getEnterById(id)*/
 /*   this.enterService.getEnterById(id).subscribe(entertainment => {
      this.entertainment = entertainment;
      this.sessionsService.getSessionIdEnter(this.enterId).subscribe(sessions => {
        this.sessions = sessions;
        this.filteredsession = [...sessions];
      });
    });*/
  /*  const allSessions$ = this.sessionsService.getAllSessions();
    this.relatedSessions$ = combineLatest([this.entertainment$, allSessions$]).pipe(
      map(([entertainment, sessions]) =>
        sessions.filter(session => session.enterId === entertainment._id)
      )
    );
*/

/*    this.enterService.sessionDate$.subscribe((date) => {
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
//  }

  // this.selectedType = this.enterIdSelect.find((type)=> type.key === '');
  // this.enterId = this.route.snapshot.paramMap.get('id');
  //  console.log('enterId', this.enterId)
  //  this.loadSessions();

  /*  this.enterService.getEnterById(this.enterId).subscribe((enter) => {
      this.enter = enter;
    })   */



  /*
loadSessions():void {
this.sessionsService.getSessionsByEnterId(this.enterId)
.subscribe(sessions => {
this.session = sessions;
this.filterSessionByDate();
})
}
filterSessionByDate() {
if (this.selectedDate) {
 this.filteredsession = this.sessionStore.filter(sessions=>
   this.datePipe.transform(sessions.date, 'yyyy-MM-dd') === this.selectedDate
 );
} else {
 this.filteredsession = [...this.session]
}
}
*/
/*filterSessionsByDate(): void {
    if (this.selectedDate) {
      this.filteredsession = this.sessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate.toDateString() === this.selectedDate.toDateString();
      });
    } else {
      this.filteredsession = [...this.sessions];
    }
  }

  selectSession(session: Session): void {
    this.selectedSessions = session;
  }

  bookSession(): void {
    if (this.selectedSessions) {
      this.sessionsService.deleteSession(this.selectedSessions._id).subscribe(() => {
        // Удаляем сеанс из списка после успешного бронирования
        this.sessions = this.sessions.filter(s => s._id !== this.selectedSessions._id);
        this.filterSessionsByDate();
        this.selectedSessions = null;
        // Перенаправляем на страницу подтверждения или другую логику
      });
    }
  }
  changeEnterId(ev: SelectChangeEvent): void {
    this.enterService.initChangeEnterId(this.selectedType);
    console.log('selectedType', this.selectedType)
  }
  initOrder(ev: Event): void {
    this.router.navigate(['enter/order', this.enter._id]);
  }*/
  /* changeDate(date:string): void {
 this.selectedDate = date;
 this.filterSessionByDate();
 this.selectedSessions = null;
 
 */
  /*   const input = event.target as HTMLInputElement;
     const date = input.valueAsDate;
     console.log('ev', ev)
     this.enterService.initChangeEnterDate(ev);*/
//}
/* selectedSession(session:any):void {
   this.selectedSession = session;
 }
 bookSession():void {
if (!this.selectedSession) return;

this.sessionsService.deleteSession(this.session._id)
.subscribe(
 ()=>{
   this.loadSessions();
   this.selectedSession = null;
 })

 }
}*/


/* onEnterChanges(ev: Ienters):void {
   this.enter = ev;
   this.location.replaceState('id/'+this.enter.id)
 
 
 
 }
*/