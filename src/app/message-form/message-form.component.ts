import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-message',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.less']
})
export class MessageFormComponent implements OnInit {

  form: FormGroup;

  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      sender_number: [''],
      receiver_number: [''],
      message: ['']
    });
  }

  ngOnInit() { }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity();
  }

 /* submitForm() {
    console.log(this.form.value);
  }*/

  submitForm() {
    const formData: any = new FormData();
    formData.append('sender_number', this.form.get('sender_number').value);
    formData.append('receiver_number', this.form.get('receiver_number').value);
    formData.append('message', this.form.get('message').value);

    this.http.post('https://api.moya.app/v1/dm', formData).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  );
  }

}

/*  submitForm() {
    const formData: any = new FormData();
    formData.append('name', this.form.get('name').value);
    formData.append('avatar', this.form.get('avatar').value);

    this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  );
  }*/
