import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any;
  readCookie: string;

  constructor (
    private data: DataService,
    private nav: Router,
    private cookieService: CookieService
  ) { 
    this.readCookie = this.cookieService.get('fetch');
  }

  ngOnInit() {
    let pload = {
      'mykey': 'a11',
      db: localStorage.getItem('fetch')
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data=>{
        this.clients = data['message'];
      }
    );
  }

  delete(client){
    let pload = {
      mykey: 'a13',
      db: localStorage.getItem('fetch'),
      email: client.email,
      readCookie: this.readCookie
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data => {
        if(data['code'] == '00'){
          alert('client deleted successfully');
          location.reload();
        }
      }
    )
  }

  edit(client){
    let pload = {
      db: localStorage.getItem('fetch'),
      email: client.email,
      readCookie: this.readCookie,
      mykey: 'a19'
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data => {
        localStorage.setItem('view', JSON.stringify(data['message']));
        this.nav.navigate(['/dashboard/edit_client']);
      }
    )
  }

  hidePhone(i){
    if(this.clients[i].phone == ''){
      return true;
    }else{
      return false;
    }
  }

}
