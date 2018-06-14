import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http, HttpModule } from "@angular/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PaymentPage } from '../pages/payment/payment';
import { RegisterPage } from '../pages/register/register';
import { BrowsePage } from '../pages/browse/browse';

import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../auth.service';
import { PortfolioPage } from '../pages/portfolio/portfolio';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    PaymentPage,
    BrowsePage,
    ProfilePage,
    TabsPage,
    PortfolioPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    PaymentPage,
    BrowsePage,
    ProfilePage,
    TabsPage,
    PortfolioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
