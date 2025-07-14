import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { Ienters, IEnterSelect, Session } from '../../models/interfaces';
import { IPostorder } from '../../models/order';
import { UserService } from '../../services/user-service';
import { EntertainmentService } from '../../services/entertainment-service';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { SessionService } from '../../services/session-service';
import { ToastService } from '../../services/toast';
import { OrderService } from '../../services/order-service';



@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrls: ['./order.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    CardModule,
    FormsModule,
    InputTextModule,
    DatePickerModule,
    ButtonModule,
    RouterLink,
    InputNumberModule,
    NgClass


  ],
})
export class Order implements OnInit, OnDestroy {
  session5:string=null;
  ses:Session;
  enterId: string = null;
  enter: Ienters;
  dateId: Date | null = null;
  session: Session;
  session1:Session;
  clientName: string;
  childName: string;
  age: number;
  date: Date;
  participants: number;
  orderForm: FormGroup;
  sessionChoice1: Session[] = [];
  sessionChoice: string;
  loading = false;
  selectedEnter: IEnterSelect | undefined;
  minDate: string;
  subscription: Subscription;
  private dataSubscription: Subscription;
  entersStore: IEnterSelect[] = [];
  enterorder:Ienters;
 sessionorder:Session;
 sessions4:Session;
 startTime:string;
 sessionId:number;
 session6:string;
 

  constructor(

    private userService: UserService,
    private enterService: EntertainmentService,
    private route: ActivatedRoute,
    private sessionService: SessionService,
     private toastService: ToastService, 
     private orderService: OrderService
   

  ) {


  }

  ngOnInit(): void {
console.log('ActivatedRoute', this.route)

this.dataSubscription = this.orderService.orderData$.subscribe(data=> {
  if (data){
    this.enterorder = data.enterorder;
 
  }
});
    this.enterId = this.route.snapshot.paramMap.get('id');
    this.enterService.getEnterById(this.enterId).subscribe((enter) => {
      this.enter = enter;
    })
    
     console.log('session.5', this.session5)
    console.log('NAME - enter', this.enterId)
     this.route.queryParams.subscribe(params =>{
      this.session = params['session']
     this.date = params['date'];
      this.startTime = params['time'];
      this.sessionId = params['sessionId'];
      if (params['date']) {
        this.dateId = new Date(params['date']);
        if (isNaN(this.dateId.getTime())){
          this.dateId = null;
          console.error('некорр формат даты');
        }
      }
    });
   console.log(' sessionId', this.sessionId)
    console.log('выбранная дата', this.dateId)
        console.log('Время', this.startTime)
      
      
      /*if (this.sessionId) {

         this.sessionService.getSessionById(this.sessionId).subscribe((session4) => {
      this.sessions4 = session4;
    })
    console.log('выбранная дата - sessionId', this.sessionId)
      }
    })*/
       


    this.orderForm = new FormGroup({
      clientName: new FormControl('', { validators: Validators.required }),
      childName: new FormControl(''),
      age: new FormControl([[Validators.required, Validators.min(4)]]),
     date: new FormControl({ validators: Validators.required }),
     enter:new FormControl('', { }),
    startTime: new FormControl('', { }),
    sessionId: new FormControl('', { }),
      participants: new FormControl([1, [Validators.required, Validators.min(1), Validators.max(10)]]),

    });

  }
  initOrder(): void {

    const userData = this.orderForm.getRawValue();
    const postData = { ...this.enter, ...userData }
    const userId = this.userService.getUsersStorage()?.id || null;
     const postObj: IPostorder = {
      clientName: postData.clientName,
      childName: postData.childName,
      age: postData.age,
     enter: postData.name,
       date: this.dateId,
      startTime:this.startTime,
      sessionId:this.sessionId,
      participants: postData.participants,
      userId: userId,

    }

    this.enterService.postOrder(postObj).subscribe(
      () => {
        console.log("заказ", postObj)
     this.sessionService.deleteSessionId(this.sessionId).subscribe(()=>{
      this.toastService.show('success', 'Поздравляем! Вы успешно забронировали запись! Если Ваши планы изменятся, позвоните, пожалуйста, по телефону:123-456. Спасибо!');
      },
    )
    },
       ()=>{
   this.toastService.show('error', 'Ошибка');
    }
     );
    

   //.subscribe(()=>{
    // this.orderService.clearOrderData();
      
    
  //  )
 //   },
     
    

  }
ngOnDestroy(): void {
  if (this.dataSubscription) {
    this.dataSubscription.unsubscribe();
  }
}
}

