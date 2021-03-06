import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {
  details: UserDetails;

  page: string = "";
  response: any;
  mydataresponse: any;
  dd: any;
  plug: string = "";
  email: string = "";
  todayDate: string = "";

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
    this.http.get('/getoffers'+'?email='+email)
      .subscribe((response) => {
      this.response = response;
      //console.log(this.response);
      this.response.forEach(function(element) {
        console.log(element);
      });
      console.log("Hello world " );
      var newDate = new Date();
      newDate.setDate(newDate.getDate());
      var today = newDate.toISOString().slice(0, 10);
      console.log(today);

      //TODO: Compare today's date with deadline on offer
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
    });
  }

  getMyHatData(email){
    this.http.get('/hatdataplugs'+'?email='+email)
      .subscribe((mydataresponse) => {
      this.mydataresponse = mydataresponse;
      console.log(this.mydataresponse);
      // this.response.forEach(function(element) {
      //   console.log(element);
      // });
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
