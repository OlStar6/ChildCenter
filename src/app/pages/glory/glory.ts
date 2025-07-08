import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Iglory } from '../../models/glory';
import { EntertainmentService } from '../../services/entertainment-service';

@Component({
  selector: 'app-glory',
  imports: [CardModule],
  templateUrl: './glory.html',
  styleUrl: './glory.scss'
})
export class Glory implements OnInit {
  glory: any = [];
  gloryStore: Iglory[] = [];
  constructor(private enterService: EntertainmentService) { }

  ngOnInit(): void {
    this.enterService.GloryAll().subscribe((data) => {
      if (Array.isArray(data)) {
        this.glory = data;
        this.gloryStore = [...data]
      }
    }, (err) => {
      console.log('err', err)
    }
    );
  }
}
