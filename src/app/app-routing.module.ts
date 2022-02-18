import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  }
  ,
  {
    path: 'assign',
    loadChildren: () => import('./pages/assign/assign.module').then( m => m.AssignPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'all-assigments',
    loadChildren: () => import('./pages/all-assigments/all-assigments.module').then( m => m.AllAssigmentsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
