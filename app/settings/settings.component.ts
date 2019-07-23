import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  file: File;
  imgfile: any;

  email: string;
  url: string;
  name: string;
  address: string;
  phone: string;
  vat: number;
  error: string;
  readCookie: any;

  constructor (
    private data: DataService,
    private nav: Router,
    private cookieService: CookieService
  ) { 
    this.readCookie = this.cookieService.get('fetch');
  }

  ngOnInit() {
    let pload = {
      sid: localStorage.getItem('fetch'),
      mykey: 'a16'
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data => {
        this.email = data['user'].email;
        this.url = data['message'].service_url;
        this.name = data['message'].service_name;
        this.address = data['message'].address;
        this.phone = data['message'].phone;
        this.vat = data['message'].vat;
      }
    );
  }

  // readCookie(key: string){
  //   return this.cookie.get(key);
  // }

  upload (event) {
    console.log(event);
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x: any) => {
      this.imgfile = x.target.result;
      console.log(this.file);
    }
    reader.readAsDataURL(this.file);
  }

  finalUpload () {
    const fd = new FormData();
    fd.append("file", this.file, this.file.name);
    this.data.imgUploader(fd).subscribe(
      res => {
        console.log(res);
        alert('your business logo has been uploaded successfully');
      }
    )
  }

  changePassword(a){
    let pload = {
      sid: localStorage.getItem('fetch'),
      cpassword: a.value.cpassword,
      npassword: a.value.npassword,
      cfpassword: a.value.cfpassword,
      readCookie: this.readCookie,
      mykey: 'a18'
    }

    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data => {
        if(data['code'] != '00'){
          this.error = data['message'];
        }else{
          this.error = '';
          alert('Password changed successfully');
          location.reload();
        }
      }
    )
  }

  onSubmit(x){
    let pload = {
      email: x.value.email,
      service_url: x.value.service_url,
      service_name: x.value.service_name,
      address: x.value.address,
      phone: x.value.phone,
      vat: x.value.vat,
      mykey: 'a17',
      sid: localStorage.getItem('fetch'),
      readCookie: this.readCookie
    }

    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data => {
        if(data['code'] != '00'){
          this.error = data['message'];
        }else{
          alert('settings updated successfully');
          location.reload();
        }
      }
    )
  }
}
