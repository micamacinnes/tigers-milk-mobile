import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, UrlSerializer, App, PopoverController, ModalController } from 'ionic-angular';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { ReactionsPage } from '../../pages/reactions/reactions';
import { Http } from '@angular/http';
import { MyCharity } from '../../models/myCharity';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { Posts } from '../../models/posts';
import { CharityPage } from '../charity/charity';
import { StripeJavaScriptPage } from '../stripe-java-script/stripe-java-script';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // public firstname: string;
  // public lastname: string;

  public user: User;
  private token: string;
  // public postProperties: Array<object> = [];
  // public postNumber: number;
  donations: Array<any> = [];
  public total: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, private app: App,
    private http: Http, public modalCtrl: ModalController) {
    window.addEventListener("contextmenu", (e) => { e.preventDefault(); });
    this.user = new User();
    this.showDonations();
    // localStorage.getItem("TOKEN");
  }

  showReactions(ev) {
    let reactions = this.popoverCtrl.create(ReactionsPage);
    reactions.present({
      ev: ev
    });
  }

  like() {
    console.log("like");
  }


  ionViewDidLoad() {
    this.token = localStorage.getItem("TOKEN");
    console.log("profile token", this.token)

    this.http.get("http://localhost:3000/me?jwt=" + this.token)
      .subscribe(
        result => {
          console.log(result);
          this.user = result.json().user;
          console.log(this.user);
          
        },
        error => {
          console.log(error);
        }
      );
      this.showDonations();
      // this.updateTotal();
  }

  ionViewWillEnter() {
    this.showDonations();
    
  }

  navigateToEditProfileModal(){
    let modal = this.modalCtrl.create(EditProfilePage, { token: this.token });
    modal.present();
    // this.navCtrl.push(EditProfilePage, {
    //   token: this.token,}
    // );
  }

  showDonations() {
    this.http.get("http://localhost:3000/donations?jwt=" + localStorage.getItem("Token"), {
    })
      .subscribe(
        result => {
          this.donations = result.json();
          this.total = 0;
          var allDonations: Array<number> = [];

          // get all donations and push into array
          for (var i = 0; i < this.donations.length; i++) {
            var donationAmount = this.donations[i].amount;
            allDonations.push(donationAmount);
          }
          // sum up the total donations
          for (var j = 0; j < allDonations.length; j++) {
            this.total += allDonations[j];
          }
          console.log(this.total);
          if (this.total == 0 || this.total == null){
            this.total == 0;
            return this.total;
          }
          return this.total;
          

        },
        error => {
          console.log(error);
        }
      );
  }

  logout() {
    this.app.getRootNav().setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
}
