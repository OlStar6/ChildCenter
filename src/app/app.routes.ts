import { Routes } from '@angular/router';
import { Registration } from './pages/auth/registration/registration';
import { Authorization } from './pages/auth/authorization/authorization';
import { Layout } from './layout/layout';
import { Entertainment } from './pages/entertainment/entertainment';
import { Order } from './pages/order/order';
import { ItemEnter } from './pages/item-enter/item-enter';
import { Settings } from './pages/settings/settings';
import { Statistic } from './pages/settings/statistic/statistic';
import { Changepsw } from './pages/settings/changepsw/changepsw';
import { Timebooking } from './pages/timebooking/timebooking';



export const routes: Routes = [
    { path: 'register', component: Registration },
    { path: 'auth', component: Authorization },
    { path: 'order', component: Order},
    {
        path: '', component: Layout,
        children: [
            { path: '', component: Entertainment, data: { showAside: true } },

            { path: 'enter', redirectTo: '', pathMatch: 'full' },

            { path: 'enter/:id', component: ItemEnter},
            
            {
                path: 'settings',
                component: Settings,
                children: [
                    { path: '', redirectTo: 'changePsw', pathMatch: 'full' },
                    { path: 'changePsw', component: Changepsw },
                    { path: 'statistic', component: Statistic, data: { showAside: true } },


                ]
            },]
    },


    { path: '**', redirectTo: '/auth', pathMatch: 'full' }

];
