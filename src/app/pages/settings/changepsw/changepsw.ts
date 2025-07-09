import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';



@Component({
  selector: 'app-changepsw',
  imports: [ButtonModule,
    FormsModule,
    NgClass,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './changepsw.html',
  styleUrl: './changepsw.scss'
})
export class Changepsw implements OnInit {
  oldPsw: string = '';
  newPsw: string = '';
  repeatChangePsw: string = '';
  psw: string;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;
  passwordForm: FormGroup;

  constructor(private userService: UserService,
  
  ) { }
  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      oldPsw: new FormControl('', {validators: Validators.required}),
      newPsw: new FormControl(['', [Validators.required, Validators.minLength(6)]]),
      repeatChangePsw: new FormControl( '', {validators:Validators.required }),
    })
  }
  onChangePsw(): void {
 
    if (this.oldPsw !== this.userService.user?.psw) {
     console.log("psw", this.newPsw);
     this.errorMessage= 'Текущий пароль неверен';
     

    }
    if (this.newPsw !== this.repeatChangePsw) {
         this.errorMessage= 'Новый пароль не такой же';
     
    }
    const login = localStorage.getItem('userId');
    if (!login) {
        this.errorMessage= "Пользователь не авторизован";
      
    }
 //   this.isLoading = true;
  //  this.errorMessage = null;
  //  this.successMessage = null;
    const { oldPsw, newPsw } = this.passwordForm.value;
    this.userService.changePassword(login, oldPsw, newPsw)
    .subscribe({
       next: () => {
          this.successMessage = 'Пароль успешно изменен!';
          this.passwordForm.reset();
        },
  //      error: (err) => {
  //        this.errorMessage = err;
    //    },
   //     complete: () => {
  //        this.isLoading = false;
  //      }
        })
   
    //alert('Password changed!')
  }
}

// this.messageService.add({severity: 'error', summary: 'Old password is wrong'});
//  this.messageService.add({severity: 'error', summary: 'New passwords are not the same'});
// this.messageService.add({severity: 'success', summary: 'Password changed!'});


