import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../interface/task';


export const demoTasks: Task[] = [
    {
      id: 1,
      title: 'Design login screen',
      description: 'Create UI for login with email and Google options',
      status: 'pending',
      priority: 'high',
      dueDate: new Date('2025-05-15'),
      createdAt: new Date('2025-05-01'),
      updatedAt: new Date('2025-05-05')
    },
    {
      id: 2,
      title: 'Fix navbar collapse bug',
      description: 'Navbar does not collapse on mobile view, needs Bootstrap fix',
      status: 'completed',
      priority: 'medium',
      dueDate: new Date('2025-05-08'),
      createdAt: new Date('2025-05-02'),
      updatedAt: new Date('2025-05-06')
    },
    {
      id: 3,
      title: 'Write unit tests for TaskService',
      description: 'Cover add, update, delete methods using Jasmine',
      status: 'pending',
      priority: 'low',
      dueDate: new Date('2025-05-20'),
      createdAt: new Date('2025-05-03'),
      updatedAt: new Date('2025-05-03')
    }
];

@Injectable({ providedIn: 'root' })
export class TaskStore {
    private tasksSignal = signal<Task[]>(demoTasks);

    readonly tasks = computed(() => this.tasksSignal());

    add(item: Task) {
        this.tasksSignal.update(items => [...items, item]);
    }

    update(updated: Task) {
        this.tasksSignal.update(items =>
            items.map(item => (item.id === updated.id ? updated : item))
        );
    }

    delete(id: number) {
        this.tasksSignal.update(items =>
            items.filter(item => item.id !== id)
        );
    }

    clearAll() {
        this.tasksSignal.set([]);
    }
}
