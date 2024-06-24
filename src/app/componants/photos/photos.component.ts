import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {
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
