import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyCharity } from '../../models/myCharity';
import { Charity } from '../../models/charityProfile';
import { PaymentPage } from '../payment/payment';

/**
 * Generated class for the CharityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-charity',
  templateUrl: 'charity.html',
})
export class CharityPage {

    public charity: Charity = new Charity();


    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.charity = this.navParams.get("charity");
    }

  navigateToCharity(item) {
    this.navCtrl.push(CharityPage, {
      charity: this.charity,

    });
  }

  // ionViewDidLoad() {
  //   this.user = this.navParams.get("user");
  //   this.charity = this.navParams.get("charity");
  // }
 
  

  navigateToPayment() {
    this.navCtrl.push(PaymentPage, {
      charity: this.charity,
    });
  }

  navigateToBrowse(charity: Charity) {
    this.navCtrl.push(CharityPage, {
      charity: charity,
    });
  }
}