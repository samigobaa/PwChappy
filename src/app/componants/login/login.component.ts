import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersService } from '../../services/users.service';

import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [SignupComponent,RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signuForm !:FormGroup;
  private loginSubscription: Subscription | undefined;
  user : any ={};
  email:any =''
  password : any ='';
  constructor( private formBuilder:FormBuilder,private userService:UsersService, private router:Router){}
  ngOnInit(){
    this.signuForm = this.formBuilder.group({
      firstLastname:['',Validators.required],
      userName:['',Validators.required],
      userEmail:['',[Validators.required,Validators.email]],
      userPassword:['',[Validators.required,Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
    })
  }
addUser(){
  
this.userService.addUsers(this.user).subscribe();


}
onLogin(): void {
  const user = { email: this.email, password: this.password };
  this.loginSubscription = this.userService.login(user).subscribe({
    next: (response) => {
      console.log('Login successful', response);
      // Enregistrez le token JWT et les informations utilisateur si nécessaire
      sessionStorage.setItem('token', response.message);
      let decode = jwtDecode(response.message)
      console.log('this decode',response.message);
      sessionStorage.setItem('user', JSON.stringify(response));
      // Rediriger vers une autre page ou effectuer une autre action
      // Exemple de redirection vers la page d'accueil
       this.router.navigate(['']);
    },
    error: (error) => {
      console.log('Login failed', error);
      // Gérer l'erreur de connexion ici
      // Exemple: afficher un message d'erreur à l'utilisateur
      // this.errorMessage = 'Échec de la connexion. Veuillez réessayer.';
    },
    complete: () => {
      // Facultatif: des actions à exécuter lorsque l'observable est terminé
    }
  });
}

ngOnDestroy(): void {
  if (this.loginSubscription) {
    this.loginSubscription.unsubscribe();
  }
}
}
