import { FullLayoutComponent } from './layouts/full-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SurveyComponent } from "./survey/survey.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/user/dashboard'
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'User'
        },
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: 'Dashboard'
                },
            },
            {
                path: 'surveys',
                component: SurveyComponent,
                data: {
                    title: 'Surveys'
                },
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule { }