import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoice: any;
  viewer: any;
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
      'mykey': 'a6',
      db: localStorage.getItem('fetch')
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data=>{
        this.invoice = data['message'];
      }
    );
  }

  view(inv, i){
    let pload = {
      mykey: 'a7',
      db: localStorage.getItem('fetch'),
      invoice_no: inv.invoice_no
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      success=>{
        this.viewer = success['message'];
        localStorage.setItem('view', JSON.stringify(this.viewer));
        this.nav.navigate(['/dashboard/preview']);
      }
    )
  }

  delete(del, i){
    let pload = {
      mykey: 'a14',
      db: localStorage.getItem('fetch'),
      invoice_no: del.invoice_no,
      readCookie: this.readCookie
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data => {
        if(data['code'] == '00'){
          alert('invoice deleted');
          location.reload();
        }
      }
    )
  }

}
