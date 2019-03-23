import { Component, OnInit } from '@angular/core';
import { Angajat } from '../models/Angajat';
import { AngajatSapService } from '../services/angajat-sap.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  angajati: Angajat[];
  currentAngajat: Angajat = {
    Prenume: '',
    Nume: ''
  };

  constructor(
    private angajatSapService: AngajatSapService,
    private router: Router
  ) {}

  ngOnInit() {
    this.angajatSapService.getSapAngajat().subscribe(angajati => {
      this.angajati = angajati;
      // console.log(angajati);
    });
  }

  anexa4() {
    this.router.navigateByUrl('form-dematerializare');
  }

  getUsers() {
    const request = new XMLHttpRequest();

    request.open(
      'GET',
      'https://private-anon-88aec4619a-orclenrgassignmentapi.apiary-mock.com/users'
    );

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    request.send();
  }
}
