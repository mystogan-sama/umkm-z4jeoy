import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRunningClassPage } from './update-running-class.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateRunningClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRunningClassPageRoutingModule {}
