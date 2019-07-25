import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  details: UserDetails;

  page: string = "";
  response: any;
  dd: any;
  plug: string = "";
  email: string = "";
  constructor(private auth: AuthenticationService, private http: HttpClient) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
      //console.log(user);
      this.dd = user;
      //console.log(user.salt);
    }, (err) => {
      console.error(err);
    });
    //this.getOffers("10");
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
      console.log("Julian Hamm ",this.dd);
    });
    
  }

  awsurl(){
      this.http.get('/urls')
      .subscribe((response) => {
      this.response = response;
      console.log(this.response);
    });
  }

  getOffers(email){
    this.http.get('/gettrades'+'?email='+email)
      .subscribe((response) => {
      this.response = response;
      //console.log(this.response);
      this.response.forEach(function(element) {
        console.log(element);
      });
      console.log("Hello world " );
    });
  }

  acceptOffer(plug, email){
    this.http.post('/offerAccepted',{
      "plug":plug,
      "email":email,
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
  }

  getTrades(email){
    this.http.get('/gettrades'+'?email='+email)
      .subscribe((response) => {
      this.response = response;
      //console.log(this.response);
      this.response.forEach(function(element) {
        console.log(element);
      });
      console.log("Hello world " );
    });
  }

  acceptTrade(plug, email){
    this.http.post('/tradeAccepted',{
      "plug":plug,
      "email":email,
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
  }

}
