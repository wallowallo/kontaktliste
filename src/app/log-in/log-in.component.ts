import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import '../_helpers/rxjs-operators';

import { LogInService } from '../_services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html'
})

export class LogInComponent implements OnInit {
  returnUrl: string;
  errorMessage: string;
  loading = false;

  constructor (
    private logInService: LogInService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.logInService.logout();
    this.returnUrl = '/kontakter';
  }


  logIn (form: NgForm) {
    let data =
      {
        UserName: form.value.username,
        Password: form.value.password
    }
      this.logInService.logIn(data)
                      .subscribe(
                        res => this.router.navigate([this.returnUrl]),
                        error =>  alert(error));
      form.reset();
      this.loading = true;
  }
}
