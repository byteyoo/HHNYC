import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // constructor( ) { }

  public brandPrimary: string = '#20a8d8';
  public brandSuccess: string = '#4dbd74';
  public brandInfo: string = '#63c2de';
  public brandWarning: string = '#f8cb00';
  public brandDanger: string = '#f86c6b';

  viewType: { exercise: boolean, sleep: boolean } = { exercise: true, sleep: false };

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

  markCandidates = [];

  // events
  public chartClicked(e: any): void {
    let date: Date;
    this.markCandidates = [];
    let item;
    e.active.forEach(element => {
      let index = element._index;
      item = this.exerciseFlags[index];
      date = new Date(parseInt(item.timestamp));
    })
    this.exerciseFlags.forEach(element => {
      if (item.timestamp - 1 * 60 * 60 * 1000 < element.timestamp && element.timestamp < item.timestamp + 1 * 60 * 60 * 1000) {
        if (this.markCandidates.indexOf(element) == -1)
          this.markCandidates.push(element);

      }
    })
    this.sleepFlags.forEach(element => {
      if (item.timestamp - 48 * 60 * 60 * 1000 < element.timestamp && element.timestamp < item.timestamp + 48 * 60 * 60 * 1000)
        if (this.markCandidates.indexOf(element) == -1)
          this.markCandidates.push(element);
    })

    this.jumpToDate(date);

  }

  clearFlags() {
    this.markCandidates = [];
  }

  jumpToDate(date: Date) {
    this.startDate.setFullYear(date.getFullYear());
    this.startDate.setMonth(date.getMonth());
    this.startDate.setDate(date.getDate());

    this.endDate.setFullYear(date.getFullYear());
    this.endDate.setMonth(date.getMonth());
    this.endDate.setDate(date.getDate());

    this.update(false);
  }

  // lineChart1
  public lineChart1: Array<number> = [0, 1, 2];
  public lineChart1Data: Array<any> = [
    {
      data: this.lineChart1,
      label: 'Heart Rate'
    }
  ];
  public lineChart1Labels: Array<any> = [30, 20, 25];
  public lineChart1Options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return new Date(value).toLocaleTimeString();
          }
        }
      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40,
          max: 120
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend: boolean = false;
  public lineChart1Type: string = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Calories'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return new Date(value).toLocaleTimeString();
          }
        }
      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 400,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend: boolean = false;
  public lineChart2Type: string = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Sleep'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return new Date(value).toLocaleTimeString();
          }
        }
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend: boolean = false;
  public lineChart3Type: string = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Step Count'
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        barPercentage: 1.2,
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return new Date(value).toLocaleTimeString();
          }
        }
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend: boolean = false;
  public barChart1Type: string = 'bar';

  // mainChart

  public mainChartElements: number = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public mainChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return new Date(value).toLocaleDateString() + " @ " + new Date(value).toLocaleTimeString();
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 1,
          stepSize: 1,
          max: 4
        }
      }]
    },
    showline: false,
    elements: {
      line: {
        borderWidth: 0
      },
      point: {
        radius: 4,
        hitRadius: 5,
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
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 0,
      showLine: false,
      borderDash: [8, 5]
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 0,
      showLine: false,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend: boolean = false;
  public mainChartType: string = 'line';


  startDate: Date;
  endDate: Date;
  startDateString: string;

  hrData: Array<any> = [];
  stepCount: Array<any> = [];
  sleepData: Array<any> = [];
  exerciseData: Array<any> = [];
  exerciseFlags: Array<any> = [];
  sleepFlags: Array<any> = [];

  resetToZeroDate(date: Date) {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  resetToEndDay(date: Date) {
    date.setHours(23, 59, 59, 0);
    return date;
  }

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

  meanHR: any = 0.0;

  updateHrData() {
    this.lineChart1.length = 0;
    this.lineChart1Labels = [];
    let startTimestamp = this.startDate.getTime();
    let endTimestamp = this.endDate.getTime();
    this.hrData.forEach(element => {
      if (startTimestamp < element.timestamp && element.timestamp < endTimestamp) {
        this.lineChart1Labels.push(element.timestamp);
        this.lineChart1.push(<number>element.heartrate);
        this.meanHR += parseFloat(element.heartrate);
      }
    });
    this.meanHR = (this.meanHR / this.lineChart1.length).toFixed(2);

  }
  totalSteps: number = 0;

  updateStepData() {
    this.barChart1Data[0].data.length = 0;
    this.barChart1Labels = [];
    let startTimestamp = this.startDate.getTime();
    let endTimestamp = this.endDate.getTime();
    this.stepCount.forEach(element => {
      if (startTimestamp < element.timestamp && element.timestamp < endTimestamp) {
        this.barChart1Labels.push(element.timestamp);
        this.barChart1Data[0].data.push(<number>element.stepcount / 2);
        this.totalSteps += <number>element.stepcount / 2;
      }
    });
  }

  sleepDuration: any;

  updateSleepData() {
    this.lineChart3Data[0].data.length = 0;
    this.lineChart3Labels = [];
    let startTimestamp = this.startDate.getTime();
    let endTimestamp = this.endDate.getTime();
    this.sleepData.forEach(element => {
      if (startTimestamp < element.startTime && element.endTime < endTimestamp + 60 * 60 * 12 * 1000) {
        this.lineChart3Labels.push(element.startTime - 1);
        this.lineChart3Labels.push(element.startTime);
        this.lineChart3Labels.push(element.endTime);
        this.lineChart3Labels.push(element.endTime + 1);
        this.lineChart3Data[0].data.push({ x: element.startTime - 1, y: 0 });
        this.lineChart3Data[0].data.push({ x: element.startTime, y: 100 });
        this.lineChart3Data[0].data.push({ x: element.endTime, y: 100 });
        this.lineChart3Data[0].data.push({ x: element.endTime + 1, y: 0 });

        this.sleepDuration += (<number>element.endTime - <number>element.startTime);
      }
    });
    this.sleepDuration = (this.sleepDuration / (1000 * 60 * 60)).toPrecision(2);
  }


  exerciseCalories: number;

  updateExerciseData() {
    this.lineChart2Data[0].data.length = 0;
    this.lineChart2Labels = [];
    let startTimestamp = this.startDate.getTime();
    let endTimestamp = this.endDate.getTime();
    this.exerciseData.forEach(element => {
      if (startTimestamp < element.startTime && element.endTime < endTimestamp + 60 * 60 * 12 * 1000) {
        this.lineChart2Labels.push(element.startTime - 1);
        this.lineChart2Labels.push(element.startTime);
        this.lineChart2Labels.push(element.endTime);
        this.lineChart2Labels.push(element.endTime + 1);
        this.lineChart2Data[0].data.push({ x: element.startTime - 1, y: 0 });
        this.lineChart2Data[0].data.push({ x: element.startTime, y: element.calorie });
        this.lineChart2Data[0].data.push({ x: element.endTime, y: element.calorie });
        this.lineChart2Data[0].data.push({ x: element.endTime + 1, y: 0 });
        this.exerciseCalories += <number>element.calorie;
      }
    });

  }
  totalExerciseFlags: number = 0;
  exerciseTotal: number;

  updateExerciseFlags() {
    this.mainChartData2.length = 0;
    this.mainChartLabels = [];
    this.exerciseFlags.forEach(element => {
      this.mainChartLabels.push(parseInt(element.timestamp));
      this.mainChartData2.push(parseInt(element.level));
      this.totalExerciseFlags += 1
      this.exerciseTotal += element.level;
    });
  }

  totalSleepFlags: number = 0;
  sleepTotal: number = 0;

  updateSleepFlags() {
    this.mainChartData3.length = 0;
    this.sleepFlags.forEach(element => {
      // this.mainChartLabels.push(parseInt(element.timestamp));
      this.mainChartData3.push(parseInt(element.level));
      this.totalSleepFlags += 1
      this.sleepTotal += element.level;
    });
  }

  totalFlags: number = 0;
  totalLevel: number = 0;

  update(updateFlags: boolean = true) {
    this.totalSteps = 0;
    this.meanHR = 60;
    this.sleepDuration = 0;
    this.exerciseCalories = 0;
    this.sleepTotal = 0;
    this.exerciseTotal = 0;
    this.totalExerciseFlags = 0;
    this.totalSleepFlags = 0;
    this.totalFlags = 0;
    this.sleepTotal = 0;
    this.totalLevel = 0;
    this.startDateString = this.startDate.toDateString();
    this.updateHrData();
    this.updateStepData();
    this.updateSleepData();
    this.updateExerciseData();
    if (updateFlags)
      this.switchView();
  }


  switchView() {
    this.updateExerciseFlags();
    this.updateSleepFlags();
    this.totalFlags = this.totalExerciseFlags + this.totalSleepFlags;
    this.totalLevel = this.sleepTotal + this.exerciseTotal;
  }

  constructor(public http: Http) { }

  ngOnInit(): void {
    this.endDate = this.resetToEndDay(new Date());
    this.startDate = this.resetToZeroDate(new Date());
    this.prev();

    // generate random values for mainChart
    this.http.get('assets/data/hr_data.json').subscribe(result => {
      this.hrData = <Array<any>>result.json();
      this.update();
    });

    // generate random values for mainChart
    this.http.get('assets/data/exercise_data.json').subscribe(result => {
      this.exerciseData = <Array<any>>result.json();
      this.update();
    });

    // generate random values for mainChart
    this.http.get('assets/data/sleep_data.json').subscribe(result => {
      this.sleepData = <Array<any>>result.json();
      this.update();
    });

    // generate random values for mainChart
    this.http.get('assets/data/step_count_data.json').subscribe(result => {
      this.stepCount = <Array<any>>result.json();
      this.update();
    });

    // generate random values for mainChart
    this.http.get('assets/data/exercise_flags.json').subscribe(result => {
      this.exerciseFlags = <Array<any>>result.json();
      this.update();
    });


    // generate random values for mainChart
    this.http.get('assets/data/sleep_flags.json').subscribe(result => {
      this.sleepFlags = <Array<any>>result.json();
      this.update();
    });

  }

  sleepMarkedFlags = [];
  exerciseMarkedFlags = [];
  sendRequest: boolean = false;
  markFlag() {
    let message: string = "Clarity - Health Insights. ";
    this.markCandidates.forEach(element => {
      if (element.sleep) {
        this.sleepMarkedFlags.push(element);
        message += "Sleep Deprivation alert: " + new Date(parseInt(element.timestamp)).toLocaleDateString() + ". ";
      } else {
        this.exerciseMarkedFlags.push(element);
        message += "Low Physical Activity alert: " + new Date(parseInt(element.timestamp)).toLocaleDateString() + ". ";
      }
    })
    message += "End of updates. -Clarity Team";

    this.sendRequest = true;
    this.http.post('https://claritydata.mybluemix.net/sendsms', {
      message: message
    }).subscribe(result => {
      setTimeout(() => {
        this.sendRequest = false;
      }, 1000)
      this.markCandidates = [];
    });
  }

}
