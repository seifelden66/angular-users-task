import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SizeDirective } from '../size.directive';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterModule, SizeDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  constructor(private router: Router) {}
  @Input() user: any;
  navigateToUserDetails(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
}
