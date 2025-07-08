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
import { authGuard } from './pages/guards/admin-guard';

export const routes: Routes = [
    { path: 'register', component: Registration },
    { path: 'auth', component: Authorization },

    {
        path: 'enters',
        canActivate: [authGuard],
        component: Layout,
        children: [
            { path: '', component: Entertainment, data: { showAside: true } },
            { path: 'enter/:id', component: ItemEnter, data: { showAside: true } },
            { path: 'enter', redirectTo: 'enters', pathMatch: 'full' },
            { path: 'order/:id', component: Order },
            { path: 'glory', component: Glory },

            {
                path: 'settings',
                component: Settings,
          canActivate: [authGuard],
                children: [
                    { path: '', redirectTo: 'changePsw', pathMatch: 'full' },
                    { path: 'changePsw', component: Changepsw },
                    { path: 'statistic', component: Statistic, data: { showAside: true } },


                ]
            },]
    },
    { path: '**', redirectTo: 'enters', pathMatch: 'full' }

];
