import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './componants/login/login.component';
import { HomeComponent } from './componants/home/home.component';
import { HeaderComponent } from './componants/header/header.component';
import { FooterComponent } from './componants/footer/footer.component';
import { TopBarComponent } from './componants/top-bar/top-bar.component';
import { LeftSidebarComponent } from './componants/left-sidebar/left-sidebar.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TopBarComponent,
    RouterLink,
    HttpClientModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pwchappy';
}
