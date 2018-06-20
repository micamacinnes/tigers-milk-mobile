import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { User } from '../../models/user';
import { Http } from '@angular/http';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  
  user_info: Array<User> = [];
  public user: User = new User();
  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  private token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private http: Http, public viewCtrl: ViewController) {
      this.user = new User();
  }

  ionViewDidLoad() {
    this.token = localStorage.getItem("TOKEN");
    console.log("editProfile token", this.token)

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
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  saveProfileInfo(){
    // updates token with new information
    // goes back to profile page
  }
}
