import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { FollowingComponent } from '../following/following.component';
import { RecentActivitesComponent } from '../recent-activites/recent-activites.component';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';
import { PublicationComponent } from '../publication/publication.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidePanelComponent } from '../side-panel/side-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    TopBarComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    FollowingComponent,
    RecentActivitesComponent,
    ShortcutsComponent,
    PublicationComponent,
    SidebarComponent,
    SidePanelComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
