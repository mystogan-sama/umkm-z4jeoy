import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' // Pengalihan default ke halaman login
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'display',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'add-presence',
    loadChildren: () => import('./add-presence/add-presence.module').then( m => m.AddPresencePageModule)
  },
  {
    path: 'running-class',
    loadChildren: () => import('./running-class/running-class.module').then( m => m.RunningClassPageModule)
  },
  {
    path: 'detail-running-class',
    loadChildren: () => import('./detail-running-class/detail-running-class.module').then( m => m.DetailRunningClassPageModule)
  },
  {
    path: 'running-class-list',
    loadChildren: () => import('./running-class-list/running-class-list.module').then( m => m.RunningClassListPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
