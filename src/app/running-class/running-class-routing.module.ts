import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunningClassPage } from './running-class.page';

const routes: Routes = [
  {
    path: '',
    component: RunningClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunningClassPageRoutingModule {}
