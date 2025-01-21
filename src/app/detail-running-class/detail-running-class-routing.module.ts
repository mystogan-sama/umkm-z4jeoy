import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailRunningClassPage } from './detail-running-class.page';

const routes: Routes = [
  {
    path: '',
    component: DetailRunningClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRunningClassPageRoutingModule {}
