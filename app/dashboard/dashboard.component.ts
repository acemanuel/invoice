import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: string;
  logo: string;

  constructor( private nav: Router, private data: DataService ) { }

  ngOnInit() {
    $("#menu-toggle").click(function (e){
      e.preventDefault();
      $("#maincontent").toggleClass("menuDisplayed");
    });

    let pload = {
      mykey: 'a8',
      sid: localStorage.getItem('fetch')
    }
    
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data=>{
        if(data['message'].service_name != ''){
          this.user = data['message'].service_name;

          if( data['message'].img_url == ''){
            this.logo = '../../assets/img/avatar.png';
          }else{
            this.logo = '../../' +  data['message'].img_url;
          }
          console.log(this.logo);
          console.log(this.user);
        }else{
          this.logo = '../../assets/img/avatar.png';
          let fetcher={
            sid: localStorage.getItem('fetch'),
            mykey: 'a9'
          }
          this.data.postMethod('http://localhost/project/projectapi.php', fetcher).subscribe(
            data=>{
              this.user =  data['message'].email;
              console.log(this.user);
            }
          )
        }
      }
    )
  }

  hideList(){
    return this.nav.url == '/dashboard/service' ? true : false;
  }
  logout(){
    localStorage.clear();
    
    this.nav.navigate(["/login"]);
  }
}
