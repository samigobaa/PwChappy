import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { validateHeaderName } from 'http';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [SignupComponent,RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signuForm !:FormGroup;
  constructor( private formBuilder:FormBuilder){}
  ngOnInit(){
    this.signuForm = this.formBuilder.group({
      firstLastname:['',Validators.required],
      userName:['',Validators.required],
      userEmail:['',[Validators.required,Validators.email]]
    })
  }

}
