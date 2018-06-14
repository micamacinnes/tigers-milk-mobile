import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, UrlSerializer, App, PopoverController  } from 'ionic-angular';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { ReactionsPage } from '../../pages/reactions/reactions';

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
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, private app: App) {
    window.addEventListener("contextmenu", (e) => { e.preventDefault(); });
    this.user = new User();
  }

  showReactions(ev){
 
    let reactions = this.popoverCtrl.create(ReactionsPage);

    reactions.present({
        ev: ev
    });

}

like(){
    console.log("like");
}


  ionViewDidLoad() {

    this.token = localStorage.getItem("TOKEN");
    console.log("profile token", this.token)

    // ask how to get info from token
  }

  logout(){
    this.app.getRootNav().setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
}
