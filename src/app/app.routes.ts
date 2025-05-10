import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'mainmenu', pathMatch: 'full' },
    {
        path: 'mainmenu',
        loadComponent: () => import('./components/main-menu/main-menu.component').then(m => m.MainMenuComponent)
    },
    {
        path: 'tasks',
        loadComponent: () => import('./components/task-table/task-table.component').then(m => m.TaskTableComponent)
    },
    {
        path: 'charts',
        loadComponent: () => import('./components/task-charts/task-charts.component').then(m => m.TaskChartsComponent)
    },
    { path: '**', redirectTo: 'tasks' }
];
