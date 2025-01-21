import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunningClassListPage } from './running-class-list.page';

const routes: Routes = [
  {
    path: '',
    component: RunningClassListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunningClassListPageRoutingModule {}
