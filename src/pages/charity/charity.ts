import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { MyCharity } from '../../models/myCharity';
import { Charity } from '../../models/charityProfile';
<<<<<<< HEAD
import { PaymentPage } from '../payment/payment';
import { User } from '../../models/user';
import { StripeJavaScriptPage} from '../stripe-java-script/stripe-java-script';
=======
// import { PaymentPage } from '../payment/payment';
import { User } from '../../models/user';
import { StripeJavaScriptPage} from '../stripe-java-script/stripe-java-script';

>>>>>>> 2249c40e6cba40b59233c92981d160793bfebb6d
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
  
  public user: User = new User();
  public charity: Charity = new Charity();


    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
      this.charity = this.navParams.get("charity");
      this.user = this.navParams.get("user");
    }

  navigateToCharity(item) {
    this.navCtrl.push(CharityPage, {
      charity: this.charity,
      user: this.user

    });
  }


  // ionViewDidLoad() {
  //   this.user = this.navParams.get("user");
  //   this.charity = this.navParams.get("charity");
  // }
 
  

  navigateToPayment() {
    this.navCtrl.push(StripeJavaScriptPage, {
      charity: this.charity,
      user: this.user
    });
  }

  navigateToBrowse(charity: Charity) {
    this.navCtrl.push(CharityPage, {
      charity: charity,
      user: this.user
    });
  }
  
  presentToast() {
    let charity: Charity = this.charity;
    let toast = this.toastCtrl.create({
      message: 'Added to NewsFeed',
      duration: 2000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
    console.log('added to feed')
  }

  
}