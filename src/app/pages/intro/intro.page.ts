import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { LoginComponent } from 'src/app/MyComponent/login/login.component';
import { RegisterComponent } from 'src/app/MyComponent/register/register.component';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
const TOKEN_KEY = 'my-token';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(private modalCtrl:ModalController,private router:Router) {
    this.loadToken();
  }
   async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
      this.router.navigateByUrl('/home');
    } else {
      this.isAuthenticated.next(false);
    }
  }

  ngOnInit() {
   // this.loadToken();
  }
  async start(){
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
    });
    await modal.present();
  }
  async signUp(){
    await Storage.set({key: INTRO_KEY, value: 'true'});
    const modal = await this.modalCtrl.create({
      component: RegisterComponent,
    });
    await modal.present();
  }

}
