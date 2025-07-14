import { Component, OnInit } from '@angular/core';
import { EntertainmentService } from '../../services/entertainment-service';

import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import {  SelectModule } from 'primeng/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-aside-copy',
  imports: [
    DatePickerModule,
    FormsModule,
    SelectModule,
    ButtonModule

  ],
  templateUrl: './aside-copy.html',
  styleUrl: './aside-copy.scss'
})
export class AsideCopy implements OnInit {
 

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService

  ) { }

  ngOnInit(): void {

  }
  
  
  initAuth(ev: Event): void {
      this.userService.removeUser();
    this.router.navigate(['/auth'], { relativeTo: this.route });
  }

  initReg(ev: Event): void {
    this.router.navigate(['/register'], { relativeTo: this.route });
  }
   isAuth() {
  return this.userService.getUsersStorage();
}

 
}















