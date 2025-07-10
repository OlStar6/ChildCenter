import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-footer',
  imports: [DatePipe, 
    MenubarModule, 
    ButtonModule, 
    OverlayBadgeModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit{
 datetime: Date;
  private timer: number;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.timer = window.setInterval(() => {
     this.datetime = new Date();
    }, 0)
  }
}