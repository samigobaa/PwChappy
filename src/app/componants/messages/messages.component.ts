import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
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
