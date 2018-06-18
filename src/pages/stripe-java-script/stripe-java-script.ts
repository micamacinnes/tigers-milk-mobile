import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Charity } from '../../models/charity';
import { Http } from '@angular/http';
 
declare var Stripe;
 
@Component({
  selector: 'page-stripe-java-script',
  templateUrl: 'stripe-java-script.html',
})
export class StripeJavaScriptPage {
 
  public charity: Charity;
  public amount: number;
  public user_id: number;
  public charity_id: number
  stripe = Stripe('pk_test_3SwPUqJIjakXCBIy3ytwG8st');
  card: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: Http, public toastCtrl: ToastController) {
  

  
    this.charity = this.navParams.get("charity");

  }
  ionViewDidLoad() {
    this.setupStripe();
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
          let source = result.source;
          this.stripe.charges.create({
            amount: 1000,
            currency: "usd",
            customer: "cus_AFGbOSiITuJVDs",
            source,
          }, function(err, charge) {
            console.log(charge);
          });

          console.log(result);
        }
      });
    });
  }
 
  submittingPayment() {
    let loader = this.loadingCtrl.create({
        content: "Submitting payment...",
        duration: 500
    });
    loader.present();
    this.http
        .post("http://localhost:3000/donation", {
            user_id: this.user_id,
            amount: this.amount,
            charity_id: this.charity_id
        })
        .subscribe(
            result => {
                console.log(result);
                this.sendDonation();
            },
            error => {

                console.log(error);
                let toast = this.toastCtrl.create({
                    message: 'Error occured while processing payment.',
                    duration: 2000
                });
                toast.present();
            }
        );
}

sendDonation() {
    let toast = this.toastCtrl.create({
        message: 'Donation made!',
        duration: 3000
    });
    toast.present();
}
}
