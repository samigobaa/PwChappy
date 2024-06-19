import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
URL = 'http://localhost:3000/api/users'
user:any
  constructor(private httpClient:HttpClient) { }

  addUsers(user:any){
  return this.httpClient.post<{message:any}>(user,this.URL)
  }
  login(user: any) {
    return this.httpClient.post<{message : string }>(this.URL + '/login', user);
  }
  getAllUser(){
    this.httpClient.get<{message:any}>(this.URL)
  }
  
}
