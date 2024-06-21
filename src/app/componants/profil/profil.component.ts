import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  users : any =[]
  user:any={}
  private loginSubscription: Subscription | undefined;
  constructor(private userService:UsersService,private activateRouter:ActivatedRoute){}
  

  ngOnInit(): void {
    
    // Récupère l'ID de l'utilisateur depuis les paramètres d'URL
    const userId = this.activateRouter.snapshot.params['id'];
console.log(userId);

    // Appelle la méthode du service pour récupérer l'utilisateur par son ID
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.user = data; // Affecte les données de l'utilisateur récupéré à la variable 'user'
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    );
  }
  


ngOnDestroy(): void {
  if (this.loginSubscription) {
    this.loginSubscription.unsubscribe();
  }
}
}
