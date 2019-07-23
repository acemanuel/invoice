import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService} from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public email:string;
  public password:string;
  public confirmpassword:string;
  public error:string;

  constructor(
    private data: DataService,
    private nav: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }
  sub(a){
    this.email = a.value.email;
    this.password = a.value.password;
    this.confirmpassword = a.value.cpassword;
    let pload={
      email: a.value.email,
      password: a.value.password,
      confirmpassword :a.value.confirmpassword,
      mykey :'a1'
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      (success)=>{console.log(success)
      if(success['code']!='00'){
        this.error=success['message'];
      }else{
        this.cookieService.set("fetch", success['cookie']);

        let fetcher={
          email: a.value.email,
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
        );
        this.nav.navigate(['/dashboard/service']);
        location.reload();
      }
    },
      (error)=>{console.log(error)},
      ()=>{}
    )
  }

}
