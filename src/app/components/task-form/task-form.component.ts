import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interface/task';

@Component({
    selector: 'app-task-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

    @Input() task?: Task;
    @Output() save = new EventEmitter<Task>();
    @Output() close = new EventEmitter<void>();

    form: any;

    constructor(
        public fb: FormBuilder,
    ) {
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: [''],
            status: ['', Validators.required],
            priority: ['', Validators.required],
            dueDate: ['', Validators.required]
          });
          
    }

    ngOnInit() {
        if (this.task) {
            const dueDateFormatted = this.formatDate(this.task.dueDate ?? new Date());
            this.form.patchValue({
                ...this.task,
                dueDate: dueDateFormatted
            });
        }              
    }

    private formatDate(date: Date): string {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        if (this.form.valid) {
            const formValue = this.form.value;

            const task: Task = {
                ...this.task,
                ...formValue,
                id: this.task?.id ?? Date.now(),
                dueDate: formValue.dueDate ? new Date(formValue.dueDate) : undefined,
                createdAt: this.task?.createdAt ?? new Date(),
                updatedAt: new Date()
            };
            this.save.emit(task);
        }
    }

}
