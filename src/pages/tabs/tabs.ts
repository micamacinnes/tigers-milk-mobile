import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { BrowsePage } from '../browse/browse';
import { PortfolioPage } from '../portfolio/portfolio';
import { MyCharity } from '../../models/myCharity';
import { Slice } from '../../models/slice';
import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { SlicePipe } from '@angular/common';
import { Donation } from '../../models/donation';
import { CharityPage } from '../charity/charity';


/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  profileRoot = ProfilePage;
  browseRoot = BrowsePage;
  portfolioRoot = PortfolioPage;


  constructor(public navCtrl: NavController) {
  }

}
