import { Component } from '@angular/core';
import { TaskStore } from '../../store/task.store';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../interface/task';
import { Router } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-task-table',
    imports: [
        CommonModule,
        TaskFormComponent,
        FormsModule,
    ],
    templateUrl: './task-table.component.html',
    styleUrl: './task-table.component.css'
})
export class TaskTableComponent {

    modalOpen = false;
    selectedTask?: Task;
    filteredTasks: any[] = [];

    constructor(
        public tasks: TaskStore,
        public router: Router
    ) { }

    openModal() {
        this.selectedTask = undefined;
        this.modalOpen = true;
    }

    editTask(task: Task) {
        this.selectedTask = task;
        this.modalOpen = true;
    }

    deleteTask(id: number) {
        this.tasks.delete(id);
    }

    onSave(task: Task) {
        if (this.selectedTask) {
            this.tasks.update(task);
        } else {
            this.tasks.add(task);
        }
        this.modalOpen = false;
    }
}
