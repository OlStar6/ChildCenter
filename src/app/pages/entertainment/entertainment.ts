import { Component, OnInit } from '@angular/core';
import { EntertainmentService } from '../../services/entertainment-service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Ienters } from '../../models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-entertainment',
  imports: [CardModule, CommonModule],
  templateUrl: './entertainment.html',
  styleUrl: './entertainment.scss'
})
export class Entertainment implements OnInit {
  enters: any = [];
  constructor(
    private entertainmentService: EntertainmentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('activatedRoute', this.route)
    this.entertainmentService.EntersAll()

      .subscribe(
        (data) => {
          if (Array.isArray(data)) {

            this.enters = data;
          }
        }
      );

  }

  goToEnter(item: any): void {
    this.router.navigate(['/enter', item._id], { relativeTo: this.route });
  }

}

/*subscribe((data)=> {
   if (Array.isArray(data?.entertainment)) {
     console.log('entertainment', this.enters)
     this.enters = data.enters
   }
 });*/