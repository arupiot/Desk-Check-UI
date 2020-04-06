import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private http: HttpClient,
    ) { }
  baseurl: string = "https://localhost:44363/user/";

  sendNotif(name: string, content: string): Observable<any> {
    const headerDict = {
      'Name': name,
      'Content': content,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }

    return this.http.post(
      this.baseurl + "sendnotif",
       "",
      requestOptions
    );
  }
}
