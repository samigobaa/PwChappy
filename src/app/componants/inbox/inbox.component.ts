import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';
import { jwtDecode } from 'jwt-decode';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [RouterLink,ShortcutsComponent,FooterComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {
  user:any={};
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
