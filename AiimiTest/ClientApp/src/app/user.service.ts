import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './entities/user';
import { SaveResult } from './entities/save-result';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
}

  searchUsers(name: string) {
    return this.http.get<User[]>(this.baseUrl + 'user/' + name)
  }

  suggestUsers(name: string) {
    return this.http.get<string[]>(this.baseUrl + 'user/getsuggestions/' + name)
  }

  create(user: User) {
    return this.http.post<SaveResult>(this.baseUrl + 'user/', user)
  }
}
