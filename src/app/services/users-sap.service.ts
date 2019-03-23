import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsersSapService {
  private angajatSapUrl = 'http://srv-vpwqas1.distrigazsud.ro:8053/RESTAdapter/Dematerializare/services/pod/id=1';
  constructor(private http: HttpClient, private platform: Platform) {
    if (this.platform.is('android')) {
      this.angajatSapUrl = 'http://172.16.3.245:8080' + this.angajatSapUrl;
    }
  }

  getSapUsers(): Observable<any[]> {
    const headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append('Authorization', 'Basic ' + btoa('WS_DEMAT: 368UdtRQrhBuMwyDFARf'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<any[]>(this.angajatSapUrl, httpOptions);
  }


}
