import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import{ Kontakt } from '../_models/kontakt';

declare var process:any;

@Injectable()
export class KontaktService {

  private kontaktUrl = process.env.UNIMICRO_API_URL;
  private companyUrl = process.env.UNIMICRO_COMP_KEY
  private infoUrl = process.env.UNIMICRO_INFO_URL

  constructor (private http: Http) {}

  hentKontakter (): Observable<any> {
    return this.http.get(this.kontaktUrl + this.infoUrl, this.jwt())
                    .map((res: Response) => res.json())
										.catch(this.handleError);
  }



  nyKontakt(data: any): Observable<any> {
    let body = JSON.stringify(data);

    return this.http.post(this.kontaktUrl, body, this.jwt())
                  .map((res: Response) => res.json())
                  .catch(this.handleError)
  }



  oppdaterKontakt(data: any): Observable<any> {
    let body = JSON.stringify(data);
    let id = data.ID;

    return this.http.put(this.kontaktUrl + `/${id}?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress`, body, this.jwt())
                  .map((res: Response) => res.json())
                  .catch(this.handleError)
  }



  slettKontakt (id: number): Observable<any> {
    return this.http.delete(this.kontaktUrl + `/${id}?top=20`, this.jwt());
  }



  getCompanyKey( ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.access_token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.companyUrl, options)
                    .map((res: Response) => {
                      let a = res.json();
                      localStorage.setItem('CompanyKey', a[0].Key)
                  })
										.catch(this.handleError);
  }


  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  private jwt() {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let companyKey = localStorage.getItem('CompanyKey');
      if (currentUser && currentUser.access_token) {
          let headers = new Headers({
            'Content-Type': 'application/json',
            'CompanyKey': companyKey,
            'Authorization': 'Bearer ' + currentUser.access_token
          });
          return new RequestOptions({ headers: headers });
      }
   }

}
