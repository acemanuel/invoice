import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data.service';

import * as jsPDF from 'jspdf';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  invoice_no: string;
  invoice_description: string;
  description: any;
  quantity: any;
  price: any;
  amount: any;
  subTotal: any;
  vat: number;
  vatTotal: any;
  total: any;

  modals: any;
  invModal: any;

  name: string;
  email: string;
  phone: string;
  address: string;

  cname: string;
  cemail: string;
  cphone: string;
  caddress: string;

  error: string;
  clientError: string;
  returnError: string;

  item: any = {description:'', quantity:'', price:'', amount:''};
  getters = [];
  getDescription = [];
  getQuantity = [];
  getPrice = [];
  getAmount = [];
  vatVals = [];

  length: any;
  clients: any;
  client: string;
  selected: string;
  clientInfo: any;
  readCookie: any;

  placeholder: string;
  placeholderPhone: string;
  placeholderAddress: string;

  user: string;
  imgurl: string;
  userphone: string;
  useremail: string;

  viewer: any;
  
  columns = [
    "DESCRIPTION",
    "QTY.",
    "UNIT PRICE",
    "AMOUNT",
    "ACTION",
  ]

  constructor(
    private nav: Router,
    private data: DataService,
    private cookieService: CookieService
  ) { 
    this.readCookie = this.cookieService.get("fetch");
  }

  ngOnInit() {
    this.placeholderPhone = 'Phone number (optional)';
    this.placeholderAddress = 'Address (optional)';

    let pload = {
      mykey: 'a15',
      db: localStorage.getItem('fetch')
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      data=>{
        this.length = 'INV' + '-' + (data['message'].length + 1);
      }
    );

    let body = {
      mykey: 'a12',
      db: localStorage.getItem('fetch')
    }
    this.data.postMethod('http://localhost/project/projectapi.php', body).subscribe(
      body => {
        this.clients = body['message'];
      }
    );

    let vat = {
      mykey: 'a8',
      sid: localStorage.getItem('fetch')
    }
    this.data.postMethod('http://localhost/project/projectapi.php', vat).subscribe(
      data => {
        this.vat = data['message'].vat;
      }
    );


    let ploader = {
      mykey: 'a8',
      sid: localStorage.getItem('fetch')
    }

    this.data.postMethod('http://localhost/project/projectapi.php', ploader).subscribe(
      data => {
        this.user = data['message'].service_name;
        if(data['message'].img_url != ""){
          this.imgurl = '../../' +  data['message'].img_url;
        }
        this.userphone = data['message'].phone;
      }
    );

    let bodies = {
      mykey: 'a9',
      sid: localStorage.getItem('fetch')
    }

    this.data.postMethod('http://localhost/project/projectapi.php', bodies).subscribe(
      data => {
        this.useremail = data['message'].email;
      }
    );

  }

  addItem(){
    if(this.item.description.trim() == ''){
      this.error = 'Enter description of item';
    }else if(this.item.quantity == 0){
      this.error = 'Quantity of Item can not be equal to zero(0)';
    }else if(this.item.price == 0){
      this.error = 'Unit price of Item can not be equal to zero(0)';
    }else{
      this.error = '';
      this.getters.push({...this.item});
      this.getDescription.push(this.item.description);
      this.getQuantity.push(this.item.quantity);
      this.getPrice.push(this.item.price);
      let amt = this.item.quantity * this.item.price;
      this.getAmount.push(amt);
      this.vatVals.push(this.vat / 100 * amt);

      this.subTotal = this.getAmount.reduce(function(a, b){
        return a + b;
      });
      this.vatTotal = this.vatVals.reduce(function(a, b){
        return a + b;
      });

      this.total = (this.subTotal + this.vatTotal).toFixed(2);
      
      this.item.description = "";
      this.item.quantity = "";
      this.item.price = "";
      this.item.amount = "";
    }
  }
  
  removeItem(i){
    this.getters.splice(i, 1);  
    this.getDescription.splice(i, 1);
    this.getQuantity.splice(i, 1);
    this.getPrice.splice(i, 1);
    this.getAmount.splice(i, 1);
    this.vatVals.splice(i, 1);

    if(this.getAmount.length != 0){
      this.subTotal = this.getAmount.reduce(function(a, b){
        return a + b;
      });
      this.vatTotal = this.vatVals.reduce(function(a, b){
        return a + b;
      });
      this.total = (this.subTotal + this.vatTotal).toFixed(2);
    }else{
      this.subTotal = 0;
      this.vatTotal = 0;
      this.total = 0;
    }
  }

  hideSave(){
    if(this.getters.length != 0){
      return true;
    }else{
      return false;
    }
  }

  // addClient(c) {
  //   if(c.value.name.trim() == ''){
  //     this.clientError = 'Enter client name';
  //   }else if(c.value.name.replace(/\s/g, '').length < 3){
  //     this.clientError = 'Client name must be at least three(3) characters';
  //   }else{
  //     let client = {
  //       name: c.value.name,
  //       email: c.value.email,
  //       phone: c.value.phone,
  //       address: c.value.address,
  //       readCookie: this.readCookie,
  //       db: localStorage.getItem('fetch'),
  //       mykey: 'a10'
  //     }

  //     this.data.postMethod('http://localhost/project/projectapi.php', client).subscribe(
  //       data => {
  //         if(data['code'] != '00') {
  //           this.clientError = data['message'];
  //         }else{
  //           alert('Client added successfully');

  //           let body = {
  //             mykey: 'a12',
  //             db: localStorage.getItem('fetch')
  //           }

  //           this.data.postMethod('http://localhost/project/projectapi.php', body).subscribe(
  //             body => {
  //               this.clients = body.message;
  //               this.selected = body.message[this.clients.length - 1].name;
  //             }
  //           );
  //         }
  //       }
  //     );
  //   }
  // }

  returnClient(d){
    let pload = {
      email: d.value.email,
      db: localStorage.getItem('fetch'),
      readCookie: this.readCookie,
      mykey: 'a19'
    }
    this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
      body => {
        if(body['code'] != '00'){
          this.returnError = body['message'];
        }else{
          this.clientInfo = body['message'];
          this.cemail = this.clientInfo.email;
          this.cname = this.clientInfo.name;
          this.cphone = this.clientInfo.phone;
          this.caddress = this.clientInfo.address;
          this.email = '';
          this.returnError = '';
          this.modals.style.display = 'none';
          
          if(this.cphone == ''){
            this.placeholderPhone = 'phone not specified';
            let getphone = document.getElementById('cphone');
            getphone.classList.add('unspecified');
          }
          if(this.caddress == ''){
            this.placeholderAddress = 'address not specified';
            let getaddress = document.getElementById('caddress');
            getaddress.classList.add('unspecified');
          }
        }
      }
    );
  }

  clearClientinfo(){
    this.clientInfo = undefined;
    this.cemail = '';
    this.cname = '';
    this.cphone = '';
    this.caddress = '';
    this.placeholderPhone = 'Phone number (optional)';
    this.placeholderAddress = 'Address (optional)';

    let getphone = document.getElementById('cphone');
    getphone.classList.remove('unspecified');

    let getaddress = document.getElementById('caddress');
    getaddress.classList.remove('unspecified');
  }

  onSubmit(i){
    this.invoice_no = i.value.invoice_no;
    this.invoice_description = i.value.invoice_description;
    this.client = i.value.client;
    this.description = JSON.stringify(this.getDescription);
    this.quantity = JSON.stringify(this.getQuantity);
    this.price = JSON.stringify(this.getPrice);
    this.amount = JSON.stringify(this.getAmount);

    if(i.value.name.trim() == ''){
      this.clientError = 'Enter client name';
    }else if(i.value.name.replace(/\s/g, '').length < 3){
      this.clientError = 'Client name must be at least three(3) characters';
    }else if(this.invoice_description.trim() == ''){
      this.error = 'Enter a summary of invoice';
    }else{
      if(this.clientInfo == undefined){
        let client = {
          name: i.value.name,
          email: i.value.email,
          phone: i.value.phone || "",
          address: i.value.address || "",
          db: localStorage.getItem('fetch'),
          readCookie: this.readCookie,
          mykey: 'a10'
        }
        this.data.postMethod('http://localhost/project/projectapi.php', client).subscribe(
          data => {
            if(data['code'] != '00') {
              this.error = data['message'];
            }else{
              let pload = {
                invoice_no: i.value.invoice_no,
                invoice_description: i.value.invoice_description,
                description: this.description,
                quantity: this.quantity,
                price: this.price,
                amount: this.amount,
                sub_total: this.subTotal,
                vat: this.vat,
                vat_total: this.vatTotal,
                db: localStorage.getItem('fetch'),
                mykey: 'a4',
                total: this.total,
                client: i.value.name,
                readCookie: this.readCookie
              }
              this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
                success => {
                  if(success['code'] != '00'){
                    console.log(success['message']);
                    this.error = success['message'];
                  }else{
                    alert('invoice sent successfully');

                    let iload = {
                      mykey: 'a7',
                      db: localStorage.getItem('fetch'),
                      invoice_no: this.length
                    }
                    this.data.postMethod('http://localhost/project/projectapi.php', iload).subscribe(
                      data => {
                        this.viewer = data['message'];
                        localStorage.setItem('view', JSON.stringify(this.viewer));
                        this.nav.navigate(['/dashboard/preview']);
                      }
                    )
                  }
                },
                ()=>{}
              )
            }
          }
        );
      }else{
        let pload = {
          client: i.value.name,
          invoice_no: i.value.invoice_no,
          invoice_description: i.value.invoice_description,
          description: this.description,
          quantity: this.quantity,
          price: this.price,
          amount: this.amount,
          sub_total: this.subTotal,
          vat: this.vat,
          vat_total: this.vatTotal,
          db: localStorage.getItem('fetch'),
          mykey: 'a4',
          total: this.total,
          readCookie: this.readCookie
        }
        this.data.postMethod('http://localhost/project/projectapi.php', pload).subscribe(
          success => {
            if(success['code'] != '00'){
              console.log(success['message']);
              this.error = success['message'];
            }else{
              alert('invoice sent successfully');
            //   // this.nav.navigate(['/dashboard/invoice']);
            //   this.invModal = document.getElementById('invoicemodal');
            //   this.invModal.style.display = 'block';
            let iload = {
              mykey: 'a7',
              db: localStorage.getItem('fetch'),
              invoice_no: this.length
            }
            this.data.postMethod('http://localhost/project/projectapi.php', iload).subscribe(
              data => {
                this.viewer = data['message'];
                localStorage.setItem('view', JSON.stringify(this.viewer));
                this.nav.navigate(['/dashboard/preview']);
              }
            );
            }
          },
          ()=>{}
        )
      }
    }
  }
  
  openModal(){
    this.modals = document.getElementById('modaldiv');
    this.modals.style.display = 'block';
  }

  closeModal(){
    this.modals.style.display = 'none';
    this.email = '';
    this.returnError = '';
  }

  // invmodal(){
  //   this.invModal = document.getElementById('invoicemodal');
  //   this.invModal.style.display = 'block';
  // }

}
