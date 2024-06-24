import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TimeLineComponent } from '../time-line/time-line.component';
import { PhotosComponent } from '../photos/photos.component';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';
import { jwtDecode } from 'jwt-decode';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../../backend/models/post.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [TimeLineComponent,RouterLink,PhotosComponent,ShortcutsComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  users : any =[]
  userId:any
  user:any={}
  posts:any;
  private loginSubscription: Subscription | undefined;
  constructor(private userService:UsersService,private activateRouter:ActivatedRoute,private postsService:PostsService){}
  

  ngOnInit(): void {
    const userIdParam = this.activateRouter.snapshot.paramMap.get('id');
    console.log('userIdParam:', userIdParam);
    if (userIdParam !== null && userIdParam !== undefined) {
      this.userId = +userIdParam;
      this.getUserPosts();
    } else {
      console.error('ID utilisateur non défini.');
    }
    this.isLoggedIn();
    this.getUserPosts();
  }
  isLoggedIn(){
    let token = sessionStorage.getItem('token');
    if (token){
      this.user = jwtDecode(token);
      console.log('user conecte',this.user);
      
    }
    return !!token;
  }
  getUserPosts(): void {
    if (this.userId === null || this.userId === undefined) {
      console.error('ID utilisateur non défini.');
      return;
    }
  
    this.postsService.getPostsByUser(this.userId).subscribe(
      (data: Post[]) => {
        this.posts = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des publications de l\'utilisateur:', error);
      }
    );
  }

ngOnDestroy(): void {
  if (this.loginSubscription) {
    this.loginSubscription.unsubscribe();
  }
}
}
