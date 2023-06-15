import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  authserviceUrl = 'http://localhost:8080/api/v1.0/auth';

  constructor(private http: HttpClient) { }

  getTransaction(ticketId:number,token:string){
    let options = {
      headers:{"Authorization":token}
    }
    //fix any here
    return this.http.get<any>(this.authserviceUrl+`/getTransaction/${ticketId}`);
  }

}
