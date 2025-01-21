import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunningClassPageRoutingModule } from './running-class-routing.module';

import { RunningClassPage } from './running-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunningClassPageRoutingModule
  ],
  declarations: [RunningClassPage]
})
export class RunningClassPageModule {}
