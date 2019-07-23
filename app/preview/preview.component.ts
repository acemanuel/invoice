import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

import * as jsPDF from 'jspdf';
import * as $ from 'jquery';
import * as html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  public show: any;
  itemdesc : any;
  qty: any;
  price: any;
  amnt: any;

  client: string;
  clientemail: string;
  clientphone: string;

  user: string;
  imgurl: string;
  email: string;
  phone: string;

  constructor(
    private nav: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.show = JSON.parse(localStorage.getItem('view'));
    this.show.forEach(el => {
      this.itemdesc = JSON.parse(el.item_description);
      this.qty = JSON.parse(el.quantity);
      this.price = JSON.parse(el.price);
      this.amnt = JSON.parse(el.amount);

      this.client = el.client;
    });

    let pload = {
      mykey: 'a8',
      sid: localStorage.getItem('fetch')
    }

    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data => {
        this.user = data['message'].service_name;
        if(data['message'].img_url != ""){
          this.imgurl = '../../' +  data['message'].img_url;
        }
        this.phone = data['message'].phone;
      }
    );

    let body = {
      mykey: 'a9',
      sid: localStorage.getItem('fetch')
    }

    this.data.postMethod('http://localhost/project/projectapi.php', body).subscribe(
      data => {
        this.email = data['message'].email;
      }
    );

    let load = {
      db: localStorage.getItem('fetch'),
      name: this.client,
      mykey: 'a21'
    }

    this.data.postMethod('http://localhost/project/projectapi.php', load).subscribe(
      data => {
        this.clientemail = data['message'].email;
        this.clientphone = data['message'].phone || "";
      }
    );
  }


  backButton(){
    this.nav.navigate(['/dashboard/invoice']);
  }

  

  // genPDF(){
  //   let data = document.getElementById('a4');
  //   html2canvas(data).then(canvas => {  
  //     var imgWidth = 208;   
  //    // var pageHeight = 295;    
  //     var imgHeight = canvas.height * imgWidth / canvas.width;  
  //     var heightLeft = imgHeight;  
  
  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
  //     let pageHeight = pdf.internal.pageSize.height;
  //     let y = 500; 
  //     if(y <= pageHeight){
  //       pdf.addPage();
  //       y = 0;
  //     }
  //     //var position = 0;  
  //     pdf.addImage(contentDataURL, 'PNG', 0, y, imgWidth, imgHeight)  
  //     // pdf.save(this.show[0].invoice_no+'.pdf'); // Generated PDF   
  //     console.log(imgHeight);
  //     console.log(pageHeight);
  //   });  
  // }

  genPDF(){
    var element = document.getElementById('a4');
    html2pdf().from(element).save(this.show[0].invoice_no+'.pdf');
  }
}