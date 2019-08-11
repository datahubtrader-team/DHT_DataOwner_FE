import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  response: any;

  constructor(private auth: AuthenticationService, private router: Router, private http: HttpClient) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
      this.http.post('/data',{
        "username":this.credentials.name,
        "email":this.credentials.email,
        "password":this.credentials.password
      },{headers: {
        //'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials':'true',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, X-Auth-Token, Authorization',
        "Vary":"Accept-Encoding, Origin"
      }})
        .subscribe((response) => {
        this.response = response;
        console.log(this.response);
        // this.response.forEach(function(element) {
        //   console.log(element);
        // });
        console.log("Hello world " );
      });
    }, (err) => {
      console.error(err);
    });
  }
  
}
