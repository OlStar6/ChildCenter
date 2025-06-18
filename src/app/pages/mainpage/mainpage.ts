//import { NgClass } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
//import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-mainpage',
  imports: [ButtonModule, RouterModule, ImageModule, NgOptimizedImage],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss'
})
export class Mainpage {


}
