import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
 
 
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  isLogin: boolean;
  constructor(private authService:AuthenticationService, private router:Router) {
    this.loadToken();
  }
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  ngOnInit() {
    this.loadToken();
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
