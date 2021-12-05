import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  readonly rootUrl = environment.apiBaseUrl;
  panelOpenState = false;
  // data_list: Object = [ {
  //   id: 'some_id',
  //   name: 'something',
  //   description: '',
  //   file_name: '',
  // }]
  data_list: any = [];
  hideToggle = false;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document,
              private elementRef: ElementRef, private router: Router) { }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {
    this.hideToggle = false;
    // http call 
    // this.data_list = [
    //               {
    //                 id: '1',
    //                 name: 'US Health Care Data 1',
    //                 description: 'US Health Care Data 1',
    //                 file_name: 'test1.csv'
    //               }, 
    //               {
    //                 id: '2',
    //                 name: 'US Health Care Data 2',
    //                 description: 'US Health Care Data 2',
    //                 file_name: 'test2.csv'
    //               }
    //             ]
  }

  search(query: any): void {
    var data = {
      'query': query,
    };
    console.log('data', data);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    var obs = this.http.post(this.rootUrl + '/main/search/', data, { headers: reqHeader })
    obs.subscribe((data : any)=>{
      console.log('data obs', data);
      this.data_list =[];
      this.data_list = data['data_list']
      console.log('ddata list', this.data_list);

      // var list = {'list': this.data_list }
      // list = this.data_list;
      // <a [routerLink]="['/description']" [queryParams]="{ id : data.id, name: data.name,
      //   file_name: data.file_name }" 
      // mdbBtn color="primary" >
      //  Data Description 
      // </a>
      localStorage.setItem('refreshed', 'false');
      this.router.navigate(['/search-result'], {queryParams: { data_list: JSON.stringify(this.data_list) }})
        
    },
    (err : HttpErrorResponse)=>{
      // this.isLoginError = true;
      console.log('data err', err);
      this.data_list =[];
    });
  }
  

}
