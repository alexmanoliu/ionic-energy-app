import { Component, OnInit } from '@angular/core';
import { AngajatSapService } from '../services/angajat-sap.service';
import { Angajat } from '../models/Angajat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  angajati: Angajat[];
  currentAngajat: Angajat = {
    Prenume: '',
    Nume: ''
  };

  constructor(private angajatSapService: AngajatSapService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.angajatSapService.getSapAngajat().subscribe(angajati => {
      this.angajati = angajati;
      // console.log(angajati);
      this.router.navigateByUrl('home');
    });
  }
}
