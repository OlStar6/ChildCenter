import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Ienters } from '../../models/interfaces';

@Component({
  selector: 'app-order',
  imports: [
    RouterLink, 
    ReactiveFormsModule, 
    InputNumberModule, 
    InputTextModule, 
    DatePickerModule, 
    ButtonModule,
    NgTemplateOutlet
  ],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class Order implements OnInit{
enters: Ienters; 
  userForm: FormGroup;
  userFormFiledsArr = 
  [{label: 'Имя',  placeHolder: 'Введите имя', control: 'firstName'},
    {label: 'Фамилия',  placeHolder: 'Введите фамилию', control: 'lastName'},
    {label: 'Имя ребенка',  placeHolder: 'Введите имя', control: 'childName'}, 
    {label: 'Возраст ребенка',  placeHolder: 'Введите возраст', control: 'age'},
    {label: 'День рождения ребенка',  placeHolder: 'Введите День рождения', control: 'birthDate'},
    {label: 'Номер карты',  placeHolder: 'Введите номер карты', control: 'cardNumber'},
    
   ]

   constructor() {}
   ngOnInit(): void {
     
   }
   initOrder() {

   }
}
