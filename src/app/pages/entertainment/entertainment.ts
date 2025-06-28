import { Component, OnInit } from '@angular/core';
import { EntertainmentService } from '../../services/entertainment-service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Ienters, Ientertanment, IFilterTypeLogic } from '../../models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { isValid } from 'date-fns';



@Component({
  selector: 'app-entertainment',
  imports: [CardModule, CommonModule],
  templateUrl: './entertainment.html',
  styleUrl: './entertainment.scss'
})
export class Entertainment implements OnInit {
  enters: any = [];
  typeEnterFilter:IFilterTypeLogic = {key: 'Все'};
  entersStore:Ienters[]=[];
  subscription: Subscription;
  destroyer= new Subject<boolean>();;
  constructor(
    private entertainmentService: EntertainmentService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
 
    //Types
  this.subscription = this.entertainmentService.enterType$.subscribe((enter) => {
     
      switch (enter.key) {

        case 'от 4 лет':
            this.enters = this.entersStore.filter((el) => el.age === 'от 4 лет')
        break;
        case 'от 6 лет':
          this.enters = this.entersStore.filter((el) => el.age === 'от 6 лет')
        break;
        case 'Все':
          this.enters = [...this.entersStore];
        break;
          }
        
      });
    //this.typeTourFilter = tour;
    //this.initTourFilterLogic();

  
    

      //Date
  this.entertainmentService.enterDate$.subscribe((date) => {

      console.log('****date', date);
   //this.initTourFilterLogic();
     //if (date = null) {
      this.enters = this.entersStore.filter((enter)=>{
     if (NaN) {
      return this.enters=this.entersStore;
     }

       else if (isValid (new Date(enter.date))) {

          const tourDate = new Date(enter.date).setHours(0, 0, 0, 0);
          console.log('****tourDate', tourDate)
          const calendarDate = new Date(date).setHours(0, 0, 0);
          console.log('****calendarDate', calendarDate)
          return tourDate === calendarDate;
        }else {
          return false;
        }
  }
);}
      
  // }
  )
  

  


  console.log('ActivatedRoute', this.route)
    this.entertainmentService.EntersAll().subscribe((data) => {
      if (Array.isArray(data)) {
        this.enters = data;
        this.entersStore = [...data];
      }
    },(err) => {
      console.log('***', err)
    }
  );
  
  }

   goToEnter(item: Ienters): void {
    this.router.navigate(['enter', item._id], {relativeTo:this.route});
  }


 initTourFilterLogic(): void {

    if (this.typeEnterFilter) {
      switch (this.typeEnterFilter.key) {

        case 'от 4 лет':
          this.enters = this.entersStore.filter((el) => el.age === 'от 4 лет')
          break;
      case 'от 6 лет':
        this.enters = this.entersStore.filter((el) => el.age === 'от 6 лет')
      break;
      case 'Все':
        this.enters = [...this.entersStore];
      break;
        }
      }
    }
    ngOnDestroy(): void {
  this.destroyer.next(true);
  this.destroyer.complete();

}
}


