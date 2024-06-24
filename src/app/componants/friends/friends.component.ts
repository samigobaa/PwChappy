import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [RouterLink,ShortcutsComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  user:any={}
  ngOnInit(): void {
    this.isLoggedIn();
  }
  isLoggedIn(){
    let token = sessionStorage.getItem('token');
    if (token){
      this.user = jwtDecode(token);
      console.log('user conecte',this.user);
      
    }
    return !!token;
  }
}
