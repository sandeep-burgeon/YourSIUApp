import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAssigmentsPage } from './all-assigments.page';

const routes: Routes = [
  {
    path: '',
    component: AllAssigmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllAssigmentsPageRoutingModule {}
