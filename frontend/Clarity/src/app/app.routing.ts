import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'user',
    //     pathMatch: 'full'
    // },
    
    {
        path: 'user',
        children: [
            {
                path: '',
                loadChildren: './user/user.module#UserModule'
            }
        ]
    },
    {
        path: '',
        data: {
            title: 'Home'
        },
        children: [
            {
                path: '',
                loadChildren: './guest/guest.module#GuestModule'
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }