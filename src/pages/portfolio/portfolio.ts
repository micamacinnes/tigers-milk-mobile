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


@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})

export class PortfolioPage {

  donations: Array<any> = [];
  // public technologies: Array<Slice> = [];
  public amount: number = 0;
  public total: number;
  numCharities: number;
  pie: any;

  public charityArr: Array<string> = [];
  public amountArr: Array<number> = [];

 

  @ViewChild('pieChart') pieChart;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    // let colorArr: Array<string> = ["rgb(128,0,0)", "rgb(220,20,60)", "rgb(255,0,0)", "rgb(255,127,80)", "rgb(205,92,92)", "rgb(255,165,0)", "rgb(255,215,0)", "rgb(128,128,0)", "rgb(154,205,50)", "rgb(85,107,47)", "rgb(124,252,0)", "rgb(144,238,144)", "rgb(143,188,143)", "rgb(47,79,79)", "rgb(0,139,139)", "rgb(0,255,255)", "rgb(224,255,255)", "rgb(70,130,180)", "rgb(30,144,255)", "rgb(25,25,112)"];


    // let newSlice = new Slice();
    // newSlice.technology = "Domestic Animal Rescue Group";
    // newSlice.time = 40;
    // newSlice.color = colorArr[1];
    // this.technologies.push(newSlice);

    // let newSlice1 = new Slice();
    // newSlice1.technology = "Tiger Haven";
    // newSlice1.time = 100;
    // newSlice1.color = colorArr[2];
    // this.technologies.push(newSlice1);

    // let newSlice2 = new Slice();
    // newSlice2.technology = "Rhino Rescuse Project";
    // newSlice2.time = 160;
    // newSlice2.color = colorArr[5];
    // this.technologies.push(newSlice2);

  }



  public pieChartEl: any;
  public chartLabels: any = [];
  // public chartValues: any = [];
  public chartColours: any = [];
  public chartHoverColours: any = [];
  public chartLoadingEl: any;

  ionViewDidLoad() {
    // this.defineChartData();
    this.showDonations();
    this.getDonationAmount();
  }

  // update() {
  //   this.navCtrl.setRoot(this.navCtrl.getActive().component);
  // }


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

          return this.total;

        },
        error => {
          console.log(error);
        }
      );
  }

  getDonationAmount() {
    this.http.get("http://localhost:3000/donations?&jwt=" + localStorage.getItem("Token"), {
    })
      .subscribe(
        result => {
          console.log(result);
          var resultCharities = result.json();
          // map - updated charity to updated donation amount 
          let donationMap: Map<string, number> = new Map<string, number>();
          var charityArr2: Array<string> = [];
          var amountArr2: Array<number> = [];


          for (var i = 0; i < resultCharities.length; i++) {
            if (donationMap.has(resultCharities[i].charityName)) {
              donationMap.set(resultCharities[i].charityName, donationMap.get(resultCharities[i].charityName) + resultCharities[i].amount);
            }
            else {
              donationMap.set(resultCharities[i].charityName, resultCharities[i].amount);
              this.charityArr.push(resultCharities[i].charityName);
            }

          }

          this.numCharities = this.charityArr.length;
          for (var b = 0; b < this.charityArr.length; b++) {
            this.amountArr.push(donationMap.get(this.charityArr[b]));
          }
        },
        error => {
          console.log(error);
        }
      );
  }


  /**
  *
  * Configure the Pie chart, define configuration options
  *
  */
  createPieChart(amountArr:Array<number>, charityArr:Array<string>) {

    this.pieChartEl = new Chart(this.pieChart.nativeElement,
      {
        type: 'pie',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Donation Breakdown',
            data: this.amountArr,
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: [
              "rgb(128,0,0)",
              "rgb(220,20,60)",
              "rgb(255,0,0)",
              "rgb(255,127,80)",
              "rgb(205,92,92)",
              "rgb(255,165,0)",
              "rgb(255,215,0)",
              "rgb(128,128,0)",
              "rgb(154,205,50)"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ]
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
            duration: 5000
          }
        }
      });

    this.chartLoadingEl = this.pieChartEl.generateLegend();
  }



}