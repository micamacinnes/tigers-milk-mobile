import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { BrowsePage } from '../browse/browse';
import { PortfolioPage } from '../portfolio/portfolio';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  public user: User = new User();
  public charity: Charity = new Charity();
  public payment: number;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.charity = this.navParams.get("charity");
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  navigateToPortfolio() {
    this.navCtrl.push(PortfolioPage, {
      user: this.user,
      payment: this.payment
    });
  }
}
