import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Aside } from './aside/aside';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-layout',
  imports: [ RouterModule, Header, Aside, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit{

  ngOnInit(): void {
    
  }
}
