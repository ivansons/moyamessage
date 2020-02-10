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
  public sender_number: any = '';
  public receiver_number: any = '';
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      sender_number: '',
      receiver_number: '',
      message: ''
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
    /*    const formData: any = new FormData();
       formData.append('sender_number', this.form.get('sender_number').value);
       formData.append('receiver_number', this.form.get('receiver_number').value);
       formData.append('message', this.form.get('message').value);
    */
    /* const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Host':'https://api.moya.app',
        'Authorization':'Basic ZGU4ZWVhOGMtMzg0Zi0xMWVhLWFjZjktYzE0MWFjZmQ5MmYyOjUxNTVmMGY5LWRjNDAtNGM2NS04MDBhLWNmNjAwODEyMjE1ZA=='
      })
    }; */
    var sender = this.form.get('sender_number').value
    let data = {
      sender_number: this.form.get('sender_number').value.toString(),
      receiver_number: this.form.get('receiver_number').value.toString(),
      message: this.form.get('message').value

    }
 //   console.log(this.form)
    //27795434313
    //27797800952
    this.http.post('/v1/dm', data).subscribe(
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
