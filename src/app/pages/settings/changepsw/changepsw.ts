import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastService } from '../../../services/toast';



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
  user:IUser;
  oldPsw: string = '';
  newPsw: string = '';
  repeatChangePsw: string = '';
  psw: string;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;
 passwordForm: FormGroup;
 _id: string;
 login:IUser


  constructor(private userService: UserService,
    private http: HttpClient,
    private toastService: ToastService, 
  
  ) { }
  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      oldPsw: new FormControl('', {validators: Validators.required}),
      newPsw: new FormControl(['', [Validators.required, Validators.minLength(6)]]),
      repeatChangePsw: new FormControl( '', {validators:Validators.required }),
    })
    
  }
  onChangePsw(ev:Event): void {
     
console.log('uyt')
  
   if (this.oldPsw !== this.userService.user?.psw) {
     console.log("psw", this.newPsw);
     this.errorMessage= 'Текущий пароль неверен';
         }
    if (this.newPsw !== this.repeatChangePsw) {
         this.errorMessage= 'Новый пароль не такой же';
     
    }
    const login = localStorage.getItem('login')
   if (!login) {
        this.errorMessage= "Пользователь не авторизован";
      
    }
   this.isLoading = true;
   this.errorMessage = null;
   this.successMessage = null;
this.isLoading = true;
    const { oldPsw, newPsw } = this.passwordForm.value;;
   this.userService.changePassword(oldPsw, newPsw)
.subscribe(
     () => {
      this.toastService.show('success', 'Пароль успешно изменен!');
         this.passwordForm.reset();
        },
       ()=>{
   this.toastService.show('error', 'Ошибка, обратитесь к администратору по телефону 123-123');})
       
      }
    
     
    }
    
   
    
  





