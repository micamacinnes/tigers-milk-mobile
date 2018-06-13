
import { Component } from '@angular/core';
import { NavController, App, NavParams } from 'ionic-angular';
// import { LoginPage } from '../login/login';
// import { RegisterPage } from '../registration/registration';
import { Http } from '@angular/http';
import { PaymentPage } from '../payment/payment';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public email: string;
  public password: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) { }

    login() {
      this.http
        .post("http://localhost:3000/login", {
          email: this.email,
          password: this.password,
        }, 
        )
        .subscribe(
          result => {
            console.log(result); 

            console.log(result.json());
            var responseJson = result.json();
            // console.log("jwt: ", responseJson.token);
            localStorage.setItem("TOKEN", responseJson.token);

            // Our username and password (on this) should have data from the user
            this.navCtrl.push(PaymentPage, {
              // email: this.email,
              // password: this.password
              // token: responseJson.token()
            });
          },
    
          error => {
            console.log(error);
          }
        );
    }

    navigateToRegister() {
      this.navCtrl.push(RegisterPage);
    }
}
