import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {MomentModule} from 'angular2-moment';

import {AgmCoreModule} from '@agm/core';

import {TrackingComponent} from './tracking.component';
import {TrackingRoutingModule} from './tracking-routing.module';


@NgModule({
  imports: [
    TrackingRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4Zt99xt7aUd4Sg8RUwlMGwRkRIBWC7aE'
    })
  ],
  declarations: [ TrackingComponent ]
})
export class TrackingModule { }