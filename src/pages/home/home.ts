import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { BrowsePage } from '../browse/browse';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

  }
  navigateToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  navigateTobrowse() {
    this.navCtrl.push(BrowsePage);
  }
  navigateToprofile() {
    this.navCtrl.push(ProfilePage);
  }
  }


