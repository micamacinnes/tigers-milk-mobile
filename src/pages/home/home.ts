
import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, App } from 'ionic-angular';

// import { LoginPage } from '../login/login';
// import { RegisterPage } from '../registration/registration';
import { Http } from '@angular/http';
// import { PaymentPage } from '../payment/payment';
import { RegisterPage } from '../register/register';
import { BrowsePage } from '../browse/browse';
import { ProfilePage } from '../profile/profile';
import { AuthService } from "../../auth.service";
import { TabsPage } from '../tabs/tabs';
import { StripeJavaScriptPage } from './../stripe-java-script/stripe-java-script';
import { PortfolioPage } from '../portfolio/portfolio';
// import { StripeNativePage } from '../stripe-native/stripe-native';
 
import { CharityPage } from '../charity/charity';
import { Charity } from '../../models/charityProfile';
import { User } from '../../models/user';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public email: string;
  public password: string;
  public charities: Array<Charity> = [];
  public user: User = new User();


  constructor(public navCtrl: NavController, public authService: AuthService, private app: App
  ) {
    // if (localStorage.getItem("TOKEN")) {
    //   this.app.getRootNav().setRoot(ProfilePage);
    // }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login() {
    let callback = (err) => {
      if (err) {
        // TODO: display error
        return;
      }

      //this.navCtrl.setRoot(ProfilePage);
      this.navCtrl.setRoot(TabsPage);
    }

    this.authService.login(this.email, this.password, callback);
  }

  // login() {
  //   this.http
  //     .post("http://localhost:3000/login", {
  //       email: this.email,
  //       password: this.password
  //     })
  //     .subscribe(
  //       result => {
  //         console.log(result);

  //         var responseJson = result.json();

  //         localStorage.setItem("TOKEN", responseJson.token);
  //         // Our username and password (on this) should have data from the user
  //         this.navCtrl.push(ProfilePage, {
  //           // username: this.email,
  //           // password: this.password
  //         });
  //       },

  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  navigateToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  navigateTobrowse(charity: Charity) {
    this.navCtrl.push(BrowsePage, {
      charity: charity,
      user: this.user
    });
  }
  
  // navigateTopayment() {
  //   this.navCtrl.push(PaymentPage);
  // }
  navigateToprofile() {
    this.navCtrl.push(ProfilePage);
  }

  openJavaScript(){
    this.navCtrl.push(StripeJavaScriptPage)
  }

  navigateToportfolio(charity: Charity) {
    this.navCtrl.push(PortfolioPage, {
      charity: charity,
      user: this.user
  });
}
 
  // openNative(){
  //   this.navCtrl.push(StripeNativePage)
  // }
}





