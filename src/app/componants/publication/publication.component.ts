import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  users:any = [];
  private loginSubscription: Subscription | undefined;
  constructor(private userService:UsersService){}
  
}
