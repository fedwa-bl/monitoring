import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { Application } from '../entities/application';
import { ApplicationService } from '../_services/application.service';
import { TicketService } from '../_services/ticket.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-developer-statistics',
  templateUrl: './developer-statistics.component.html',
  styleUrls: ['./developer-statistics.component.css'],
})
export class DeveloperStatisticsComponent implements OnInit {
  applications: string[] = [];
  StatusselectedAppName!: string;
  CriticiteselectedAppName!: string;
  myChartInstance1!: Chart;
  myChartInstance2!: Chart;
  myChartInstance3!: Chart;
  @ViewChild('myChart1', { static: true }) myChart1!: ElementRef;
  @ViewChild('myChart2', { static: true }) myChart2!: ElementRef;
  @ViewChild('myChart3', { static: true }) myChart3!: ElementRef;
  @ViewChild('myChart4', { static: false }) myChart4!: ElementRef;
  applicationNames: string[] = []; // Store the application names
  selectedType!: string;
  status!: string;
  criticite!: string;

  constructor(
    private ticketService: TicketService,
    public userService: UserService,
    private applicationService: ApplicationService
  ) {}

  /*ngOnInit(): void {
    this.ticketService.getStatusCounts().subscribe(
      (response: any) => {
        console.log("JSON FORMAT :" +JSON.stringify(response));
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );    
  }*/

  ngOnInit() {
    this.StatusselectedAppName = '';
    this.CriticiteselectedAppName = '';
    this.selectedType = '';

    ///////////////////////////START FIRST CHART///////////////////////////

    //Statistique status des tickets par Application

    this.ticketService
      .getStatusByApplicationCounts(this.StatusselectedAppName)
      .subscribe((response: any) => {
        this.selectedType == '';
        const chartData = {
          labels: ['EN_COURS', 'OUVERT', 'RÉSOLU', 'ANNULÉ'],
          datasets: [
            {
              label: 'Status des tickets ' + this.StatusselectedAppName,
              data: [
                response.EN_COURS || 0,
                response.OUVERT || 0,
                response.RÉSOLU || 0,
                response.ANNULÉ || 0,
              ],
              backgroundColor: [
                'rgba(255, 255, 0, 0.2)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        const chartOptions = {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value: number) {
                    return Number.isInteger(value) ? value : '';
                  },
                },
              },
            ],
          },
        };
        const canvas = this.myChart1.nativeElement;
        const context = canvas.getContext('2d');

        // Destroy previous chart
        if (this.myChartInstance1) {
          this.myChartInstance1.destroy();
        }

        // Create new chart
        this.myChartInstance1 = new Chart(context, {
          type: 'bar',
          data: chartData,
          //options: chartOptions
        });
      });
    ///////////////////////////END FIRST CHART///////////////////////////

    ///////////////////////////START Second CHART///////////////////////////
    this.ticketService
      .getCriticiteByApplicationCounts(this.CriticiteselectedAppName)
      .subscribe((response: any) => {
        // Rest of the code to update the chart
        this.selectedType == '';
        const chartData = {
          labels: ['URGENT', 'CRITIQUE', 'NORMAL', 'NON_URGENT'],
          datasets: [
            {
              label: 'Criticité des tickets ' + this.CriticiteselectedAppName,
              data: [
                response.URGENT || 0,
                response.CRITIQUE || 0,
                response.NORMAL || 0,
                response.NON_URGENT || 0,
              ],
              backgroundColor: [
                'rgba(255, 0, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 255, 0, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        const chartOptions = {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value: number) {
                    return Number.isInteger(value) ? value : '';
                  },
                },
              },
            ],
          },
        };
        const canvas = this.myChart2.nativeElement;
        const context = canvas.getContext('2d');

        // Destroy previous chart
        if (this.myChartInstance2) {
          this.myChartInstance2.destroy();
        }

        // Create new chart
        this.myChartInstance2 = new Chart(context, {
          type: 'bar',
          data: chartData,
          //options: chartOptions
        });
      });
    ///////////////////////////END SECOND CHART///////////////////////////

    ///////////////////////////START Third CHART///////////////////////////

    //Statistique général par status ou par criticité
    if (this.selectedType == 'status') {
      this.StatusselectedAppName = '';
      this.ticketService
        .getStatusCounts(this.StatusselectedAppName)
        .subscribe((response: any) => {
          // Rest of the code to update the chart
          const chartData = {
            labels: ['EN_COURS', 'OUVERT', 'RÉSOLU', 'ANNULÉ'],
            datasets: [
              {
                label: 'Status des tickets ' + this.StatusselectedAppName,
                data: [
                  response.EN_COURS || 0,
                  response.OUVERT || 0,
                  response.RÉSOLU || 0,
                  response.ANNULÉ || 0,
                ],
                backgroundColor: [
                  'rgba(255, 255, 0, 0.2)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(0, 128, 0, 0.5)',
                  'rgba(255, 0, 0, 0.5)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

          const chartOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value: number) {
                      return Number.isInteger(value) ? value : '';
                    },
                  },
                },
              ],
            },
          };
          const canvas = this.myChart3.nativeElement;
          const context = canvas.getContext('2d');

          // Destroy previous chart
          if (this.myChartInstance3) {
            this.myChartInstance3.destroy();
          }

          // Create new chart
          this.myChartInstance3 = new Chart(context, {
            type: 'bar',
            data: chartData,
            //options: chartOptions
          });
        });
    } else if (this.selectedType == 'criticite') {
      this.CriticiteselectedAppName = '';
      this.ticketService
        .getCriticiteCounts(this.CriticiteselectedAppName)
        .subscribe((response: any) => {
          // Rest of the code to update the chart
          this.CriticiteselectedAppName = '';
          const chartData = {
            labels: ['URGENT', 'CRITIQUE', 'NORMAL', 'NON_URGENT'],
            datasets: [
              {
                label: 'Criticité des tickets ' + this.CriticiteselectedAppName,
                data: [
                  response.URGENT || 0,
                  response.CRITIQUE || 0,
                  response.NORMAL || 0,
                  response.NON_URGENT || 0,
                ],
                backgroundColor: [
                  'rgba(255, 0, 0, 0.5)',
                  'rgba(0, 128, 0, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(255, 255, 0, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

          const chartOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value: number) {
                      return Number.isInteger(value) ? value : '';
                    },
                  },
                },
              ],
            },
          };
          const canvas = this.myChart3.nativeElement;
          const context = canvas.getContext('2d');

          // Destroy previous chart
          if (this.myChartInstance3) {
            this.myChartInstance3.destroy();
          }

          // Create new chart
          this.myChartInstance3 = new Chart(context, {
            type: 'bar',
            data: chartData,
            //options: chartOptions
          });
        });
    } else {
      // Create initial empty chart
      const chartData = {
        labels: ['EN_COURS', 'OUVERT', 'RÉSOLU', 'ANNULÉ'],
        datasets: [
          {
            label: 'Status ou Criticité des tickets ',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      };

      const chartOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function (value: number) {
                  return Number.isInteger(value) ? value : '';
                },
              },
            },
          ],
        },
      };

      const canvas = this.myChart3.nativeElement;
      const context = canvas.getContext('2d');

      this.myChartInstance3 = new Chart(context, {
        type: 'bar',
        data: chartData,
        //options: chartOptions,
      });
    }

    ///////////////////////////END Third CHART///////////////////////////

    //get All appications
    /*this.applicationService.getAllApps().subscribe(
      (response: string[]) => {
        this.applications = response;
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );*/
    // Get all application names
    this.applicationService.getAllApps().subscribe((names) => {
      this.applicationNames = names;
      console.log('APPS : ' + this.applicationNames);
      //this.createDoughnutCharts(); // Create doughnut charts after getting the application names
      this.applicationNames.forEach((appName) =>
        this.DoughnutChartStatus(appName)
      );
      this.applications.forEach((appsName) =>
        this.DoughnutChartCriticite(appsName)
      );
    });
  }

  //Doughnut Chart: Statistique status des tickets par Application
  DoughnutChartStatus(appName: string) {
    this.ticketService
      .getStatusByApplicationCounts(appName)
      .subscribe((response: any) => {
        const chartData = {
          labels: ['EN_COURS', 'OUVERT', 'RÉSOLU', 'ANNULÉ'],
          datasets: [
            {
              data: [
                response.EN_COURS || 0,
                response.OUVERT || 0,
                response.RÉSOLU || 0,
                response.ANNULÉ || 0,
              ],
              backgroundColor: [
                'rgba(255, 255, 0, 0.2)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        const chartOptions: ChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
        };

        const canvas = document.getElementById(appName) as HTMLCanvasElement;
        const context = canvas?.getContext('2d');

        if (context) {
          new Chart(context, {
            type: 'doughnut',
            data: chartData,
            options: chartOptions,
          });
        }
      });
  }

  //Doughnut Chart: Statistique criticité des tickets par Application
  DoughnutChartCriticite(appsName: string) {
    this.ticketService
      .getCriticiteByApplicationCounts(appsName)
      .subscribe((response: any) => {
        const chartData = {
          labels: ['URGENT', 'CRITIQUE', 'NORMAL', 'NON_URGENT'],
          datasets: [
            {
              data: [
                response.URGENT || 0,
                response.CRITIQUE || 0,
                response.NORMAL || 0,
                response.NON_URGENT || 0,
              ],
              backgroundColor: [
                'rgba(255, 0, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 255, 0, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        const chartOptions: ChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
        };

        const canvas = document.getElementById(appsName) as HTMLCanvasElement;
        const context = canvas?.getContext('2d');

        if (context) {
          new Chart(context, {
            type: 'doughnut',
            data: chartData,
            options: chartOptions,
          });
        }
      });
  }

  //Statistique status des tickets par Application
  statusApplication(StatusappName: string) {
    this.selectedType == '';
    this.StatusselectedAppName = StatusappName;
    console.log('SELECTED NAME :' + this.StatusselectedAppName);

    this.ticketService
      .getStatusByApplicationCounts(this.StatusselectedAppName)
      .subscribe((response: any) => {
        this.selectedType == '';
        const chartData = {
          labels: ['EN_COURS', 'OUVERT', 'RÉSOLU', 'ANNULÉ'],
          datasets: [
            {
              label: 'Status des tickets ' + this.StatusselectedAppName,
              data: [
                response.EN_COURS || 0,
                response.OUVERT || 0,
                response.RÉSOLU || 0,
                response.ANNULÉ || 0,
              ],
              backgroundColor: [
                'rgba(255, 255, 0, 0.2)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        const chartOptions = {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value: number) {
                    return Number.isInteger(value) ? value : '';
                  },
                },
              },
            ],
          },
        };
        const canvas = this.myChart1.nativeElement;
        const context = canvas.getContext('2d');

        // Destroy previous chart
        if (this.myChartInstance1) {
          this.myChartInstance1.destroy();
        }

        // Create new chart
        this.myChartInstance1 = new Chart(context, {
          type: 'bar',
          data: chartData,
          //options: chartOptions
        });
      });
  }

  //Statistique des criticité par Application
  criticiteApplication(CriticiteappName: string) {
    this.selectedType == '';
    this.CriticiteselectedAppName = CriticiteappName;
    console.log('SELECTED NAME :' + this.CriticiteselectedAppName);

    this.ticketService
      .getCriticiteByApplicationCounts(this.CriticiteselectedAppName)
      .subscribe((response: any) => {
        // Rest of the code to update the chart
        this.selectedType == '';
        const chartData = {
          labels: ['URGENT', 'CRITIQUE', 'NORMAL', 'NON_URGENT'],
          datasets: [
            {
              label: 'Criticité des tickets ' + this.CriticiteselectedAppName,
              data: [
                response.URGENT || 0,
                response.CRITIQUE || 0,
                response.NORMAL || 0,
                response.NON_URGENT || 0,
              ],
              backgroundColor: [
                'rgba(255, 0, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 255, 0, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        const chartOptions = {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value: number) {
                    return Number.isInteger(value) ? value : '';
                  },
                },
              },
            ],
          },
        };
        const canvas = this.myChart2.nativeElement;
        const context = canvas.getContext('2d');

        // Destroy previous chart
        if (this.myChartInstance2) {
          this.myChartInstance2.destroy();
        }

        // Create new chart
        this.myChartInstance2 = new Chart(context, {
          type: 'bar',
          data: chartData,
          //options: chartOptions
        });
      });
  }

  //Statistique général par status ou par criticité
  selectType(statistiquePar: string) {
    this.StatusselectedAppName = '';
    this.CriticiteselectedAppName = '';
    this.selectedType = statistiquePar;
    console.log('SELECTED TYPE OF STATISTICS:' + this.selectedType);
    if (this.selectedType == 'status') {
      this.StatusselectedAppName = '';
      this.ticketService
        .getStatusCounts(this.StatusselectedAppName)
        .subscribe((response: any) => {
          // Rest of the code to update the chart
          const chartData = {
            labels: ['EN_COURS', 'OUVERT', 'RÉSOLU', 'ANNULÉ'],
            datasets: [
              {
                label: 'Status des tickets ' + this.StatusselectedAppName,
                data: [
                  response.EN_COURS || 0,
                  response.OUVERT || 0,
                  response.RÉSOLU || 0,
                  response.ANNULÉ || 0,
                ],
                backgroundColor: [
                  'rgba(255, 255, 0, 0.2)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(0, 128, 0, 0.5)',
                  'rgba(255, 0, 0, 0.5)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

          const chartOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value: number) {
                      return Number.isInteger(value) ? value : '';
                    },
                  },
                },
              ],
            },
          };
          const canvas = this.myChart3.nativeElement;
          const context = canvas.getContext('2d');

          // Destroy previous chart
          if (this.myChartInstance3) {
            this.myChartInstance3.destroy();
          }

          // Create new chart
          this.myChartInstance3 = new Chart(context, {
            type: 'bar',
            data: chartData,
            //options: chartOptions
          });
        });
    } else if (this.selectedType == 'criticite') {
      this.CriticiteselectedAppName = '';
      this.ticketService
        .getCriticiteCounts(this.CriticiteselectedAppName)
        .subscribe((response: any) => {
          // Rest of the code to update the chart
          this.CriticiteselectedAppName = '';
          const chartData = {
            labels: ['URGENT', 'CRITIQUE', 'NORMAL', 'NON_URGENT'],
            datasets: [
              {
                label: 'Criticité des tickets ' + this.CriticiteselectedAppName,
                data: [
                  response.URGENT || 0,
                  response.CRITIQUE || 0,
                  response.NORMAL || 0,
                  response.NON_URGENT || 0,
                ],
                backgroundColor: [
                  'rgba(255, 0, 0, 0.5)',
                  'rgba(0, 128, 0, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(255, 255, 0, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

          const chartOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value: number) {
                      return Number.isInteger(value) ? value : '';
                    },
                  },
                },
              ],
            },
          };
          const canvas = this.myChart3.nativeElement;
          const context = canvas.getContext('2d');

          // Destroy previous chart
          if (this.myChartInstance3) {
            this.myChartInstance3.destroy();
          }

          // Create new chart
          this.myChartInstance3 = new Chart(context, {
            type: 'bar',
            data: chartData,
            //options: chartOptions
          });
        });
    }
  }
}
