import { Routes } from '@angular/router';
import { LoginComponent } from './componants/login/login.component';
import { HomeComponent } from './componants/home/home.component';
import { SignupComponent } from './componants/signup/signup.component';
import { ProfilComponent } from './componants/profil/profil.component';
import { AdminPanelComponent } from './componants/admin-panel/admin-panel.component';
import { combineLatest } from 'rxjs';
import { InboxComponent } from './componants/inbox/inbox.component';
import { TimeLineComponent } from './componants/time-line/time-line.component';
import { MessagesComponent } from './componants/messages/messages.component';
import path from 'path';
import { PhotosComponent } from './componants/photos/photos.component';
import { VideosComponent } from './componants/videos/videos.component';
import { AboutComponent } from './componants/about/about.component';
import { GroupsComponent } from './componants/groups/groups.component';
import { FriendsComponent } from './componants/friends/friends.component';
import { PagesComponent } from './componants/pages/pages.component';
import { NotificationComponent } from './componants/notification/notification.component';
;

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {path:'signup',component:SignupComponent},
    {path:'profil',component:ProfilComponent},
    {path:'adminPanel',component:AdminPanelComponent},
    {path:'inbox',component:InboxComponent},
    {path:'time-line',component:TimeLineComponent},
    {path:'messages',component:MessagesComponent},
    {path:'photos',component:PhotosComponent},
    {path:'videos',component:VideosComponent},
    {path:'about',component:AboutComponent},
    {path:'groups',component:GroupsComponent},
    {path:'friends',component:FriendsComponent},
    {path:'pages',component:PagesComponent},
    {path:'notification',component:NotificationComponent}

  
    


];
