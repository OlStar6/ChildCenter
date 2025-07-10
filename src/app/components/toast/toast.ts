import { Component } from '@angular/core';
import { Toast, ToastService } from '../../services/toast';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-toast',
  imports: [CommonModule],

  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}


 removeToast(toastToRemove: Toast)
{
  this.toastService.removeToast(toastToRemove)
}}