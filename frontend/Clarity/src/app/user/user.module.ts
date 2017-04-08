import { FormsModule } from '@angular/forms';
import { NAV_DROPDOWN_DIRECTIVES } from './directives/nav-dropdown.directive';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { UserRoutingModule } from './user.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbsComponent } from "./directives/breadcrumb.component";
import { SIDEBAR_TOGGLE_DIRECTIVES } from "./directives/sidebar.directive";
import { BsDropdownModule } from "ng2-bootstrap/dropdown";
import { TabsModule } from "ng2-bootstrap/tabs";
import { SurveyComponent } from './survey/survey.component';
import { SurveyService } from "./services/survey.service";
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    TabsModule,
    ChartsModule,
    UserRoutingModule
  ],
  declarations: [
    DashboardComponent,
    FullLayoutComponent,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    SurveyComponent
  ],
  providers: [
    SurveyService
  ]
})
export class UserModule { }
