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
  
  public user: User = new User();
  public charity: Charity = new Charity()
  
  public charities: Array<Object> = [];

  public favouriteCharity: any;
  public buttonColor: string = 'primary';;


    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: Http,    public alertCtrl: AlertController) {
      this.charity = this.navParams.get("charity");
      this.user = this.navParams.get("user");
    }


  //   getCharities() {
  //     this.http.get("http://localhost:3000/allCharities?jwt=" + localStorage.getItem("Token"), {
  //       })
  //       .subscribe(
  //         result => {
  //           this.charities = result.json();
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     };

  //     allCharities(){
  //       this.http.get("http://localhost:3000/allCharities?jwt=" + localStorage.getItem("Token"), {
  //       })
  //       .subscribe(
  //         result => {
  //           this.charities = result.json();
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     }



  //     addToFavourite(charityid:number){

  //       //change button color 
  //      // if(this.buttonColor == 'primary'){
  //      //   this.buttonColor = 'clear' 
  //      //   }else{
  //      //   this.buttonColor = 'primary'
  //      //   }
       
  //      //show alert
  //      let alert = this.alertCtrl.create({
  //        title: 'Favorite Added',
  //        buttons: [{
  //          text: 'OK',
  //        }]
  //      });
  //      // now present the alert on top of all other content
  //      //
  //      alert.present();

  //     this.http.post("http://localhost:3000/favourite?charityId="+ charityid + "&jwt=" + localStorage.getItem("Token") ,{

  //     })
  //     .subscribe(
  //      result => {
  //        console.log(result);
  //         // create an alert instance
  //      },
  //      error => {
  //        console.log(error);
  //      }
  //    );
  //  };

  //     favouriteCharities(){
  //       this.http.get("http://localhost:3000/favourite?jwt=" + localStorage.getItem("Token"), {
  //       })
  //       .subscribe(
  //         result => {
  //           this.charities = result.json();
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     }

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