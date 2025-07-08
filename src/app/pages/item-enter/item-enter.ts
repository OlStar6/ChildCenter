import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { IEnterIdSelect, Ienters, IEnterSelect } from '../../models/interfaces';
import { EntertainmentService } from '../../services/entertainment-service';

import { FormsModule } from '@angular/forms';
import { SessionBookingComponent } from './session-booking/session-booking';
import { UserService } from '../../services/user-service';
import { Subscription } from 'rxjs';
import { SelectChangeEvent } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-item-enter',
  imports: [ButtonModule, CommonModule, CardModule, RouterLink, FormsModule, SessionBookingComponent, DatePickerModule],
  templateUrl: './item-enter.html',
  styleUrl: './item-enter.scss'
})
export class ItemEnter implements OnInit {
  date:Date = null;
  value!: number;
  enterId: string = null;
  enter: Ienters;
  entertainment:any = [];
  selectedType: IEnterIdSelect=null;


  @Input() session: any;
  subscription: Subscription;
  enterIdSelect: IEnterIdSelect[] = [
    {key:'685c60aad8810aa93c3389ca', label: 'Лазертаг' },
    {key: '685c60bad8810aa93c3389cc', label: 'Веселые батуты'},
    {key: '685c60c9d8810aa93c3389ce', label: 'Веревочный парк'},
      {key: '685c60d7d8810aa93c3389d0', label: 'Скалодром'}
  ]
  constructor(
    private enterService: EntertainmentService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.selectedType = this.enterIdSelect.find((type)=> type.key === '');
    this.enterId = this.route.snapshot.paramMap.get('id');
    console.log('enterId', this.enterId)
    this.enterService.getEnterById(this.enterId).subscribe((enter) => {
      this.enter = enter;
    })   
     } 
      changeEnterId(ev: SelectChangeEvent): void {
       this.enterService.initChangeEnterId(this.selectedType); 
       console.log('selectedType', this.selectedType)
      }
    initOrder(ev: Event): void {
    this.router.navigate(['enters/order', this.enter._id]);
  }
  changeDate(ev: Date): void {
    const input = event.target as HTMLInputElement;
    const date = input.valueAsDate;
    console.log('ev', ev)
    this.enterService.initChangeEnterDate(ev);
  }
}

  /* onEnterChanges(ev: Ienters):void {
     this.enter = ev;
     this.location.replaceState('id/'+this.enter.id)
 
 
 
   }
 */