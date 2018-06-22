import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, List, AlertController } from 'ionic-angular';
import { MyCharity } from '../../models/myCharity';
import { Charity } from '../../models/charityProfile';
// import { PaymentPage } from '../payment/payment';
import { User } from '../../models/user';
import { StripeJavaScriptPage} from '../stripe-java-script/stripe-java-script';
// import { ProfilePage } from '../profile/profile';
import { Http } from '@angular/http';

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
  
  public charity: any;
  public charityDetail: any;
  public charityName: string;
  public favouriteCharity: any;

  // public user: User = new User();
  //   public charities: Charity = new Charity();


    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: Http,    public alertCtrl: AlertController) {
      this.charityDetail = this.navParams.get("charityDetail");
      // this.charityName = this.navParams.get("charityName");

      // this.charities = this.navParams.get("charity");
      // this.user = this.navParams.get("user");
    }


  

  getDetails(charityID: number) {
    this.http.get("http://localhost:3000/charity/" + charityID, {
      })
      .subscribe(
        result => {
          this.charity = result.json();         
        },
        error => {
          console.log(error);
        }
      );
  }

  ionViewDidLoad() {
    this.getDetails(this.charityDetail);
  }
 
  

  navigateToPayment(id: number) {
    this.navCtrl.push(StripeJavaScriptPage, {
      charityDetail: this.charityDetail,
      // charityName: name
      // user: this.user,
      // charity: this.charities
    });
  }

  // navigateToBrowse(charity: Charity) {
  //   this.navCtrl.push(CharityPage, {
  //     charity: charity,
  //     user: this.user
  //   });
  // }
  
  // presentToast() {
  //   let charity: Charity = this.charity;
  //   let toast = this.toastCtrl.create({
  //     message: 'Added to NewsFeed',
  //     duration: 2000,
  //     position: 'top'
  //   });
  
  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });
  
  //   toast.present();
  //   console.log('added to feed')
  // }
  
}

  
