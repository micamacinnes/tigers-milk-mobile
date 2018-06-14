
import { Component } from '@angular/core';
import { NavController, App, NavParams } from 'ionic-angular';
// import { LoginPage } from '../login/login';
// import { RegisterPage } from '../registration/registration';
import { Http } from '@angular/http';
import { PaymentPage } from '../payment/payment';
import { RegisterPage } from '../register/register';
import { BrowsePage } from '../browse/browse';
import { ProfilePage } from '../profile/profile';
import { StripeJavaScriptPage } from './../stripe-java-script/stripe-java-script';
// import { StripeNativePage } from '../stripe-native/stripe-native';
 


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
        password: this.password
      })
      .subscribe(
        result => {
          console.log(result);

          var responseJson = result.json();

          localStorage.setItem("TOKEN", responseJson.token);
          // Our username and password (on this) should have data from the user
          this.navCtrl.push(ProfilePage, {
            // username: this.email,
            // password: this.password
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
  
  navigateTopayment() {
    this.navCtrl.push(PaymentPage);
  }
  navigateToprofile() {
    this.navCtrl.push(ProfilePage);
  }

  openJavaScript(){
    this.navCtrl.push(StripeJavaScriptPage)
  }
 
  // openNative(){
  //   this.navCtrl.push(StripeNativePage)
  // }
}





