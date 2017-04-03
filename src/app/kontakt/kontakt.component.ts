import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Popup } from 'ng2-opd-popup';
import '../_helpers/rxjs-operators';

import{ Kontakt } from '../_models/kontakt';
import { KontaktService } from '../_services/kontakt.service';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html'
})
export class KontaktComponent implements OnInit {
  @ViewChild('popup1') popup1: Popup;
  jwtHelper: JwtHelper = new JwtHelper();
  errorMessage: string;
  kontakter: Kontakt[];
  currentUser: string;
  isEdit: boolean;

  constructor(private kontaktService: KontaktService) {
    this.currentUser = this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).unique_name;
  }

  ngOnInit() {
    this.getCompanyKey();
  }

  hentKontakter() {
    this.kontaktService.hentKontakter()
                  .subscribe(
                     kontakter =>  this.kontakter = kontakter,
                     error => this.errorMessage = <any>error
                  );
  }

  nyKontakt (form: NgForm) {
    let data = {
      Info: {
        Name: form.value.name,
        InvoiceAddress: {
          AddressLine1: form.value.adressLine,
          AddressLine2: form.value.adressLine2,
          AddressLine3: form.value.adressLine3,
          City: form.value.city,
          Country: form.value.country,
          CountryCode: form.value.countryCode,
          PostalCode: form.value.postalCode,
        },
        DefaultPhone: {
          CountryCode: form.value.countryCodePhone,
          Description: form.value.description,
          Number: form.value.number,
        },
        DefaultEmail: {
          EmailAddress: form.value.emailAdress,
        },
      },
      Comment: form.value.comment
    };

    this.kontaktService.nyKontakt(data)
                   .subscribe(
                      kontakt => this.kontakter.push(kontakt),
                      error =>  alert(error));
    form.reset();
    this.popup1.hide()
  }


  oppdaterKontakt(form: NgForm) {
    let data = {
      CustomValues: {},
      Comment: "Test123",
      CreatedAt: "2017-04-01T08:51:32Z",
      CreatedBy: "3d490bf8-794e-486d-8c9d-929543df0334",
      Deleted: false,
      ID: form.value.id,
      InfoID: 55,
      ParentBusinessRelationID: null,
      Role: "",
      StatusCode: null,
      UpdatedAt: "2017-04-03T19:09:50.233Z",
      UpdatedBy: "d6b3754c-a057-4017-b01e-b7b752d8c7cb",
      Info: {
          CustomValues: {},
          CreatedAt: "2017-04-01T08:51:32Z",
          CreatedBy: "3d490bf8-794e-486d-8c9d-929543df0334",
          DefaultBankAccountID: null,
          DefaultContactID: null,
          DefaultEmailID: 51,
          DefaultPhoneID: 53,
          Deleted: false,
          ID: 55,
          InvoiceAddressID: 104,
          Name: form.value.name,
          ShippingAddressID: 105,
          StatusCode: null,
          UpdatedAt: null,
          UpdatedBy: null,
          DefaultPhone: {
              CustomValues: {},
              BusinessRelationID: 55,
              CountryCode: "",
              CreatedAt: "2017-04-01T08:51:32Z",
              CreatedBy: "3d490bf8-794e-486d-8c9d-929543df0334",
              Deleted: false,
              Description: "",
              ID: 53,
              Number: form.value.nummer,
              StatusCode: null,
              Type: "0",
              UpdatedAt: null,
              UpdatedBy: null
          },
          DefaultEmail: {
              CustomValues: {},
              BusinessRelationID: 55,
              CreatedAt: "2017-04-01T08:51:32Z",
              CreatedBy: "3d490bf8-794e-486d-8c9d-929543df0334",
              Deleted: false,
              Description: "",
              EmailAddress: form.value.email,
              ID: 51,
              StatusCode: null,
              Type: "",
              UpdatedAt: null,
              UpdatedBy: null
          },
          InvoiceAddress: {
              CustomValues: {},
              AddressLine1: "Rennesøygata 10",
              AddressLine2: "",
              AddressLine3: "",
              BusinessRelationID: 55,
              City: "Haugesund",
              Country: "Norge",
              CountryCode: "NO",
              CreatedAt: "2017-04-01T08:51:32Z",
              CreatedBy: "3d490bf8-794e-486d-8c9d-929543df0334",
              Deleted: false,
              ID: 104,
              PostalCode: "5537",
              Region: "",
              StatusCode: null,
              UpdatedAt: null,
              UpdatedBy: null,
              _links: {
                  actions: {},
                  relations: {},
                  transitions: {}
              }
          },
          _links: {
              actions: {},
              relations: {
                  Self: {
                      href: "/api/biz/business-relations/55",
                      method: "GET",
                      label: null,
                      description: null,
                      readonly: false
                  },
                  Contacts: {
                      href: "/api/biz/contacts?filter=ParentBusinessRelationID eq 55",
                      method: "GET",
                      label: null,
                      description: null,
                      readonly: false
                  },
                  BankAccounts: {
                      href: "/api/biz/bankaccounts?filter=BusinessRelationID eq 55",
                      method: "GET",
                      label: null,
                      description: null,
                      readonly: false
                  }
              },
              transitions: {}
          }
      },
      _links: {
          actions: {},
          relations: {
              Self: {
                  href: "/api/biz/contacts/50",
                  method: "GET",
                  label: null,
                  description: null,
                  readonly: false
              },
              Info: {
                  href: "/api/biz/business-relations/55",
                  method: "GET",
                  label: null,
                  description: null,
                  readonly: false
              }
          },
          transitions: {}
      }
  }



    // {
    //   ID: form.value.id,
    //   Info: {
    //     Name: form.value.name,
    //     DefaultPhone: {
    //       Number: form.value.nummer
    //     },
    //     DefaultEmail: {
    //       EmailAddress: form.value.email
    //     }
    //   }
    // }

    this.kontaktService.oppdaterKontakt(data)
                     .subscribe(
                        kontakt => console.log(kontakt),
                        error =>  error);
    this.isEdit = false;
  }


  slettKontakt(id: number) {
  	this.kontaktService.slettKontakt(id)
  									   .subscribe(res => res.json())
  }


  getCompanyKey() {
    this.kontaktService.getCompanyKey()
                       .subscribe(
                         res => this.hentKontakter(),
                         error => this.errorMessage = <any>error
                       );
  }


  popupForm() {
    this.popup1.options = {
      header: "Ny Kontakt:",
      color: "LightSkyBlue",
      widthProsentage: 50,
      animationDuration: 0.5,
      showButtons: false,
      confirmBtnContent: "Legg til Kontakt",
      cancleBtnContent: "Lukk",
      confirmBtnClass: "btn btn-default",
      cancleBtnClass: "btn btn-default",
      animation: "fadeInDown"
    };

    this.popup1.show(this.popup1.options);
  }


  lukkPopup() {
    this.popup1.hide()
  }

  redigerKontakt(kontakt: any) {
    kontakt.isEdit = true;
  }

  kanselerRedigeringKontakt(kontakt: any) {
    kontakt.isEdit = false;
  }
}
