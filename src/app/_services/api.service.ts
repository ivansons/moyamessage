import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'https://api.moya.app/v1/dm';
  form: FormGroup;
  fb: any;


  constructor(private httpClient: HttpClient) {this.form = this.fb.group({
    sender_number: [''],
    receiver_number: [''],
    message: ['']
  }); }

}
