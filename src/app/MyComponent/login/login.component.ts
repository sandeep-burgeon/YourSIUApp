import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { first } from 'rxjs/internal/operators/first';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;
  constructor(private modalCtrl:ModalController,
    private fb:FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(6)]],
    });
  }
  dismissModal(){
    this.modalCtrl.dismiss(null, 'cancel');
  }
  async signUp() {
    alert('Register');
  }
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    // this.authService.login(this.credentials.value).subscribe(

    //   async (res) => {
    //     console.log(res);
    //     await loading.dismiss();  
    //     const alert = await this.alertController.create({
    //       header: 'Login Success',
    //       message: "Welcome",
    //       buttons: ['OK'],
    //     });
  
    //     await alert.present();   
    //     this.dismissModal();   
    //     this.router.navigateByUrl('/home');
    //   },
    //   async (res) => {
    //     console.log(res);
    //     await loading.dismiss();
    //     const alert = await this.alertController.create({
    //       header: 'Login failed',
    //       message: res.error.error,
    //       buttons: ['OK'],
    //     });
 
    //     await alert.present();
    //   }
    // );
    this.authService.login(this.credentials.value)
    .pipe(first())
    .subscribe(
    async data => {
      if(data.invalid_email){
        await loading.dismiss();  
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: data.invalid_email,
          buttons: ['OK'],
        });
        await alert.present(); 
      }else if(data.incorrect_password){
        await loading.dismiss();  
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: data.incorrect_password,
          buttons: ['OK'],
        });
        await alert.present(); 
      }else if(data.error==0){
        window.location.reload();
        await loading.dismiss();  
        const alert = await this.alertController.create({
          header: 'Login Success',
          message: "Welcome",
          buttons: ['OK'],
        });
        await alert.present(); 
        this.dismissModal();   
        this.router.navigateByUrl('/home');
      }else{
        await loading.dismiss();  
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: "Welcome",
          buttons: ['OK'],
        });
        await alert.present(); 
      }
    },
    async error => {
      console.log(error);
      await loading.dismiss();  
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: "Failed",
          buttons: ['OK'],
        });
  
        await alert.present();   
    });
  }
  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }

}
