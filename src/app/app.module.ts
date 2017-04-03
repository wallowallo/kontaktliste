import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { PopupModule } from 'ng2-opd-popup';
import 'hammerjs';

import { AppComponent } from './app.component';
import { KontaktService } from './_services/kontakt.service';
import { LogInService } from './_services/login.service';
import { LogInComponent } from './log-in/log-in.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { AuthGuard } from './_guards/auth.guard';

import { routing } from './_routing/routing';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    KontaktComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    PopupModule.forRoot(),
    routing
  ],
  providers: [
    KontaktService,
    LogInService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
