import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { IntroPage } from './intro.page';
import { LoginComponent } from 'src/app/MyComponent/login/login.component';
import { RegisterComponent } from 'src/app/MyComponent/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IntroPageRoutingModule
  ],
  declarations: [IntroPage,LoginComponent,RegisterComponent],
  entryComponents: [LoginComponent,RegisterComponent]
})
export class IntroPageModule {}
