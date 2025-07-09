import { Component, OnInit } from '@angular/core';
import { EntertainmentService } from '../../services/entertainment-service';
import { IEnterTypeSelect } from '../../models/interfaces';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-aside',
  imports: [
    DatePickerModule,
    FormsModule,
    SelectModule,
    ButtonModule

  ],
  templateUrl: './aside.html',
  styleUrl: './aside.scss'
})
export class Aside implements OnInit {
  //startDate = new Date;
  date: Date = new Date;
  selectedType: IEnterTypeSelect = null;

  enterTypes: IEnterTypeSelect[] = [
    { key: 'Все', label: 'Все' },
    { key: 'от 4 лет', label: 'от 4 лет' },
    { key: 'от 6 лет', label: 'от 6 лет' }
  ]

  constructor(
    private EntertainmentService: EntertainmentService,
    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService

  ) { }

  ngOnInit(): void {
    this.selectedType = this.enterTypes.find((type) => type.key === 'Все');
    let today = new Date();
  }

  changeEnterType(ev: SelectChangeEvent): void {
    this.EntertainmentService.initChangeEnterType(this.selectedType);
    console.log('selectedType', this.selectedType)

  }
  
  initAuth(ev: Event): void {
      this.userService.removeUser();
    this.router.navigate(['/auth'], { relativeTo: this.route });
  }

  initReg(ev: Event): void {
    this.router.navigate(['/register'], { relativeTo: this.route });
  }
}















