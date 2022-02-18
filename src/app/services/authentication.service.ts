import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
 
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
 
 
const TOKEN_KEY = 'my-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  isLogin:any;
 
  constructor(private http: HttpClient,private router:Router) {
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
 
  // login(credentials: {email, password}): Observable<any> {
  //   return this.http.post(`https://ladmin.checkyourprojects.com/vendor/blog/wp-json/custom-plugin/login`, credentials).pipe(
  //     map((data: any) => data),
  //     switchMap(token => {
  //       console.log(token);
  //       if(token.error==1){
  //         this.isLogin = false;
  //         return token;
  //       }else if(token.error==0){
  //         this.isLogin = true;
  //         return from(Storage.set({key: TOKEN_KEY, value: token.nonce}));
  //       }
        
  //     }),
  //     tap(_ => {
  //       this.isAuthenticated.next(true);
  //     })
  //   )
  // }
  login(credentials: {email, password}): Observable<any> {
    return this.http.post<any>(`https://ladmin.checkyourprojects.com/vendor/blog/wp-json/custom-plugin/login`, credentials)
    .pipe(map(data => {
      if(data.error==1){
        this.isLogin = false;
        this.isAuthenticated.next(false);
        return data.user;
      }else if(data.error==0){
       this.isLogin = true;
        this.isAuthenticated.next(true);
        from(Storage.set({key: TOKEN_KEY, value: data.nonce}));
        return data;
      }
    }));
  }
  signUp(credentials: {first_name, last_name, company_name, phone_number, email, billing_email_address, user_pass}): Observable<any> {
    return this.http.post<any>(`http://su.checkyourprojects.com/wp-json/custom-plugin/registers`, credentials)
    .pipe(map(data => {
      if(data.error==1){
        this.isAuthenticated.next(false);
        return data.user;
      }else if(data.error==0){
        this.isAuthenticated.next(false);
        return data;
      }
    }));
  }
  // sign1Up(credentials: {first_name, last_name, company_name, phone_number, email, billing_email_address, user_pass}): Observable<any> {
  //   console.log(credentials);
  //   return this.http.post(`https://ladmin.checkyourprojects.com/vendor/blog/wp-json/custom-plugin/registers`, credentials).pipe(
  //     map((data: any) => data.token),
  //     switchMap(token => {
  //       return from(Storage.set({key: TOKEN_KEY, value: token}));
  //     }),
  //     tap(_ => {
  //       this.isAuthenticated.next(true);
  //     })
  //   )
  // }
 
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    window.location.reload();
    return Storage.remove({key: TOKEN_KEY});
  }
}