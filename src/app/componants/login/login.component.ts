import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signuForm!: FormGroup;
  loginForm!:FormGroup
  private loginSubscription: Subscription | undefined;
  user: any = {};
  email: any = '';
  password: any = '';
  selectedFile: File | null = null;  // Pour stocker le fichier sélectionné

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.signuForm = this.formBuilder.group({
      firstandlastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      sex: ['Male'], // Par défaut à "Male", peut être changé selon votre logique
      email: ['', [Validators.required, Validators.email]],
      role:['Employer']
    });
  }

  

  addUser(): void {
    if (this.signuForm.valid) {
      const user = this.signuForm.value;
      this.userService.addUser(user).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          Swal.fire({
            title: "Welcome!",
            text: "PwC the Best",
            imageUrl: "https://media.licdn.com/dms/image/D4D10AQGBM8hNL4z5Cw/image-shrink_800/0/1714042985736?e=2147483647&v=beta&t=sIqsDJ8uLTtdVAyHwId_LgK2-ewFHC7pgLa09IhA_0Y",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.log('Failed to add user', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      });
    } else {
      console.error('Invalid form data');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.userService.login(user).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log('Login failed', error);
          Swal.fire({
            icon: "error",
            title: "Login failed",
            text: "Invalid email or password.",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      });
    } else {
      console.error('Invalid login form data');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid email and password.",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }
}
