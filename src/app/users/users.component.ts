import { Component } from '@angular/core';
import { FetchUsersService } from '../services/fetch-users.service';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { selectCount } from '../states/counter/counter.selector';
import { decrement, increment } from '../states/counter/counter.actions';
import { FormsModule } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { LoadingComponent } from '../loading/loading.component';
import { UserCardComponent } from '../user-card/user-card.component';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserCardComponent,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    LoadingComponent,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: any[] = [];
  searchId: number | undefined = undefined;
  count: number = 1;
  loading: boolean = false;

  constructor(
    private fetchUsersService: FetchUsersService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectCount).subscribe((value) => {
      this.count = value;
      this.fetchUsers(this.count);
    });
  }

  fetchUsers(page: number) {
    this.loading = true;
    this.fetchUsersService
      .getUsers(page)
      .pipe(delay(200))
      .subscribe((response: any) => {
        this.users = response.data;
        this.loading = false;
      });
  }
  navigateToUserDetails(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  loadUsers(page: number, searchId?: number): void {
    this.loading = true;
    if (searchId !== undefined) {
      this.fetchUsersService
        .getUserById(searchId)
        .pipe(delay(200))
        .subscribe((response: any) => {
          this.users = [response.data];
          this.loading = false;
        });
    } else {
      this.fetchUsersService
        .getUsers(page)
        .pipe(delay(200))
        .subscribe((response: any) => {
          this.users = response.data;
          this.loading = false;
        });
    }
  }
}
