import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormDematerializareComponent } from './form-dematerializare/form-dematerializare.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UsersSapService } from './services/users-sap.service';
import { AngajatSapService } from './services/angajat-sap.service';
import { SignatureFieldComponent } from './signature-field/signature-field.component';


@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    FormDematerializareComponent,
     HomeComponent,
     SignatureFieldComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    SignaturePadModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UsersSapService,
    AngajatSapService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
