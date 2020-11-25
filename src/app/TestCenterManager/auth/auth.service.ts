import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {AuthLoginData} from './auth-login.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable ({providedIn: 'root' })

export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string, name: string, position: string){
    const authData: AuthData = {username: username, password: password, name: name, position: position};
    this.http.post ('http://localhost:3000/api/user/signup', authData)
    .subscribe(response =>{
      console.log(response);
    });
  }

  login(username: string, password: string){
    const authLoginData : AuthLoginData = {username: username, password:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/user/login', authLoginData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.authStatusListener.next(true);
      //this.router.navigate(['/']);
    });
  }

  logout(){
    this.token = null;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
