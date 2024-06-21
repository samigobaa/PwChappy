import { Routes } from '@angular/router';
import { LoginComponent } from './componants/login/login.component';
import { HomeComponent } from './componants/home/home.component';
import { SignupComponent } from './componants/signup/signup.component';
import { ProfilComponent } from './componants/profil/profil.component';
import { AdminPanelComponent } from './componants/admin-panel/admin-panel.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {path:'signup',component:SignupComponent},
    {path:'profil',component:ProfilComponent},
    {path:'adminPanel',component:AdminPanelComponent}
    


];
