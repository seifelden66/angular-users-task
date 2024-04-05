import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchUsersService } from '../services/fetch-users.service';
import { delay } from 'rxjs/operators';
import { LoadingComponent } from '../loading/loading.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [LoadingComponent, MatButtonModule],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss',
})
export class UsersDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  theId = 0;
  details: any;
  loading: boolean = false;
  constructor(private fetchUsersService: FetchUsersService, private router:Router) {
    this.loading = true;
    this.theId = Number(this.route.snapshot.params['id']);
    this.loading = true;

  }
  ngOnInit() {
    this.loading = true;

    this.fetchUsersService
      .getUserById(this.theId).pipe(delay(200))
      .subscribe((res) => {
        this.details = res.data
        this.loading = false;
      });

  }
  goBack() {
    this.router.navigate(['/']); 
  }
  
}
