import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = "https://65e92e5f4bb72f0a9c50dec5.mockapi.io/api/exampleApi";
  getData(){
    return this.http.get(this.url);
  }

  addUser(data: any){
    return this.http.post(this.url, data);
  }

  deleteUser(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getDetailUser(id: number){
    return this.http.get(`${this.url}/${id}`);
  }

  updateUser(id:number, data: any){
    return this.http.put(`${this.url}/${id}`, data);
  }
}
