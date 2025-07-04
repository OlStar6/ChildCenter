import {Component,  OnInit} from '@angular/core';
import { EntertainmentService } from '../../services/entertainment-service';
import { IEnterTypeSelect } from '../../models/interfaces';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-aside',
  imports: [
    DatePickerModule, 
        FormsModule, 
    SelectModule,

    ],
  templateUrl: './aside.html',
  styleUrl: './aside.scss'
})
export class Aside implements OnInit{
  //startDate = new Date;
  date: Date | undefined;
  selectedType: IEnterTypeSelect=null;

  enterTypes: IEnterTypeSelect[] = [
    {key:'Все', label: 'Все' },
    {key: 'от 4 лет', label: 'от 4 лет'},
    {key: 'от 6 лет', label: 'от 6 лет'}
  ]

  constructor(
    private EntertainmentService:EntertainmentService,
  
      
    
  ) {}
  



  ngOnInit(): void {
   this.selectedType = this.enterTypes.find((type)=> type.key === 'Все');
   let today = new Date();
  }

   changeEnterType(ev: SelectChangeEvent): void {
   this.EntertainmentService.initChangeEnterType(this.selectedType); 
   console.log('selectedType', this.selectedType)
   
  }
changeDate(ev:Date): void {
  console.log('ev', ev)
   this.EntertainmentService.initChangeEnterDate(ev);
}

clearDate(ev: Date): void {
console.log('oi', ev)

  this.EntertainmentService.initChangeEnterType(this.selectedType);
}
}







 
 



 
   
 
