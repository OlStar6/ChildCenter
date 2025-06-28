import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Ienters } from '../../models/interfaces';
import { EntertainmentService } from '../../services/entertainment-service';

import { FormsModule } from '@angular/forms';
import { SessionBookingComponent } from './session-booking/session-booking';



@Component({
  selector: 'app-item-enter',
  imports: [ButtonModule, CommonModule, CardModule, RouterLink, FormsModule, SessionBookingComponent],
  templateUrl: './item-enter.html',
  styleUrl: './item-enter.scss'
})
export class ItemEnter implements OnInit {
  value!: number;
  enterId: string = null;
  enter: Ienters;
  entersStore: Ienters[] = [];
  @Input() session: any;

  constructor(
    private enterService: EntertainmentService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.enterId = this.route.snapshot.paramMap.get('id');
    console.log('enterId', this.enterId)
    this.enterService.getEnterById(this.enterId).subscribe((enter) => {
      this.enter = enter;

    })

  }
  /* onEnterChanges(ev: Ienters):void {
     this.enter = ev;
     this.location.replaceState('id/'+this.enter.id)
 
 
 
   }
 */

  initOrder(ev: Event): void {
    this.router.navigate(['order'], { relativeTo: this.route });
  }




}