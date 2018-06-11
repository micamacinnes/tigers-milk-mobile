
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
// import { LoginPage } from '../login/login';
// import { RegisterPage } from '../registration/registration';
import { Http } from "@angular/http";
import { PaymentPage } from '../payment/payment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public email: string;
  public password: string;

  constructor(public navCtrl: NavController, private app: App,

    public http: Http) { }

    login() {
      this.http
        .post("http://localhost:3000/login", {
          email: this.email,
          password: this.password
        })
        .subscribe(
          result => {
            console.log(result);
    
            // Our username and password (on this) should have data from the user
            this.navCtrl.push(PaymentPage, {
              email: this.email,
              password: this.password
            });
          },
    
          error => {
            console.log(error);
          }
        );
    }
}

// navigateTologin() {

//   this.navCtrl.setRoot(LoginPage, {
//     username: this.username
//   });

// }
