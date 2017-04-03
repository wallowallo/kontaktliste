import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

declare var process:any;

@Injectable()
export class LogInService {

  private loginUrl = process.env.UNIMICRO_API_URL;

  constructor (private http: Http) {}


  logIn(data: any): Observable<any> {
    return this.http.post(this.loginUrl, data, this.jwt())
                    .map((response: Response) => {
																	 let user = response.json();
              									   if (user && user.access_token) {
                   								  	localStorage.setItem('currentUser', JSON.stringify(user));
																	 }
               				 					});
  }


	logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('CompanyKey');
  }


	private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
