import { Routes } from '@angular/router';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersComponent } from './users/users.component';
export const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user-details/:id', component: UsersDetailsComponent },
];
