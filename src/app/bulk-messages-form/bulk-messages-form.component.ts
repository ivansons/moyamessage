import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bulk-messages-form',
  templateUrl: './bulk-messages-form.component.html',
  styleUrls: ['./bulk-messages-form.component.less']
})
export class BulkMessagesFormComponent implements OnInit {
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

  ngOnInit() {
  }

  submitForm() {

    var sender = this.form.get('sender_number').value
    let data = {
      sender_number: this.form.get('sender_number').value.toString(),
      receiver_numbers: this.form.get('receiver_numbers').value,
      message: this.form.get('message').value

    };
    this.http.post('/v1/bulk-message', data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

/*submitForm() {
  console.log(this.form.value);
}*/
}
