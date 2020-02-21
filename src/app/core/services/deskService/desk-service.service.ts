import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Desk } from 'src/app/core/models/Desk.model';

@Injectable({
  providedIn: 'root'
})
export class DeskServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  baseurl: string = "https://localhost:44363/desk/";

  getAll(): Observable<Desk[]>{
    const headerDict = {
      'Access-Control-Allow-Origin': origin,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }

    return this.http.get<Desk[]>(
      this.baseurl + "getAll",
      requestOptions
    );
  }
}
