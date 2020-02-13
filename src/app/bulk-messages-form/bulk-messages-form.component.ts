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
  public status:any;
  public data: any[]=[];
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
    const target: DataTransfer = <DataTransfer> (ev.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      let temp = <any> (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      for(let i=1;i<temp.length;i++){
        this.data.push(temp[i][0].toString());
      }
      console.log(this.data);

    };
    reader.readAsBinaryString(target.files[0]);

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

  submitForm() {


    const data = {
      sender_number: this.form.get('sender_number').value.toString(),
      receiver_numbers: this.data, /* this.form.get('receiver_numbers').value, */
      message: this.form.get('message').value

    };
    this.http.post('/v1/bulk-message', data).subscribe(
      (response) => {
        if(response['error']==false){
          console.log("Sucess");
          this.status="Successfully sent messages!";
        }else{
          console.log('error');
          this.status="Failed to send messages!";

        }
        console.log(response)
      },
      (error) => console.log(error)
    );
  }

  /* submitForm() {
    console.log(this.form.value);
  } */
}
