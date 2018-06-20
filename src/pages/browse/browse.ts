import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, List } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { Charity } from '../../models/charityProfile';
import { User } from '../../models/user';



/**
 * Generated class for the BrowsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {

  public charities: Array<Charity> = [];
  public user: User = new User();
  public charity: any;

  @ViewChild('scheduleList', {read: List}) charityList: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.user = this.navParams.get("user");
    var charity1 = new Charity();
    charity1.id = 1;
    charity1.name = "Domestic Animal Rescue Group";
    charity1.slogan = "Save Animals!";
    charity1.about = "DARG is a pro-life, non-profit organisation that rescues, cares for, sterilizes and rehomes previously abused, neglected and abandoned cats and dogs. DARG provides a crucial role for the communities of Imizamo Yethu, Hangberg and the greater Hout Bay area.";
    

    var charity2 = new Charity();
    charity2.id = 2;
    charity2.name = "Tiger Haven";
    charity2.slogan = "Save the Tigers!";
    charity2.about = "Tiger Haven is a Sanctuary and Rescue facility for big cats, much like an animal shelter for dogs and house cats. Tiger Haven is a no kill shelter for big cats unlike most but not all domestic animal shelters.";

    var charity3 = new Charity();
    charity3.id = 3;
    charity3.name = "Rhino Rescue Project";
    charity3.slogan = "Save the Rhinos!";
    charity3.about = "The Rescue Project offers a sustainable, cost effective defensive strategy to protect rhinos in South Africa and elsewhere from poaching.";

    this.charities.push(charity1);
    this.charities.push(charity2);
    this.charities.push(charity3);
  }
  doAlert() {
    const alert = this.alertCtrl.create({
      title: 'This charity has been added to your favorites',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowsePage');
  }
  navigateToCharity(charity: Charity) {
    this.navCtrl.push(CharityPage, {
      charity: charity,
      user: this.user
    });

  }

  navigateToBrowse(charity: Charity) {
    this.navCtrl.push(CharityPage, {
      charity: charity,
      user: this.user
    });
  }
}