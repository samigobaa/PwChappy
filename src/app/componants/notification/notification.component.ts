import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { jwtDecode } from 'jwt-decode';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterLink,FooterComponent,ShortcutsComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
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
