import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { Charity } from '../../models/charityProfile';



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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var charity1 = new Charity();
    charity1.id = 1;
    charity1.name = "Domestic Animal Rescue Group";
    charity1.slogan = "Save Animals!";
    charity1.about = "We give dogs and cats a second chance.";

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowsePage');
  }
  navigateToCharity(charity: Charity) {
    this.navCtrl.push(CharityPage, {
      charity: charity,
    });

  }

  navigateToBrowse(charity: Charity) {
    this.navCtrl.push(CharityPage, {
      charity: charity,
    });
  }
}