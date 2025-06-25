import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import { HttpClient } from '@angular/common/http';
import { EntertainmentService } from '../../services/entertainment-service';
import { IEnterTypeSelect, IMenuType } from '../../models/interfaces';
@Component({
  selector: 'app-aside',
  imports: [],
  templateUrl: './aside.html',
  styleUrl: './aside.scss'
})
export class Aside implements OnInit{
 
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType

  enterTypes: IEnterTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'до 5 лет', value: 'under-five'},
    {label: 'от 6 до 10 лет', value: 'from-six-to-ten'},
    {label: 'от 11 до 15 лет', value: 'from-11en-to-15en'},
    {label: 'старше 15 лет', value: 'over-fifteen'}
  ]

  constructor(
    private EntertainmentService:EntertainmentService,
     private messageService: MessageService,
    private http: HttpClient
      
    
  ) {}
  

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
  }

  onChangeType(ev: { ev: Event, value: IMenuType }): void {
    this.updateMenuType.emit(ev.value);
  }

  /*changeEnterType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.EntertainmentService.updateEnter(ev.value)
  }
  initUserInfo(): void {
    this.userService.initUserToSubject();
  }

  addBasket(): void {
    this.userService.addBasketToSubject();
  }
  selectDate(ev: Date | PointerEvent) {
    const selected = ev instanceof PointerEvent ? undefined : ev
    this.EntertainmentService.updateEnter({date: selected})
  }

  
  initEnters(): void{
this.http.post('http://localhost:3000/tours/', {}).subscribe((data: any)=>{
  this.EntertainmentService.updateTicketList(data);
})
  }

  deleteEnters():void {
this.http.delete('http://localhost:3000/tours/').subscribe((data: any)=>{
  this.EntertainmentService.updateTicketList(data)
})
  }*/
}
