import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunningClassListPageRoutingModule } from './running-class-list-routing.module';

import { RunningClassListPage } from './running-class-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunningClassListPageRoutingModule
  ],
  declarations: [RunningClassListPage]
})
export class RunningClassListPageModule {}
