import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailRunningClassPageRoutingModule } from './detail-running-class-routing.module';

import { DetailRunningClassPage } from './detail-running-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailRunningClassPageRoutingModule
  ],
  declarations: [DetailRunningClassPage]
})
export class DetailRunningClassPageModule {}
