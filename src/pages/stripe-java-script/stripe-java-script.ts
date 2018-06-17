import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { Charity } from '../../models/charityProfile';
import { MyCharity } from '../../models/myCharity';
import { User } from '../../models/user';
import { Http } from '@angular/http';
declare var Stripe;
 
@Component({
  selector: 'page-stripe-java-script',
  templateUrl: 'stripe-java-script.html',
})
export class StripeJavaScriptPage {
 
  stripe = Stripe('pk_test_3SwPUqJIjakXCBIy3ytwG8st');
  card: any;
  public charity: Charity = new Charity();
  public user: User;
  public amount: number;
  private token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController,private http: Http) {
      var newDonation = new MyCharity();
      newDonation.percentage += this.amount;
      
      this.charity = this.navParams.get('charity');
  }
 
  ionViewDidLoad() {
    this.setupStripe();

    this.token = localStorage.getItem("TOKEN");
    console.log("payment token", this.token)

    this.http.get("http://localhost:3000/me?jwt=" + this.token)
      .subscribe(
        result => {
          console.log(result);
          this.user = result.json().user;
          console.log(this.user);
          // this.navCtrl.push(ProfilePage);
        },
        error => {
          console.log(error);
        }
      );
  }
 
  setupStripe(){
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
 
    this.card = elements.create('card', { style: style });
 
    this.card.mount('#card-element');
 
    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
 
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
 
      // this.stripe.createToken(this.card)
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
        }
      });
    });
  }


 
  confirmDonate() {
    const confirm = this.alertCtrl.create({
      title: 'Donation Confirmation',
      message: 'Are you sure you want to donate $' + this.amount + '?',
      // want to add charity info to the alert
      // add amount donated
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm clicked');

            let loading = this.loadingCtrl.create({
              spinner: 'dots',
              content: 'Sending donation...',
              duration: 3000
            });
          
            loading.onDidDismiss(() => {
              console.log('Dismissed loading');
              let toast = this.toastCtrl.create({
                message: 'You\'re donation has been sent.',
                duration: 3000,
                position: 'middle'
              });
  
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
                this.navCtrl.push(CharityPage, {
                  charity: this.charity,
                });
                
              });
  
              toast.present();
              this.user.totalDonated = this.amount;
              console.log(this.user.totalDonated);
              
            });
          
            loading.present();
            

          }
        },
      ]
    });
    confirm.present();

  }


}

