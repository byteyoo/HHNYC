import { P404Component } from './pages/404.component';
import { GuestRoutingModule } from './guest.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    CommonModule,
    GuestRoutingModule
  ],
  declarations: [WelcomeComponent, P404Component]
})
export class GuestModule { }
