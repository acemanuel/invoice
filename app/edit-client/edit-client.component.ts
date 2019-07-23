import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client: string;

  show: any;
  targetEmail: string;
  email: string;
  name: string;
  phone: string;
  address: string;

  error: string;

  readCookie: string;

  constructor (
    private data: DataService,
    private nav: Router,
    private cookieService: CookieService
  ) { 
    this.readCookie = this.cookieService.get('fetch');
  }

  ngOnInit() {
    this.show = JSON.parse(localStorage.getItem('view'));
    this.targetEmail = this.show.email;
    // this.name = this.show.name;
    // this.phone = this.show.phone;
    // this.address = this.show.address;

    this.client = this.show.name;

    let pload = {
      readCookie: this.readCookie,
      db: localStorage.getItem('fetch'),
      email: this.targetEmail,
      mykey: 'a19'
    }

    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data => {
        if(data['code'] != '00'){
          this.error = data['message'];
        }else{
          this.email = data['message'].email;
          this.name = data['message'].name;
          this.phone = data['message'].phone;
          this.address = data['message'].address;
        }
      }
    )
  }

  submit(a){
    if(a.value.name.trim() == ''){
      this.error = 'Enter client name';
    }else if(a.value.name.replace(/\s/g, "").length < 3){
      this.error = 'Client name must be at least three(3) characters';
    }
    else{
      let pload={
        target_email: this.targetEmail,
        name: a.value.name,
        email: a.value.email,
        phone: a.value.phone,
        address: a.value.address,
        db: localStorage.getItem('fetch'),
        readCookie: this.readCookie,
        mykey: 'a20'
      }

      this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
        success => {
          if(success['code'] != '00'){
            console.log(success['message']);
            this.error = success['message'];
          }else{
            alert(success['message']);
            this.nav.navigate(['dashboard/clients']);
          }
        }
      )
    }
  }

}
