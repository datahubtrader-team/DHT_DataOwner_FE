import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;

  page: string = "";
  response: any;
  constructor(private auth: AuthenticationService, private http: HttpClient) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log(user);
      //console.log(user.salt);
    }, (err) => {
      console.error(err);
    });
  }

  search(){
    // this.http.get('https://reqres.in/api/users?page=3')
    // .subscribe((response) => {
    //   this.response = response;
    //   console.log(this.response);
    // });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    this.http.post('/hat',{
      "username":"jhamm",
      "password":"Dillonjerome28",
      "message":"login"
    },{headers: {
      //'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, X-Auth-Token, Authorization',
      "Vary":"Accept-Encoding, Origin"
    }}
      )
      .subscribe((response) => {
      this.response = response;
      console.log(this.response);
    });
    
  }
}
