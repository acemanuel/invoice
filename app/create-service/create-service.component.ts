import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  public url:string;
  public service_name:string;
  public address:string;
  public phone:string;  
  public vat: string;
  public error:string;
  public readCookie:any;

  constructor(
    private data: DataService,
    private nav: Router,
    private cookieService: CookieService
  ) { 
    this.readCookie = this.cookieService.get("fetch");
  }

  ngOnInit() {
  }

  submit(x){
    this.url=x.value.url;
    this.service_name=x.value.service_name;
    this.address=x.value.address;
    this.phone=x.value.phone;
    this.vat=x.value.vat;

    let pload={
      url:this.url,
      service_name:this.service_name,
      address:this.address,
      phone:this.phone,
      vat:this.vat,
      sid: localStorage.getItem('fetch'),
      readCookie: this.readCookie,
      mykey: "a3"
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      (success)=>{console.log(success)
      if(success['code'] != '00'){
        this.error=success['message'];
      }else{
        alert('service created successfully');
        this.nav.navigate(['/dashboard']);
        location.reload();
      }
    },
    (error)=>{console.log(error)},
    ()=>{}
    )
  }

}
