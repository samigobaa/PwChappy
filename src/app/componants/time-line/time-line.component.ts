import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})
export class TimeLineComponent {
  user:any ={}
  ngOnInit() {
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
