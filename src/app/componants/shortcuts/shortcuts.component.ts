import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shortcuts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './shortcuts.component.html',
  styleUrl: './shortcuts.component.css'
})
export class ShortcutsComponent {
  constructor(private router:Router){}
  logOut(){
    sessionStorage.removeItem('token');
this.router.navigate(['login'])
  }

}
