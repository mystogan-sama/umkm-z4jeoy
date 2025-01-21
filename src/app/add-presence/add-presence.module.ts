import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPresencePageRoutingModule } from './add-presence-routing.module';

import { AddPresencePage } from './add-presence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPresencePageRoutingModule
  ],
  declarations: [AddPresencePage]
})
export class AddPresencePageModule {}
