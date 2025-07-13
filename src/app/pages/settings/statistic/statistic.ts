import { Component, OnInit } from '@angular/core';
import { ICustomStatisticUser, Role } from '../../../models/interfaces';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { StatisticService } from '../../../services/statistic-service';
import { UserService } from '../../../services/user-service';


@Component({
  selector: 'app-statistic',
  //standalone: true,
  imports: [CommonModule, TableModule],
  
  templateUrl: './statistic.html',
  styleUrl: './statistic.scss'
})
export class Statistic implements OnInit{
 columns:any = [
    {field: 'login', header: 'login'},
    {field: 'email', header: 'email'},
    
  ];
  users: any = [];
  usersStore:ICustomStatisticUser[]=[];
  roleStore:Role[]=[]
  admin:Role

  constructor(
    private statisticService: StatisticService,
    private userService:UserService,
    
  ) {
  }

  ngOnInit(): void {
    if (this.isAdmin()) {
      this.loadStatistic();
    }
     
  }
  private loadStatistic():void{
this.statisticService.getUserStatistic().subscribe((data) => {
       if (Array.isArray(data)) 
      this.users = data;
    this.usersStore=[...data];
    console.log('data', data)
    });
  }
isAdmin():boolean {
  
 return this.userService.isAdmin();
  }


}
