import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  name: string;
  email: string;
  phone: string;
  error: string;
  readCookie: any;

  constructor(
    private data: DataService,
    private nav: Router,
    private cookieService: CookieService
  ) { 
    this.readCookie = this.cookieService.get("fetch");
  }

  ngOnInit() {
  }

  submit(a){
    if(a.value.name.trim() == ''){
      this.error = 'Enter client name';
    }else if(a.value.name.replace(/\s/g, "").length < 3){
      this.error = 'Client name must be at least three(3) characters';
    }
    else{
      let pload = {
        name: a.value.name,
        email: a.value.email,
        phone: a.value.phone,
        address: a.value.address,
        db: localStorage.getItem('fetch'),
        readCookie: this.readCookie,
        mykey: 'a10'
      }

      this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
        success => {
          if(success['code'] != '00'){
            this.error = success['message'];
          }else{
            this.nav.navigate(['/dashboard/clients']);
            alert('Client added successfully');
          }
        }
      )
    }
  }

}
