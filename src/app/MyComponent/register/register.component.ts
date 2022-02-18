import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  credentials: FormGroup;
  constructor(private modalCtrl:ModalController,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController) { }
  dismissModal(){
    this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
    this.credentials = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      company_name:['', [Validators.required]],
      phone_number:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      billing_email_address: ['', [Validators.required, Validators.email]],
      user_pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.authService.signUp(this.credentials.value)
    .pipe(first())
    .subscribe(
    async data => {
      console.log(data);
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
  
  get user_pass() {
    return this.credentials.get('user_pass');
  }
  get first_name() {
    return this.credentials.get('first_name');
  }
  get last_name() {
    return this.credentials.get('last_name');
  }
  get company_name() {
    return this.credentials.get('company_name');
  }
  get phone_number() {
    return this.credentials.get('phone_number');
  }
  get billing_email_address(){
    return this.credentials.get('billing_email_address');
  }

}
