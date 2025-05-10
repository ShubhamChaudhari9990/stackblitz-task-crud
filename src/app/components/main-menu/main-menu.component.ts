import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStore } from '../../store/task.store';

@Component({
    selector: 'app-main-menu',
    imports: [],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
    totalCount = 0;
    completedCount = 0;
    pendingCount = 0;

    constructor(
        public router: Router,
        public tasks: TaskStore
    ) {
        this.totalCount = this.tasks.tasks().length;
        this.completedCount = this.tasks.tasks().filter(t => t.status === 'completed').length;
        this.pendingCount = this.tasks.tasks().filter(t => t.status === 'pending').length;
    }
}
