import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

   
  getPosts(){

    const { apiUrl } = environment
    // http://localhost:3000/api

    return this.http.get(`${apiUrl}/posts`)
    
  }


}
