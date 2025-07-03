import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/Booking-service';
import { Ienters, IEnterSelect, Session } from '../../models/interfaces';
import { IPostorder, TimeSlot } from '../../models/order';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user-service';
import { EntertainmentService } from '../../services/entertainment-service';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerClasses, DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';



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
   ButtonModule 

  ],
})
export class Order implements OnInit {
  orderForm: FormGroup;
  enterId:IEnterSelect[] | undefined;
  sessionId: Session[] = [];
  loading = false;
  selectedEnter: IEnterSelect | undefined;
  minDate: string;
 subscription: Subscription;
entersStore: IEnterSelect[] = [];
 orderFormArr = 
  [{label: 'ФИО',  placeHolder: 'Введите ФИО', control: 'clientName'},
    {label: 'Имя ребенка',  placeHolder: 'Введите имя ребенка', control: 'childName'},
    {label: 'Номер карты',  placeHolder: 'Введите номер карты', control: 'cardNumber'},
    {label: 'Возраст',  placeHolder: 'Введите возраст', control: 'age'},
    {label: 'День рождения',  placeHolder: 'Введите День рождения', control: 'birthDate'},
    {label: 'Выберите развлечение',  placeHolder: 'Выберите развлечение', control: 'enterId'},
    {label: 'Дата сеанса',  placeHolder: 'Выберите дату', control: 'date'},
    {label: 'Время сеанса',  placeHolder: 'Выберите время', control: 'session'},
    {label: 'Количество участников',  placeHolder: 'Количество участников', control: 'participants'}
   ]
  constructor(
    
    private userService: UserService,
    private enterService: EntertainmentService,
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.createForm();
  }

  ngOnInit() {
    
   this.enterId = [
{value: 'Лазертаг', name: 'Лазертаг'},
{value: 'Веселые батуты', name: 'Веселые батуты'},
{value: 'Веревочный парк', name: 'Веревочный парк'},
{value: 'Скалодром', name: 'Скалодром'}
  ];
      
      this.orderForm = new FormGroup({
      clientName: new FormControl('', {validators: Validators.required}),
      childName: new FormControl('', {validators: Validators.required}),
      cardNumber: new FormControl(''),
      age: new FormControl(''),
      birthDate: new FormControl(''),
      date:new FormControl('', {validators: Validators.required}),
      enterId: new FormControl('', {validators: Validators.required}),
      sessionId: new FormControl('', {validators: Validators.required}),
      participants: new FormControl([1, [Validators.required, Validators.min(1)]]),

    });   
     
  } 
   
  

 
  createForm() {
    this.orderForm = new FormGroup({
      clientName: new FormControl('', {validators: Validators.required}),
      childName: new FormControl('', {validators: Validators.required}),
      cardNumber: new FormControl(''),
      age: new FormControl(''),
      birthDate: new FormControl(''),
      date:new FormControl('', {validators: Validators.required}),
      enterId: new FormControl('', {validators: Validators.required}),
      sessionId: new FormControl('', {validators: Validators.required}),
      participants: new FormControl([1, [Validators.required, Validators.min(1)]]),

    });   
  }
  
  initOrder(): void {
       
    const userData = this.orderForm.getRawValue();
    const postData = { ...this.enterId, ...userData }
    const userId = this.userService.getUsersStorage()?.id || null;

     const postObj: IPostorder = {
      clientName: postData.clearName,
      childName: postData.childName,
      cardNumber: postData.cardNumber,
      age: postData.age,
      birthDate: postData.birthDate,
      enterId: postData._id,
      sessionId: postData.sessionId,
      date: postData.date,
      TimeSlot: postData.TimeSlot,
      participants: postData.participants,
        userId: userId,
    }
    this.enterService.postOrder(postObj);
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