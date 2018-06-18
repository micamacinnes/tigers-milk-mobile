import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Chart } from '../../../node_modules/chart.js';
import { MyCharity } from '../../models/myCharity';
import { Slice } from '../../models/slice';
import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { SlicePipe } from '@angular/common';
import { Donation } from '../../models/donation';
/**
 * Generated class for the PortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {

  public user: User = new User();
  public charity: Charity = new Charity();
  public technologies: Array<Slice> = [];
  public totalDonations: number = 0;
  public donations: Array<Donation> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {

    this.user = this.navParams.get("user");
    let colorArr: Array<string> = ["rgb(128,0,0)", "rgb(220,20,60)", "rgb(255,0,0)", "rgb(255,127,80)", "rgb(205,92,92)", "rgb(255,165,0)", "rgb(255,215,0)", "rgb(128,128,0)", "rgb(154,205,50)", "rgb(85,107,47)", "rgb(124,252,0)", "rgb(144,238,144)", "rgb(143,188,143)", "rgb(47,79,79)", "rgb(0,139,139)", "rgb(0,255,255)", "rgb(224,255,255)", "rgb(70,130,180)", "rgb(30,144,255)", "rgb(25,25,112)"];

    if (this.navParams.get('totalDonations')) {
      this.totalDonations = this.navParams.get('totalDonations');
    }

    if (this.navParams.get('charity')) {
      this.charity = this.navParams.get('charity');

      let newCharity = new MyCharity();
      newCharity.id = this.charity.id;
      newCharity.name = this.charity.name;

      this.user.myCharities.push(newCharity);

    }
    for (let i = 0; i < this.user.myCharities.length; i++) {
      let newSlice = new Slice();
      newSlice.technology = this.user.myCharities[i].name;
      newSlice.time = this.user.myCharities[i].percentage;
      newSlice.color = colorArr[i];
      this.technologies.push(newSlice);
    }
  }



  @ViewChild('doughnutChart') doughnutChart;


  public doughnutChartEl: any;
  public chartLabels: any = [];
  public chartValues: any = [];
  public chartColours: any = [];
  public chartHoverColours: any = [];
  public chartLoadingEl: any;

  ionViewDidLoad() {
    this.createDoughnutChart();
  }

  update() {
    this.navCtrl.push(PortfolioPage, {
      user: this.user,
      // totalDonations: this.totalDonations
    });
  }


  /**
   *
   * Parse the JSON data, push specific keys into selected arrays for use with
   * each chart
   *
   */
  // defineChartData(): void {
  //   let k: any;

  //   for (k in this.technologies) {
  //     var tech = this.technologies[k];

  //     this.chartLabels.push(tech.technology);
  //     this.chartValues.push(tech.time);
  //     this.chartColours.push(tech.color);
  //     //this.chartHoverColours.push(tech.hover);
  //   }
  // }



  createDoughnutChart() {

    this.doughnutChart = new Chart(this.doughnutChart.nativeElement,
      {
        type: 'doughnut',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Breakdown of ' + this.user.firstname + '\'s Donations',
            data: this.chartValues,
            duration: 1000,
            // easing: 'easeInQuart',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
          }]
        },
        options: {
          // maintainAspectRatio: false,
          layout: {
            // padding: {
            //   left: 10,
            //   right: 0,
            //   top: 0,
            //   bottom: 0
            // }
          },
          animation: {
            duration: 5000
          }
        }
      });

    this.chartLoadingEl = this.doughnutChart.generateLegend();
  }



}