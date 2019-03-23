import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Angajat } from './../models/Angajat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngajatSapService {

  constructor(private http: HttpClient) { }

  getSapAngajat(): Observable<Angajat[]> {

    const userSapUrl = 'http://srv-vpwqas1.distrigazsud.ro:8053/RESTAdapter/Dematerializare/services/marca/id=1';
    const headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append('Authorization', 'Basic ' + btoa('WS_DEMAT: 368UdtRQrhBuMwyDFARf'));

    const httpOptions = {
      headers: headers_object
    };


    return this.http.get<Angajat[]>(userSapUrl, httpOptions);
  }

}
