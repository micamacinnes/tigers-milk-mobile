import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

import { Chart } from '../../../node_modules/chart.js';
import { MyCharity } from '../../models/myCharity';
import { Slice } from '../../models/slice';
import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { Http } from '@angular/http';
import { Donation } from '../../models/donation.js';
// import { decode } from 'jsonwebtoken';


@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})

export class PortfolioPage {
  public user: User = new User();
  donations: Array<Donation> = [];
  public technologies: Array<Slice> = [];
  public amount: number = 0;
  public total: number = 0;
  public totals: Array<Donation> = [];
  pie: any;
  public token: string;
  public max: number = 0;
  jwt: string;
  public charities: Array<any> = [];
  // public amountArr: Array<number> = [];
  // public userID: number;


  @ViewChild('pieChart') pieChart;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.jwt = localStorage.getItem('Token');
    this.http.get("http://localhost:3000/donations?&jwt=" + localStorage.getItem("Token"), {

    })
      .subscribe(
        result => {
          this.donations = result.json();
          var other = true;
          for (let i = 0; i < this.donations.length; i++) {
            this.total += this.donations[i].amount;
            // console
            for (let j = 0; j < this.totals.length; j++) {
              if (this.totals[j].charityID && (this.donations[i].charityID== this.totals[j].charityID)){
              other = false;
              this.totals[j].amount += this.donations[i].amount;
            }
            }
            if (other){
              this.totals.push(this.donations[i]);
            }
           other = true;
          }

          this.max = this.totals[0].amount;

          for (var k = 0; k < this.totals.length; k++) {
            let newSlice = new Slice();
            newSlice.technology = this.totals[k].name;
            if (this.totals[k].amount > this.max) {
              this.max = this.totals[k].amount;
            }
            let colorArr: Array<string> = ["rgb(205,92,92)", "rgb(255,165,0)","rgb(128,0,0)","rgb(255,127,80)", "rgb(220,20,60)", "rgb(255,0,0)",  "rgb(255,215,0)", "rgb(128,128,0)", "rgb(154,205,50)", "rgb(85,107,47)", "rgb(124,252,0)", "rgb(144,238,144)", "rgb(143,188,143)", "rgb(47,79,79)", "rgb(0,139,139)", "rgb(0,255,255)", "rgb(224,255,255)", "rgb(70,130,180)", "rgb(30,144,255)", "rgb(25,25,112)"];
            newSlice.time = this.totals[k].amount;
            newSlice.color = colorArr[k];
            this.technologies.push(newSlice);
          }
          this.defineChartData();
          this.createPieChart();

        },
        error => {
          console.log(error);
        }
      )



  }

  update() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  public pieChartEl: any;
  public chartLabels: any = [];
  public chartValues: any = [];
  public chartColours: any = [];
  public chartHoverColours: any = [];
  public chartLoadingEl: any;

  ionViewDidLoad() {
    // this.defineChartData();

    // this.getDonationAmount();
    // this.showDonations();

    
    // this.createPieChart();
  }

  defineChartData(): void {
    let y: any;

    for (y in this.technologies) {
      var tech = this.technologies[y];

      // this.chartLabels.push(tech.technology);
      this.chartValues.push(tech.time);
      this.chartColours.push(tech.color);
    }
    this.chartLabels = ["Tiger Haven", "Rhino Rescue Project"]
  }

  ionViewWillEnter(){
    this.createPieChart();
  }

  // charityList(){
  //   var i;
  //   var list = [];
  //   for (i = 0; this.charities.length;i++){
  //     list.push(this.charities[i].name);
  //   }
  //   return list;
  // }

  /**
  *
  * Configure the Pie chart, define configuration options
  *
  */
  createPieChart() {

    this.pie = new Chart(this.pieChart.nativeElement,
      {
        type: 'pie',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Donation Breakdown',
            data: this.chartValues,
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.chartColours,
            // hoverBackgroundColor: [
            //   "#FF6384",
            //   "#36A2EB",
            //   "#FFCE56",
            //   "#FF6384",
            //   "#36A2EB",
            //   "#FFCE56"
            // ]
          }]
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          animation: {
            duration: 3000
          }
        }
      });

    this.chartLoadingEl = this.pie.generateLegend();
  }




}