import { forEach } from '@angular/router/src/utils/collection';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public http: Http) { }

  public brandPrimary: string = '#20a8d8';
  public brandSuccess: string = '#4dbd74';
  public brandInfo: string = '#63c2de';
  public brandWarning: string = '#f8cb00';
  public brandDanger: string = '#f86c6b';


  startDate: Date;
  endDate: Date;

  startDateString = "";
  endDateString = "";
  viewType: string = "day";

  hrData: Array<any> = [];
  sleepData: Array<any> = [];
  stepData: Array<any> = [];

  // dropdown buttons
  public status: { isopen: boolean } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public mainChartData1: Array<any> = [];
  public mainChartData2: Array<any> = [];
  public mainChartData3: Array<any> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Heart Rate'
    },
    {
      data: this.mainChartData2,
      label: 'Step Count'
    },
    {
      data: this.mainChartData3,
      label: 'Sleep Data'
    }
  ];
  public mainChartLabels: Array<any> = ['hello', 'world'];
  public mainChartOptions: any = {
    responsive: true,
    // showLines: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value) {
            return value;
          }


        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: Math.ceil(250 / 10),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 2,
        hitRadius: 2,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: this.convertHex(this.brandInfo, 10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend: boolean = false;
  public mainChartType: string = 'line';

  public next() {
    this.startDate.setDate(this.startDate.getDate() + 1);
    this.endDate.setDate(this.endDate.getDate() + 1);
    this.update();
  }

  public prev() {
    this.startDate.setDate(this.startDate.getDate() - 1);
    this.endDate.setDate(this.endDate.getDate() - 1);
    this.update();
  }

  public update() {
    this.endDateString = this.endDate.toDateString();
    this.startDateString = this.startDate.toDateString();
    // this.setXLabels();
    this.parseStepData();
    // this.parseHRForData();
    // this.parseSleepData();
  }

  setXLabels() {
    switch (this.viewType) {
      case 'day':
        let startTimestamp = this.startDate.getTime();
        let endTimestamp = this.endDate.getTime();
        for (let i = startTimestamp; i <= endTimestamp; i += 1000 * 30) {
          this.mainChartLabels.push(i);
        }

        break;
      default:
        break;
    }
  }

  parseHRForData() {
    this.mainChartData1.length = 0;
    let startTimestamp = this.startDate.getTime();
    let endTimestamp = this.endDate.getTime();
    this.hrData.forEach(element => {
      if (startTimestamp < element.timestamp && element.timestamp < endTimestamp) {
        // this.mainChartLabels.push(element.timestamp);
        this.mainChartData1.push(<number>element.heartrate);
      }
    });
  }

  parseSleepData() {
    this.mainChartData3.length = 0;
    let startTimestamp = this.startDate.getTime();
    let endTimestamp = this.endDate.getTime();
    this.sleepData.forEach(element => {
      if (startTimestamp < element.startTime && element.endTime < endTimestamp + 60 * 60 * 12 * 1000) {
        this.mainChartData3.push({ x: element.startTime - 0.000001, y: 0 });
        this.mainChartData3.push({ x: element.startTime, y: 50 });
        this.mainChartData3.push({ x: element.endTime, y: 50 });
        this.mainChartData3.push({ x: element.endTime + 0.000001, y: 0 });
      }
    });
  }

  parseStepData() {
    this.mainChartData2.length = 0;
    this.mainChartLabels.length = 0;
    let startTimestamp = this.startDate.getTime();
    this.stepData.forEach((item) => {
      if (startTimestamp < item.timestamp) {
        this.mainChartLabels.push(parseInt(item.timestamp) * 1000);
        this.mainChartData2.push(item.stepcount);
      }
    });
  }

  resetToZeroDate(date: Date) {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  resetToEndDay(date: Date) {
    date.setHours(23, 59, 59, 0);
    return date;
  }


  ngOnInit(): void {
    this.endDate = this.resetToEndDay(new Date());
    this.startDate = this.resetToZeroDate(new Date());
    this.prev();
    this.prev();


    // this.http.get('assets/data/hr_data.json').subscribe(result => {
    //   this.hrData = <Array<any>>result.json();
    //   this.update();
    // });


    this.http.get('assets/data/step_count_data.json').subscribe(result => {
      this.stepData = <Array<any>>result.json();
      this.update();
    });
    //  this.http.get('assets/data/exercise_data.json').subscribe(result=>{
    //    console.log(result.json());
    // //  });
    // this.http.get('assets/data/sleep_data.json').subscribe(result => {
    //   this.sleepData = <Array<any>>result.json();
    //   this.update();
    // })
  }

}
