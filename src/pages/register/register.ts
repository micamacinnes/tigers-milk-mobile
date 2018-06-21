import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ProfilePage } from '../profile/profile';
// import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public email: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public passwordCheck: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  }

  register() {
    if (this.password == this.passwordCheck) {
      this.http.post("http://localhost:3000/registration", {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
      })
        .subscribe(
          result => {
            console.log(result);

            this.navCtrl.push(HomePage, {
              email: this.email,
              firstname: this.firstname,
              lastname: this.lastname,
              password: this.password
            });
            // this.navCtrl.push(ProfilePage);
          },

          error => {
            console.log(error);
          }
        );
        console.log('Passwords do not match');
        // add alert 
    }


  }

  cancel() {
    this.navCtrl.popToRoot();
  }


}