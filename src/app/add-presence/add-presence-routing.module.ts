import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPresencePage } from './add-presence.page';

const routes: Routes = [
  {
    path: '',
    component: AddPresencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPresencePageRoutingModule {}
