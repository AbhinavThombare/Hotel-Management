import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NodeServerApiService {
  private configURL = 'http://localhost:3003';
  headers = new HttpHeaders();
  
  constructor(
    private http:HttpClient
  ) { }

  registerUser(data:any) {
    return this.http.post(this.configURL+'/api/user/register',{data},{observe:'response'})
  }

  loginUser(userdata:object) {
    return this.http.post(this.configURL+'/api/user/login/',{userdata},{ observe: 'response' })
  }

  logoutUser(token:any) {
    return this.http.post(this.configURL+'/api/user/logout/'+token,{observer:'response'})
  }
}
