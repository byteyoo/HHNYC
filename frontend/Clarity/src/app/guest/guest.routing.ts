import { P404Component } from './pages/404.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'home',
        component: WelcomeComponent
    },
    {
        path: '404',
        component: P404Component
    },
    {
        path: '**',
        redirectTo: '/user/dashboard'
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class GuestRoutingModule { }