import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { SessionService } from '../../services/session-service';



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
export class Order implements OnInit {
  enterId:string = null;
  enter:Ienters;
  sessionId:string = null;
  session:Session;
  clientName:string;
  childName:string;
  age:number;
  birthDate:Date;
  date:Date;
participants:number;
  orderForm: FormGroup;
 // enterChoice: IEnterSelect[] | undefined;
  sessionChoice1: Session[] = [];
  sessionChoice: string;
  loading = false;
  selectedEnter: IEnterSelect | undefined;
  minDate: string;
  subscription: Subscription;
  entersStore: IEnterSelect[] = [];
  
  constructor(

    private userService: UserService,
    private enterService: EntertainmentService,
    private route:ActivatedRoute,
    private  sessionService: SessionService
   
  ) {


  }

  ngOnInit():void {

    this.enterId = this.route.snapshot.paramMap.get('id');
    this.enterService.getEnterById(this.enterId).subscribe((enter)=>{
      this.enter = enter;
    })
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this.sessionService.getSessionById(this.sessionId).subscribe((session)=>{
      this.session = session;
    })


    this.orderForm = new FormGroup({
      clientName: new FormControl('', { validators: Validators.required }),
      childName: new FormControl(''),
      age: new FormControl([[Validators.required, Validators.min(4)]]),
       date: new FormControl({ validators: Validators.required }),
      sessionChoice: new FormControl('', { validators: Validators.required }),
      participants: new FormControl([1, [Validators.required, Validators.min(1),Validators.max(10)]]),

    });

  }




  initOrder(): void {

    const userData = this.orderForm.getRawValue();
      const postData = { ...this.enter, ...userData}
    const userId = this.userService.getUsersStorage()?.id || null;
   
    const postObj: IPostorder = {
      clientName: postData.clearName,
      childName: postData.childName,
      age: postData.age,
      sessionChoice: postData.name,
       date: postData.date,
      participants: postData.participants,
      userId: userId,
     // enterId: postData._id,
    //  sessionId: sessionId
    }
    // const enterId = this.enterService.EntersAll() || null;
    //const sessionId = this.sessionService.getSession() || null;
    this.enterService.postOrder(postObj).subscribe();
  }

  loadEntertainments() {

  }

  /* setupFormListeners() {
     this.orderForm.get('enterId')?.valueChanges.subscribe(id => {
       this.selectedEnter = this.enterId.find(e => e.value === id) || null;
     });
 
     this.orderForm.get('date')?.valueChanges.pipe(
       debounceTime(300),
       distinctUntilChanged(),
 
     ).subscribe(
       slots => {
         this.availableTimeSlots = slots;
         this.loading = false;
       },
       error => {
         console.error('Error loading time slots', error);
         this.loading = false;
       }
     );
   }*/
}


/*  onSubmit() {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      const booking: Booking = {
        clientName: formValue.clientName,
        email: formValue.email,
        phone: formValue.phone,
        enterId: formValue.enterId,
        date: formValue.date,
        timeSlot: formValue.timeSlot,
        participants: formValue.participants,
        specialRequests: formValue.specialRequests,
        status: 'pending'
      };
          }
  this.http.post<any>('http://localhost:3002/order'+id, booking).subscribe((data)=> {
  this.userService.setUser(user);
  const token: string = data.access_token;
  this.userService.setToken(token);
  this.userService.setToStore(token);
  this.router.navigate(['enter']);
 })
  }
      

 private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Ienters, IOrder, Session } from '../../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user-service';
import { EntertainmentService } from '../../services/entertainment-service';
import { Observable, Subscription } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-order',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    DatePickerModule,
    ButtonModule,
    NgTemplateOutlet,
    FormsModule,
    CommonModule

  ],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class Order implements OnInit {
    total: number;
  orders: any;
  private orderUnsubscriber: Subscription;

  private _destroyer: Subscription;
  tableData$: Observable<TreeNode<IOrder[]>[]>;
  sessionId: Session = null;
  session: Session;
  enterId: string = null;
  enters: Ienters;
    firstName: string;
  lastName: string;
  childName: string;
  cardNumber: number;
  age: number;
  birthDate: string;
  personalDate:IOrderPerson[]
  userForm: FormGroup;
  from = 0;
  to = 20;
  first = 0;
  userFormFiledsArr =
    [{ label: 'Имя', placeHolder: 'Введите имя', control: 'firstName' },
    { label: 'Фамилия', placeHolder: 'Введите фамилию', control: 'lastName' },
    { label: 'Имя ребенка', placeHolder: 'Введите имя', control: 'childName' },
    { label: 'Возраст ребенка', placeHolder: 'Введите возраст', control: 'age' },
    { label: 'День рождения ребенка', placeHolder: 'Введите День рождения', control: 'birthDate' },
    { label: 'Номер карты', placeHolder: 'Введите номер карты', control: 'cardNumber' },

    ]

  constructor(private http: HttpClient, 
    private userService: UserService, 
    private enterService: EntertainmentService,
  private sessionService:SessionService) { }
  ngOnInit(): void {


  }

  initOrder(): void {
    const userLogin = this.userService.getUsersStorage().login;
    const personalDate = this.userForm.getRawValue();
    const postObj = {
      userLogin,
      this.sessionId: this.sessionId,
      personalDate: [personalDate]
    }
    this.enterService.postOrder(postObj).subscribe();

  }
  initOrder(ev:Event):void {
   order:IOrder={
   firstName: this.firstName,
     lastName: this.lastName,
     childName: this.childName,
     cardNumber: this.cardNumber,
     age: this.age,
     birthDate: this.birthDate
   }
   this.http.post('http://localhost:3002/order')

  }
}





  ngOnInit(): void {
    this.ticketService.getUserOrders(this.from, this.to).subscribe((data: IOrderResponse) => {
      this.orders = data.data;
      this.total = data.count
    });
    this.userService.user$.subscribe((data) => {
      console.log('user', data)
    })
    this.initOrders();

    this._destroyer = this.orderService.groupOrders$.subscribe((data) => {
      this.initOrders()
    })
  }
  pageChange(ev: { first: number, rows: number }): void {
    console.log('ev', ev)
    if (ev.first + ev.rows >= this.total) return;

    if (ev.first + ev.rows >= this.orders.length) {
      this.from = this.orders.length
      this.ticketService.getUserOrders(this.from, this.to).subscribe((data: IOrderResponse) => {
        if (Array.isArray(data.data)) {
          this.orders = this.orders.concat(data.data);
        }

      })
    }

  }

  ngOnDestroy() {
    this._destroyer.unsubscribe()
  }

  initOrders() {
    this.tableData$ = this.orderService.getOrders();



  }*/