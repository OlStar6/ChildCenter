import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { TimeSlot } from '../../models/interfaces';
import {  ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-timebooking',
  imports: [CommonModule, ReactiveFormsModule, 
      InputNumberModule, 
      InputTextModule, 
      DatePickerModule, 
      ButtonModule,
    ],
  templateUrl: './timebooking.html',
  styleUrl: './timebooking.scss'
})
export class Timebooking {
@Input() timeSlots: TimeSlot[] = [];
  @Input() selectedDate: Date | null = null;
  @Output() timeSelected = new EventEmitter<TimeSlot>();
  
    
  constructor() {
    
  }

  selectTimeSlot(slot: TimeSlot): void {
    if (slot.isAvailable) {
      this.timeSelected.emit(slot);
    }
  }

  getTimeSlotClass(slot: TimeSlot): string {
    return slot.isAvailable ? 'available' : 'unavailable';
  }
}
