import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list-component/task-list-component.component';
import { TaskFormComponent } from './components/task-form-component/task-form-component.component';

export const routes: Routes = [ // Exporting the routes constant
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-task', component: TaskFormComponent },
  { path: 'edit-task/:id', component: TaskFormComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}