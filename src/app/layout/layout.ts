import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router, RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Aside } from './aside/aside';
import { Footer } from './footer/footer';
import { Entertainment } from '../pages/entertainment/entertainment';
import { filter, map, Subscription } from 'rxjs';
import { encapsulateStyle } from '@angular/compiler';



@Component({
  selector: 'app-layout',
  imports: [RouterModule, Footer, Header, Aside],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  encapsulation: ViewEncapsulation.None
})
export class Layout implements OnInit, OnDestroy {
 
  showAside = false;
  subscription: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.showAside = this.recursFindChildData(this.activatedRoute.snapshot, 'showAside');
    this.subscription = this.router.events.pipe(
      filter((router) => router instanceof ActivationEnd),
      map((data) => data.snapshot)
    ).subscribe((data) => {
      this.showAside = this.recursFindChildData(data, 'showAside');
    });
  }
  recursFindChildData(children: ActivatedRouteSnapshot, prop: string): boolean {
    console.log('children', children)
    if (!children.data[prop] && children.firstChild) {
      return this.recursFindChildData(children.firstChild, prop);
    } else {
      return !!children.data[prop];
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
