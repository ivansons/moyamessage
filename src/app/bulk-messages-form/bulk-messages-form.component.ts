import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulk-messages-form',
  templateUrl: './bulk-messages-form.component.html',
  styleUrls: ['./bulk-messages-form.component.less']
})
export class BulkMessagesFormComponent implements OnInit {
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;

  form: FormGroup;
  public sender_number: any = '';
  public receiver_numbers: any = '';
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      sender_number: '',
      receiver_numbers: '',
      message: ''
    });
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }




  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector('#download');
      el.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute('download', 'xlsxtojson.json');
    }, 1000);
  }

  ngOnInit() {
  }

  /*submitForm() {

    var sender = this.form.get('sender_number').value
    const data = {
      sender_number: this.form.get('sender_number').value.toString(),
      receiver_numbers: this.form.get('receiver_numbers').value,
      message: this.form.get('message').value

    };
    this.http.post('/v1/bulk-message', data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }*/

submitForm() {
  console.log(this.form.value);
}
}
