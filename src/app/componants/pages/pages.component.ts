import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterLink,ShortcutsComponent,FooterComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
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
