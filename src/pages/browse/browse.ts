import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { Charity } from '../../models/charityProfile';
import { AlertController } from 'ionic-angular';
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.user = this.navParams.get("user");
    var charity1 = new Charity();
    charity1.id = 1;
    charity1.name = "Domestic Animal Rescue Group";
    charity1.slogan = "Save Animals!";
    charity1.about = "We give dogs and cats a second chance.";
    charity1.image = "www.letsgo.co.za/medialibrary/Event/820x410/178.jpg";
    

    var charity2 = new Charity();
    charity2.id = 2;
    charity2.name = "Tiger Haven";
    charity2.slogan = "Save the Tigers!";
    charity2.about = "A safe place for big cats.";

    var charity3 = new Charity();
    charity3.id = 3;
    charity3.name = "Rhino Rescue Project";
    charity3.slogan = "Save the Rhinos!";
    charity3.about = "Proactive Poaching Prevention.";

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