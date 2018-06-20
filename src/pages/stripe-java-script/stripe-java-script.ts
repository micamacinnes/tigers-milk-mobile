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

  stripe = Stripe('pk_test_yYYEc7jOM9MuZfDB6jUrdckR');
  card: any;
  name: string;
  amount: number;
  curency: string;

  oneTime: boolean;
  monthly: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController, private http: Http) {
    // var newDonation = new MyCharity();
    // newDonation.percentage += this.amount;

    // this.charity = this.navParams.get('charity');
    // this.charity = new Charity;
    // this.user = new User();
  }
  ionViewDidLoad() {
    this.setupStripe();
  }
  // chose one-time payment
  oneTimeTrue() {
    this.oneTime = true;
    this.monthly = false;
  }

  // chose monthly payment
  monthlyTrue() {
    this.oneTime = false;
    this.monthly = true;
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
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
      if (this.oneTime) {
        this.stripe.createToken(this.card)
          .then(result => {
            if (result.error) {
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              console.log(result.token);
              this.stripeTokenHandler(result.token);
              // this.navCtrl.setRoot(PortfolioPage);
              this.sendDonation();
            }
          })
      } else {
        this.stripe.createSource(this.card)
          .then(result => {
            if (result.error) {
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {

              this.stripeSourceHandler(result.source);
              // this.navCtrl.setRoot(PortfolioPage);
              this.sendDonation();
            }
          });
      }
    });
  }

  stripeTokenHandler(token) {
    this.http
      .post("http://localhost:3000/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.name,
        paymenttoken: token.id,
        amount: this.amount,
        curency: this.curency,
        date: new Date().toDateString(),
        // time: new Date().toTimeString()
      })

      .subscribe(
        result => {
          console.log(result);
        },

        error => {
          console.log(error);
        });
  }

  stripeSourceHandler(source) {
    this.http
      .post("http://localhost:3000/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.name,
        paymenttoken: source.id,
        amount: this.amount,
        curency: this.curency,
        date: new Date().toDateString(),
      })

      .subscribe(
        result => {
          console.log(result);
        },

        error => {
          console.log(error);
        });
  }


  sendDonation() {
    let toast = this.toastCtrl.create({
      message: 'Donation Successful!',
      duration: 3000
    });
    console.log('Donate clicked');
    toast.present();
  }

  // createDonation() {
  //   this.http.post("http://localhost:3000/createDonation?charityId="+ this.charity + "&jwt=" + localStorage.getItem("Token"),{
  //      amount: this.amount,
  //      date: "15 May",
  //   })
       
  //      .subscribe(
  //       result => {
  //         console.log(result);
          
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   };
  // }
}









  // confirmDonate() {
  //   const confirm = this.alertCtrl.create({
  //     title: 'Donation Confirmation',
  //     message: 'Are you sure you want to donate $' + this.amount + '?',
  //     // want to add charity info to the alert
  //     // add amount donated
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           console.log('Cancel clicked')
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: () => {
  //           console.log('Confirm clicked');

  //           let loading = this.loadingCtrl.create({
  //             spinner: 'dots',
  //             content: 'Sending donation...',
  //             duration: 3000
  //           });

  //           loading.onDidDismiss(() => {
  //             console.log('Dismissed loading');
  //             let toast = this.toastCtrl.create({
  //               message: 'You\'re donation has been sent.',
  //               duration: 3000,
  //               position: 'middle'
  //             });

  //             toast.onDidDismiss(() => {
  //               console.log('Dismissed toast');
  //               this.navCtrl.push(CharityPage, {
  //                 charity: this.charity,
  //               });

  //             });

  //             toast.present();
  //             this.user.totalDonated = this.amount;
  //             console.log(this.user.totalDonated);

  //           });

  //           loading.present();


  //         }
  //       },
  //     ]
  //   });
  //   confirm.present();

  // }
  // showAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Donation Successful!',
  //     subTitle: 'Thank you for your support!',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }



