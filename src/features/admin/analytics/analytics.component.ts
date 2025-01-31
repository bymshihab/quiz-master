import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { CommonModule } from '@angular/common';
import { ChartType } from 'chart.js';
// import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  analyticsData: any[] = [];
  chartType: ChartType = 'bar';
  chartData: any;
  chartLabels: string[] = [];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
      },
    },
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getResult();
  }

  getResult() {
    this.apiService.getAll('results').subscribe({
      next: (data) => {
        this.analyticsData = data;
        this.updateChart();
      },
      error: (error) => {
        console.error('Error fetching analytics:', error);
      },
    });
  }

  getAverageScore(): number {
    if (!this.analyticsData.length) return 0;
    const totalScore = this.analyticsData.reduce(
      (sum, quiz) => sum + quiz.score,
      0
    );
    return Math.round(totalScore / this.analyticsData.length);
  }

  getHighestScore(): number {
    if (!this.analyticsData.length) return 0;
    return Math.max(...this.analyticsData.map((quiz) => quiz.score));
  }

  updateChart() {
    this.chartLabels = this.analyticsData.map((quiz) => `Quiz ${quiz.quizId}`);
    this.chartData = {
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Quiz Score',
          data: this.analyticsData.map((quiz) => quiz.score),
          backgroundColor: ['#3b82f6', '#f43f5e', '#10b981', '#f59e0b'],
          borderRadius: 5,
        },
      ],
    };
  }
}
