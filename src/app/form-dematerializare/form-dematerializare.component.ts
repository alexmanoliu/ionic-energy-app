import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SignatureFieldComponent } from '../signature-field/signature-field.component';
import { saveAs } from 'file-saver';
import { Users } from '../models/Users';
import { UsersSapService } from '../services/users-sap.service';

@Component({
  selector: 'app-form-dematerializare',
  templateUrl: './form-dematerializare.component.html',
  styleUrls: ['./form-dematerializare.component.scss']
})
export class FormDematerializareComponent implements OnInit {
  response: any;
  result: any = [];
  data: Observable<string>;
  public items: any;
  isdisabled: false;
  public formularDematerializare: FormGroup;
  public secondSig: SignatureFieldComponent;
  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<
    SignatureFieldComponent
  >;
  @ViewChildren('sigContainer1') public sigContainer1: QueryList<ElementRef>;
  @ViewChildren('sigContainer2') public sigContainer2: QueryList<ElementRef>;
  @ViewChildren('sigContainer3') public sigContainer3: QueryList<ElementRef>;

  SapUsers: any[];
  currentUser: Users = {
    id: 1,
    NrInregDGSR: '',
    POD: '',
    NumeClient: '',
    Strada: '',
    Nr: '',
    Bloc: '',
    Scara: '',
    Apartament: '',
    Localitate: '',
    Judet: '',
    Telefon: '',
    E_mail: '',
    NrContractServicii: '',
    DataContractServicii: '',
    DataUltimeiVerificari: '',
    DataScadentaVerifiNotif: ''
  };

  constructor(
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userSapService: UsersSapService
  ) {
    this.formularDematerializare = this.formBuilder.group({
      formName: ['Anexa 4'],
      NrInregDGSR: [''],
      FisaEvidenta: [''],
      POD: [''],
      NumeClient: [],
      Strada: [''],
      Nr: [''],
      Bloc: [''],
      Scara: [''],
      Apartament: [''],
      Localitate: [''],
      Judet: [''],
      Telefon: ['', [Validators.required]],
      E_mail: [''],
      NrContractServicii: [''],
      DataContractServicii: [''],
      DataUltimeiVerificari: [''],
      DataDocumentatieTehnica: [''],
      DataScadentaVerifiNotif: [''],
      DataScadentaVerificareTehnica: [''],
      DataInregistareOperatorSistem: [''],
      NuDetine: [''],
      NumeInstalator: [''],
      LegitimatieInstalator: [''],
      NrLegitimatie: [''],
      AnEmitereLegitimatie: [''],
      ValabilitateLegitimatie: [''],
      NotificateDeFurnizorulDeGazeTIP: [''],
      NotificateDeFurnizorulDeGazeNR: [''],
      NotificateDeFurnizorulDeGazeDEBITNOMINAL: [''],
      IdentificateDeFurnizorulDeGazeTIP: [''],
      IdentificateDeFurnizorulDeGazeNR: [''],
      IdentificateDeFurnizorulDeGazeDEBITNOMINAL: [''],
      RamasIUGN: [''],
      IdentificareConvertor: [''],
      IdentificareSigiliuRacord: [''],
      IdentificareTipContor: [''],
      VerificareTehnicaIntervalMaxim2ani: [''],
      VerificareTehnicaLaCerereaClientului: [''],
      VerificareTehnica: [''],
      VerificareTehnicaObservatii: [''],
      VerificareTehnicaLaCerereaClientuluiTabel2: [''],
      VerificareTehnicaLaCerereaClientuluiTabel2Observatii: [''],
      VerificareaArzatoarelorDA: [false],
      VerificareaArzatoarelorNU: [false],
      VerificareaArzatoarelorNuEsteCazul: [false],
      VerificareaStabilitatiiDA: [null, ''],
      VerificareaStabilitatiiNU: [null, ''],
      VerificareaStabilitatiiNuEsteCazul: [null, ''],
      VerificareaEtanseitatiiDA: [null, ''],
      VerificareaEtanseitatiiNU: [null, ''],
      VerificareaEtanseitatiiNuEsteCazul: [null, ''],
      VerificareaFunctionariiAparatelor: [null, ''],
      DemontareDebransareTipAparat: [null, ''],
      DemontareDebransareDebitNominal: [null, ''],
      DemontareDebransareDA: [null, ''],
      DemontareDebransareNU: [null, ''],
      DemontareDebransareNuEsteCazul: [null, ''],
      VerificareaFunctionariiEchipamentuluiDA: [null, ''],
      VerificareaFunctionariiEchipamentuluiNU: [null, ''],
      VerificareaFunctionariiEchipamentuluiNuEsteCazul: [null, ''],
      VerificareaStariiRasuflatorilorDA: [null, ''],
      VerificareaStariiRasuflatorilorNU: [null, ''],
      VerificareaStariiRasuflatorilorNuEsteCazul: [null, ''],
      VerificareaDocumentelorPrezentateDeclientDA: [null, ''],
      VerificareaDocumentelorPrezentateDeclientNU: [null, ''],
      VerificareaDocumentelorPrezentateDeclientNuEsteCazul: [null, ''],
      VerificareaStariiConstructiilorStatiiSiPosturiDA: [null, ''],
      VerificareaStariiConstructiilorStatiiSiPosturiNU: [null, ''],
      VerificareaStariiConstructiilorStatiiSiPosturiNuEsteCazul: [null, ''],
      VerificareaDocumentelorPrezentateDeClientISCIRDA: [null, ''],
      VerificareaDocumentelorPrezentateDeClientISCIRNU: [null, ''],
      VerificareaDocumentelorPrezentateDeClientISCIRNuEsteCazul: [null, ''],
      VerificareTehnicaInstalațieComuneDeUtilizareDA: [null, ''],
      VerificareTehnicaInstalațieComuneDeUtilizareNU: [null, ''],
      VerificareTehnicaInstalațieComuneDeUtilizareNuEsteCazul: [null, ''],
      VerificareRacordFlexibilValabilitateDA: [null, ''],
      VerificareRacordFlexibilValabilitateNU: [null, ''],
      VerificareRacordFlexibilValabilitateNuEsteCazul: [null, ''],
      ConfirmEfectuareOpreatiiTabelul3: [''],
      ConfirmPrimireExemplarInstructiuniUitilizareGaze: [''],
      DefecteConstatateTabel4: [''],
      RemediereDefecteTabel4: [''],
      RemediereDefecteDA: [null, ''],
      RemediereDefecteNU: [null, ''],
      IndeplinesteConditiiTehniceTabel5DA: [null, ''],
      IndeplinesteConditiiTehniceTabel5NU: [null, ''],
      Tabel7DA: [false],
      Tabel7NU: [false],
      IndeplinesteConditiiTehniceTabel5oBSERVATII: [''],
      AparatConsumatorCombustibiliGazosiTipAparat: [''],
      AparatConsumatorCombustibiliGazosiDebitNominal: [''],
      DocumentCuratireCosuriSiCanaleNR: [''],
      DocumentCuratireCosuriSiCanaledATA: [''],
      DocumentAtestaVerificareAparateConsumatoareCombustibiliGazosiNR: [''],
      DocumentAtestaVerificareAparateConsumatoareCombustibiliGazosiDATA: [''],
      InstalatieUtilizareGazeRespectaNormeleTehniceDA: [null, ''],
      InstalatieUtilizareGazeRespectaNormeleTehniceNU: [null, ''],
      InstalatieUtilizareGazeRespectaNormeleTehniceObservartii: [null, ''],
      semnaturaClientFinal: ['', Validators.required],
      semmaturaPersoanaAutorizata: ['', Validators.required],
      semnaturaClientAcordfinal: ['', Validators.required]
    });
  }

  sendForm() {
    const body = this.formularDematerializare.value;
    this.httpClient
      .post('http://srv-om-q:8080/inputs/http-test2', body, {
        responseType: 'text'
      })
      .subscribe(response => {
        const pdf = this.base64ToArrayBuffer(response);
        const blob = new Blob([pdf], { type: 'application/pdf' });
        saveAs(blob, 'gmc.pdf');
      });
    console.log(this.formularDematerializare.value);
  }

  ngOnInit() {}

  public base64ToArrayBuffer(data) {
    const binaryString = window.atob(data);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  public ngAfterViewInit() {
    this.secondSig = this.sigs.find((sig, index) => index === 1);
    this.beResponsive();
    this.setOptions();
  }

  // set the dimensions of the signature pad canvas
  public beResponsive() {
    console.log('Resizing signature pad canvas to suit container size');
    this.size(this.sigContainer1.first, this.sigs.first);
    this.size(this.sigContainer2.first, this.secondSig);
    this.size(this.sigContainer3.first, this.sigs.last);
  }

  public size(container: ElementRef, sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
    sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
  }

  public setOptions() {
    this.sigs.first.signaturePad.set('penColor', 'rgb(255, 0, 0)');
    this.secondSig.signaturePad.set('penColor', 'rgb(255, 255, 0)');
    this.secondSig.signaturePad.set('backgroundColor', 'rgb(255,255,255)');
    this.secondSig.signaturePad.clear(); // clearing is needed to set the background colour
  }

  public submit() {
    console.log('CAPTURED SIGS:');
    console.log(this.sigs.first.signature);
    console.log(this.secondSig.signature);
    console.log(this.sigs.last.signature);
  }

  public clear() {
    this.sigs.first.clear();
    this.secondSig.clear();
    this.sigs.last.clear();
  }

  getUsers() {
    this.userSapService.getSapUsers().subscribe(SapUsers => {
      this.SapUsers = SapUsers;
      console.log(SapUsers);
    });
  }
}
