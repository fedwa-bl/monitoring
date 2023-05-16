import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent {
  eds: any;
  username: any;
  selectedOption: string = '';
  months: any;

  @ViewChild('myChart') chartElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ChartDev') chartDevElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ChartSemester')
  chartSemesterElement!: ElementRef<HTMLCanvasElement>;

  constructor(
    private adminService: AdminService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.adminService.getEds().subscribe(
      (data) => {
        this.eds = data;
        this.generateChart1();
      },
      (err) => {
        console.log(err);
      }
    );

    this.adminService.getUsername().subscribe(
      (data) => {
        this.username = data;
        this.generateChart2();
      },
      (err) => {
        console.log(err);
      }
    );
    this.generateChart3();
  }
  generateChart1() {
    const labels = this.eds;

    const ticketCounts: number[] = [];
    let loadedCount = 0;
    this.eds.forEach((ed: string) => {
      this.adminService.getTicketsCount(ed).subscribe(
        (count) => {
          ticketCounts.push(count);
          loadedCount++;
          if (loadedCount === this.eds.length) {
            const myChart = new Chart('myChart', {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'nb de tickets par eds',
                    data: ticketCounts,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
  generateChart2() {
    const labels = this.username;

    const ticketCounts: number[] = [];
    let loadedCount = 0;
    this.username.forEach((usr: string) => {
      this.adminService.getTicketsCountByDev(usr).subscribe(
        (count) => {
          ticketCounts.push(count);
          loadedCount++;
          if (loadedCount === this.username.length) {
            const myChart = new Chart('ChartDev', {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'nb de tickets par développeur',
                    data: ticketCounts,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
  generateChart3() {
    this.months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(0);
      date.setUTCMonth(i);
      return date.toLocaleString('en-US', { month: 'long' });
    });

    const labels = this.months.slice(0, 12);
    const ticketCounts: number[] = [];
    let loadedCount = 0;
    this.months.forEach((month: string) => {
      const mois = this.months.indexOf(month);
      this.adminService.getTicketsCountBySemester(mois + 1).subscribe(
        (count) => {
          ticketCounts.push(count);
          loadedCount++;
          if (loadedCount === labels.length) {
            const myChart = new Chart('ChartSemester', {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'nb de tickets ',
                    data: ticketCounts,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  onOptionSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedOption = target.value;
    console.log(this.selectedOption);
  }
  download() {
    const chartCanvas = this.chartElement.nativeElement;
    html2canvas(chartCanvas).then((canvas) => {
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight
      );
      pdf.save('chart.pdf');
    });
  }
  downloadChart() {
    const chartCanvas = this.chartDevElement.nativeElement;
    html2canvas(chartCanvas).then((canvas) => {
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight
      );
      pdf.save('chart.pdf');
    });
  }
  downloadChart3() {
    const chartCanvas = this.chartSemesterElement.nativeElement;
    html2canvas(chartCanvas).then((canvas) => {
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight
      );
      pdf.save('chart.pdf');
    });
  }
}
