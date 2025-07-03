import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IMenuType } from '../../models/interfaces';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-header',
  imports: [
    MenubarModule,
    ButtonModule,
    OverlayBadgeModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {
  @Input() set menuType(type: IMenuType) {
    console.log('new type', type)
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  };

  items: MenuItem[];
  datetime: Date;
  private timer: number;
  private settingsActive: boolean = false;
  ;
  constructor(private router: Router,
    private userService:UserService
  ) {
  }



  ngOnInit(): void {
    this.items = this.initMenuItems();
    this.timer = window.setInterval(() => {
      this.datetime = new Date();
    }, 1000)
  }


  ngOnDestroy() {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  }
  /*get userName(): string {
     return this.userService.user?.login || '';
   }
   ngOnChanges(ev: SimpleChanges): void {
     // this.settingsActive = this.menuType?.type === "extended";
     // this.items = this.initMenuItems();
   }*/
  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Каталог',
        routerLink: ['']
      },
          {
        label: 'Зал славы',
        routerLink: ['glory'],
      },
      {
        label: 'Запись',
        routerLink: ['order'],
      },
      {
        label: 'Настройки',
        routerLink: ['/settings'],
      },
  

    ];
  }


  onLogout() {
    this.router.navigate(['auth']);
    command:()=>{
      this.userService.removeUser();
    }
  }
}


