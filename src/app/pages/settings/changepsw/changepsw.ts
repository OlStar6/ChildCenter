import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-changepsw',
  imports: [ButtonModule, FormsModule, NgClass],
  templateUrl: './changepsw.html',
  styleUrl: './changepsw.scss'
})
export class Changepsw implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  repeatPassword: string = '';
  psw: string;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
  }
  onChangePsw(): void | boolean {
    if (this.oldPassword !== this.userService.user?.psw) {
      alert('Old password is wrong')
      return;
    }
    if (this.newPassword !== this.repeatPassword) {
      alert('New passwords are not the same')
      return
    }
    this.userService.changePassword(this.newPassword);
    alert('Password changed!')
  }
}

// this.messageService.add({severity: 'error', summary: 'Old password is wrong'});
//  this.messageService.add({severity: 'error', summary: 'New passwords are not the same'});
// this.messageService.add({severity: 'success', summary: 'Password changed!'});


