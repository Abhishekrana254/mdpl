import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from "file-saver";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  // variables, data_id, 
  // http call, for downlading that data id 
  // request call - form variables, http call save data in customer reqs

  id: String;
  name: String;
  file_name: String;
  download_data_status: Boolean = false;
  provider = 'US Healthcare Ministry';

  requestCallForm = new FormGroup({
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  readonly rootUrl = environment.apiBaseUrl;
  constructor(private route: ActivatedRoute, private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              private elementRef: ElementRef) { }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.id =  params['id'];
        this.name= params['name'];
        this.file_name = params['file_name'];
        
      }
    )

    console.log('id', this.id);
    console.log('name', this.name);

    // http request - /get_description_page, { username, id}
    // this.download_data_status = true;

    var data = {
      'username': localStorage['username'],
      'id': this.id
    };
    console.log('data', data);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    var obs = this.http.post(this.rootUrl + '/main/get_description_page/', data, { headers: reqHeader })
    obs.subscribe((data : any)=>{
      console.log('data', data);
      if (data['download_data_status'] == 'True') {
        this.download_data_status = true;
      }
      console.log('status', this.download_data_status);
    },
    (err : HttpErrorResponse)=>{
      console.log('data err', err);
    });


  }

  download(): void {
    var data = {
      'file_name': this.file_name,
    };
    console.log('data', data);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    var obs = this.http.post(this.rootUrl + '/main/download_data/', data, { headers: reqHeader, responseType: 'blob' })
    obs.subscribe((data : any)=>{
      // console.log('data obs', data);
        // this.showLoader = false;
        let blob;
        // console.log(data);
        // console.log(data._body);
        blob = new Blob([data], {type: 'application/vnd.ms-excel'});

        FileSaver.saveAs(blob, this.file_name.toString());
    },
    (err : HttpErrorResponse)=>{
      // this.isLoginError = true;
      console.log('data err', err);
    });

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.requestCallForm.value);
    // data_id, user_id, email, phone, send and save this data 

    // var data = this.requestCallForm.value
    // var user_id = '';
    // var data_id = '';

    // http request with this data, first make backend to save this data 
    console.log('local', localStorage);
    var username = localStorage.getItem('username');
    var data = {
      'data_id': this.id,
      'username': username,
      'email': this.requestCallForm.value.email,
      'phoneNumber': this.requestCallForm.value.phoneNumber
    };
    console.log('data', data);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
    var obs = this.http.post(this.rootUrl + '/main/save_call_request/', data, { headers: reqHeader })
    obs.subscribe((data : any)=>{
      console.log('data obs', data);
    },
    (err : HttpErrorResponse)=>{
      // this.isLoginError = true;
      console.log('data err', err);
    });
  }

  openChat() {
    this.document.getElementById("chatWindow")!.style.display = "block";
  }

  closeForm() {
    this.document.getElementById("chatWindow")!.style.display = "none";
  }

}

