import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllAssigmentsPageRoutingModule } from './all-assigments-routing.module';

import { AllAssigmentsPage } from './all-assigments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllAssigmentsPageRoutingModule
  ],
  declarations: [AllAssigmentsPage]
})
export class AllAssigmentsPageModule {}
