import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Desk } from 'src/app/core/models/Desk.model';

@Injectable({
  providedIn: 'root'
})
export class DeskService {

  private baseurl: string = "https://localhost:44363/desk/";

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Desk[]> {
    return this.http.get<Desk[]>(this.baseurl + 'getAll')
  }

  getDesk(id: number): Observable<Desk> {
    return this.http.get<Desk>(this.baseurl + 'getDesk/' + id);
  }

  add(floor: number, x: number, y: number): Observable<any> {
    const headerDict = {
      'floor': floor.toString(),
      'x': x.toString(),
      'y': y.toString()
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }

    return this.http.put(this.baseurl + 'add', {}, requestOptions);
  }
}
