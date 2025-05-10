import { Component, computed } from '@angular/core';
import { TaskStore } from '../../store/task.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';


@Component({
    selector: 'app-task-charts',
    imports: [CommonModule,BaseChartDirective],
    providers: [provideCharts(withDefaultRegisterables())],
    templateUrl: './task-charts.component.html',
    styleUrl: './task-charts.component.css'
})
export class TaskChartsComponent {

    barChartOptions: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
    };
    barChartData: ChartConfiguration<'bar'>['data'] = {
        labels: ['tasks'],
        datasets: [
            { data: [0], label: 'Completed', backgroundColor: '#198754' },
            { data: [0], label: 'Pending', backgroundColor: '#ffc107' }
        ]
    };

    constructor(
        public tasks: TaskStore,
        public router: Router
    ) { }

    ngOnInit(): void {
        let completedCount = this.tasks.tasks().filter(t => t.status === 'completed').length;
        let pendingCount = this.tasks.tasks().filter(t => t.status === 'pending').length;
        this.barChartData.datasets[0].data = [completedCount];
        this.barChartData.datasets[1].data = [pendingCount];
    }
}
