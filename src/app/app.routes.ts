import { Routes } from '@angular/router';
import { Mainpage } from './pages/mainpage/mainpage';
import { Registration } from './pages/auth/registration/registration';
import { Authorization } from './pages/auth/authorization/authorization';
import { Layout } from './layout/layout';
import { Header } from './layout/header/header';


export const routes: Routes = [
    {path:'registration', component: Registration},
    {path:'auth', component: Authorization},
    {path:'', component: Mainpage},
    
    {path:'entertainment-list', component: Layout},

];
