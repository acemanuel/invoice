import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private data: HttpClient) { }
  postMethod(apiEndPoint, payLoad){
    return this.data.post(apiEndPoint, JSON.stringify(payLoad));
  }
  putMethod(apiEndPoint, payLoad){
    return this.data.put(apiEndPoint, payLoad);
  }
  deletemethod(apiEndPoint, payLoad){
    return this.data.delete(apiEndPoint, payLoad);
  }
  getmethod(apiEndPoint, payLoad){
    return this.data.get(apiEndPoint, payLoad);
  }

  imgUploader (payLoad) {
    return this.data.post("http://localhost/project/imgapi.php", payLoad);
  }
}
