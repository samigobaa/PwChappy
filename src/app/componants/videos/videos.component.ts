import { Component } from '@angular/core';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [ShortcutsComponent,RouterLink],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
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
