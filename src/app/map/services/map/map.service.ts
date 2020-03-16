import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  baseurl: string = "https://localhost:44363/map/";

  constructor(
    private http: HttpClient,
  ) { }

  getSingle(floor: number): Observable<Object> {
    return this.http.get<Object>(this.baseurl + 'getSingle/' + floor);
  }

  getAll(): Observable<Object> {
    return this.http.get<Object>(this.baseurl + 'getAll');
  }
}
