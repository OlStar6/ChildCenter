import { Routes } from '@angular/router';
import { Registration } from './pages/auth/registration/registration';
import { Authorization } from './pages/auth/authorization/authorization';
import { Layout } from './layout/layout';
import { Entertainment } from './pages/entertainment/entertainment';
import { ItemEnter } from './pages/item-enter/item-enter';
import { Settings } from './pages/settings/settings';
import { Statistic } from './pages/settings/statistic/statistic';
import { Changepsw } from './pages/settings/changepsw/changepsw';
import { Order } from './pages/order/order';
import { Glory } from './pages/glory/glory';
import { authGuard } from './pages/guards/auth-guard';
import { Auth } from './pages/auth/auth';
import { RoleGuard } from './pages/guards/admin-guard';
import { About } from './pages/about/about';




export const routes: Routes = [
    { path: 'register', component: Auth },
    { path: 'auth', component: Auth },

    {
        path: 'enters',

        component: Layout,
        children: [
            { path: '', component: Entertainment, data: { showAside: true } },
            { path: 'enter/:id', component: ItemEnter, data: { showAside: true } },
            { path: 'enter', redirectTo: '', pathMatch: 'full' },
            { path: 'order/:id', canActivate: [authGuard], component: Order },
            { path: 'glory', component: Glory },
             { path: 'about', component: About },

            {
                path: 'settings',
                component: Settings,
                canActivate: [authGuard],
                children: [
                    { path: '', redirectTo: 'changePsw', pathMatch: 'full' },
                    { path: 'changePsw', component: Changepsw },
                    {
                        path: 'statistic',
                      //  canActivate: [RoleGuard],
                      // data: { role: 'admin' },
                        component: Statistic,
                    },


                ]
            },]
    },
    { path: '', redirectTo: 'enters', pathMatch: 'full' },
    { path: '**', redirectTo: 'enters', pathMatch: 'full' }

];
