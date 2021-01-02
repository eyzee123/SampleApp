import  { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PostProvider{
    server: string ="http://192.168.254.178/sabong_api/";
  //  server: string ="http://localhost/sabong_api/";
//   server: string = "https://cirfund.org/checker_api/";
    constructor(public http : Http){
        
    }
    
    postData(body,file){
        let type="application/json; charset=UTF-8";
        let headers = new Headers({ "content-Type":type });
        let options = new RequestOptions({headers: headers});
        
        
        return this.http.post(this.server + file, JSON.stringify(body),options)
        .pipe(map(res=>res.json()));
    }
    
    
}