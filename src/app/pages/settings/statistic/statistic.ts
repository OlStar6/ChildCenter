import { Component } from '@angular/core';
import { ICustomStatisticUser } from '../../../models/interfaces';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { StatisticService } from '../../../services/statistic-service';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-statistic',
  imports: [CommonModule, TableModule],
  templateUrl: './statistic.html',
  styleUrl: './statistic.scss'
})
export class Statistic {
 columns:any = [
    {field: 'login', header: 'login'},
    {field: 'email', header: 'email'},
    
  ];
  users: any = [];
  usersStore:ICustomStatisticUser[]=[];

  constructor(
    private statisticService: StatisticService,
    private userService:UserService
  ) {
  }

  ngOnInit(): void {
    this.statisticService.getUserStatistic().subscribe((data) => {
       if (Array.isArray(data)) 
      this.users = data;
    this.usersStore=[...data];
    })
  }
isAdmin() {
 return this.userService.isAdmin();
  
}
}
