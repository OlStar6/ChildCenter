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
import { OrderService } from '../../services/order-service';
import { ToastService } from '../../services/toast';


@Component({
  selector: 'app-item-enter',
  imports: [ButtonModule, CommonModule, CardModule, FormsModule, RouterLink],
  templateUrl: './item-enter.html',
  styleUrl: './item-enter.scss',

})
export class ItemEnter implements OnInit {
    entertainment$: Observable<Ienters>;
  relatedSessions$: Observable<Session[]>;
  sessionsId$:Observable<Session>;
  enterorder:Ienters;
 sessionorder:Session;
  enterId: string;

  sessionId:number;
  sessionId1:string;
  enter: Ienters;
  session:Session;
  sessions4: Session[]
  sessionsCopy: Session[]
  selectedDate: Date = new Date();
   dateEnterFilter:Date;
  private selectedDate$ = new BehaviorSubject<Date>(new Date());
  private sessions$ = new BehaviorSubject<Session[]>([]);
 


  constructor(
    private route: ActivatedRoute,
    private entersService:EntertainmentService,
    private sessionService:SessionService,
    private router:Router,
    private orderService: OrderService,
    private toastService: ToastService


  ) {}

  ngOnInit() {
    this.enterId = this.route.snapshot.paramMap.get('id');
      console.log('enterId', this.enterId)
      this.entersService.getEnterById(this.enterId).subscribe((enter)=> {
        this.enter = enter;
        })
        console.log('enter', this.enter)
  
  

const sessionsId$ = this.sessionService.getSessionById(this.sessionId);
console.log('sessionId1', sessionsId$)
    const id = this.route.snapshot.paramMap.get('id');
    this.entertainment$ = this.entersService.getEnterById(id);
    console.log('ent', this.entertainment$)
    const allSessions$ = this.sessionService.getAllSessions();
     console.log('all', allSessions$)
combineLatest([this.entertainment$, allSessions$]).pipe(
 
    map(([entertainment, sessions]) => 
    sessions.filter(session => session.enterId === entertainment._id)
    )
   )
   .subscribe((data) => {
    this.sessions4 = data;
     this.sessionsCopy = data;
 
         const calendareDate = new Date(this.selectedDate).setHours(0, 0, 0, 0);
    this.sessions4 = this.sessionsCopy.filter((el) => {
      const elDate = new Date(el.date).setHours(0, 0, 0, 0);
      console.log('elDate', elDate, calendareDate)
      return elDate === calendareDate

    })
        console.log('session4', this.sessions4)//undefined
     console.log('data',data)
   })
  console.log('id', this.relatedSessions$)//undefined

   
    //Date
  this.entersService.selectedDate$.subscribe((date) => {
    this.selectedDate = date;
    const calendareDate = new Date(date).setHours(0, 0, 0, 0);
    this.sessions4 = this.sessionsCopy.filter((el) => {
      const elDate = new Date(el.date).setHours(0, 0, 0, 0);
      console.log('elDate', elDate, calendareDate)
      return elDate === calendareDate

    })
    console.log('sessions4', this.sessions4); // массивы сеансов отобранные по дате 
    console.log('***', this.sessionsCopy, date);
       console.log('****date', date);

    //this.sessions = this.sessionsCopy.filter((el) => new Date(el.date).getTime() === new Date(date).getTime())
   // 
          
      const sessionId1 = this.sessionsCopy.filter((el) => new Date(el.date).getTime() === new Date(this.selectedDate).getTime());
      console.log('sessionId', sessionId1)
       this.sessionService.getSessionById(this.sessionId).subscribe((session)=> {
        this.session = session;

       
        })
  })  
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
    if (event.value<date) {
      this.toastService.show('error', 'Неверная дата');
      }
    
    this.selectedDate = date;
    this.entersService.setSelectedDate(date);
  }

  loadSessions() {

  }
  initOrder(session: Session): void {
  this.orderService.setOrderData(this.enterorder) //для заказа
    console.log('Сессия', this.enterorder, this.sessions4);
    this.router.navigate(['/enters/order', this.enter._id],
       {queryParams: {
        session: session,
      date: new Date(this.selectedDate).toISOString(),
      time: session.startTime,
     sessionId:session.id,
           }}, );
    
    console.log('ActivatedRoute', this.route)
    /*this.router.navigate(['/enters/order', this.enter._id],
       {queryParams: {
      date: new Date(this.selectedDate).toISOString(),
      time: session.startTime,
      _id:session._id
       }}, );*/
  
  }
 
}

 //this.entersService.updateSessions();
//this.initTourFilterLogic();
           //if (date = null) {
         /*   this.enters_sessions = this.enters_sessionStore.filter((enter)=>{
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
      );
    
  
}*/

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