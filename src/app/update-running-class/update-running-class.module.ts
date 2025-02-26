import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRunningClassPageRoutingModule } from './update-running-class-routing.module';

import { UpdateRunningClassPage } from './update-running-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateRunningClassPageRoutingModule
  ],
  declarations: [UpdateRunningClassPage]
})
export class UpdateRunningClassPageModule {}
