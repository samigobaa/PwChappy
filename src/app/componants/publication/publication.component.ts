import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { PostsService } from '../../services/posts.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Post } from '../../../../backend/models/post.model';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  users:any = [];
  userId:any;
  posts: any[] = [];
  publishForm!:FormGroup
  user :any ={}
  private loginSubscription: Subscription | undefined;
  constructor(private userService:UsersService, private postsService:PostsService,private formBuilder:FormBuilder,private router:Router){}
  ngOnInit() {
    this.publishForm = this.formBuilder.group({
      content: ['']
    });
    this.isLoggedIn();
   
    this.loadPosts();
  }
  isLoggedIn(){
    let token = sessionStorage.getItem('token');
    if (token){
      this.user = jwtDecode(token);
      console.log('user conecte',this.user);
      
    }
    return !!token;
  }
  onPublish(): void {
    
      const content = this.publishForm.value.content;
      
      this.postsService.createPost(content).subscribe({
        next: (response) => {
          console.log('Post created successfully', response);  
          this.publishForm.reset();
          this.router.navigate(['/'])
        },
        
      });
      
    
    
  }
  loadPosts(): void {
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log('all',this.posts);
        
       
      },
      
    });
  }

}
