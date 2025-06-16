import { Routes } from '@angular/router';
import { Mainpage } from './pages/mainpage/mainpage';
import { Registration } from './pages/auth/registration/registration';
import { Authorization } from './pages/auth/authorization/authorization';
import { Layout } from './layout/layout';

export const routes: Routes = [
    {path:'registration', component: Registration},
    {path:'auth', component: Authorization},
    {path:'', component: Mainpage},
    
    {path:'main', component: Layout},

];
