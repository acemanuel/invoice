import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string;
  public password:string;
  public error:string;

  constructor(
    private data: DataService,
    private nav:Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }
  login(x){
    this.email=x.value.email;
    this.password=x.value.password;

    let pload={
      email: x.value.email,
      password: x.value.password,
      mykey: 'a2'
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      (success)=>{console.log(success)
      if(success['code']!='00'){
        this.error=success['message'];
      }else if(success['message']==0){
        //document.cookie = "'"+success['user']+"'= '"+success['cookie']+"'";
        // document.cookie = success['cookie'];
        //this.readCookie = document.cookie;
        this.cookieService.set("fetch", success['cookie']);
        this.nav.navigate(['/dashboard/service']);
      }else{
        //document.cookie = "'"+success['user']+"'= '"+success['cookie']+"'";
        // document.cookie = success['cookie'];
        //this.readCookie = document.cookie;
        this.cookieService.set ("fetch", success['cookie']);
        this.nav.navigate(['/dashboard']);
      }
    },
      (error)=>{console.log(error)},
      ()=>{}
    )

    let fetcher={
      email: x.value.email,
      mykey: 'a5'
    }
    this.data.postMethod('http://localhost/project/projectapi.php', fetcher).subscribe(
      (bring)=>{console.log(bring)
      if(bring['code'] != '00'){
        console.log(bring['message']);
      }else{
        localStorage.setItem('fetch', bring['message'].service_id);
      }
      },
      (error)=>{console.log(error)},
      ()=>{}
    )
  }
}