import { Injectable } from '@angular/core';
import { IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  registerUser(user:IUser) {}
}
