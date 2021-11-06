import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {

  readonly rootUrl = environment.apiBaseUrl;
  constructor(private elementRef: ElementRef, private http: HttpClient) { }

  title: string;
  cover: File;
  data_sources: any;
  topic_name: string;

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  upload(event: any) {
    console.log('event.target', event.target.files[0]);
    // console.log('test', $('#career_resume').val();)
    // let topic_name = '';
    this.title = this.topic_name;
    this.cover = event.target.files[0];

    const uploadData = new FormData();
    // uploadData.append('title', this.title);
    uploadData.append('cover', this.cover, this.cover.name);
    // uploadData.append('name', this.name);
    // uploadData.append('category', this.category);
    // uploadData.append('description', this.description);
    // uploadData.append('company', this.company);
    // uploadData.append('file_name', this.cover.name);


      // var data = {
      //   'cover': this.cover,
      //   'title': this.title,
      //   'class_name': this.class_name,
      //   'teacher_name': this.teacher_name,
      //   'topic_name': topic_name,
      //   'link_url': link_url
      // }


    console.log('in grade before', uploadData);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });
    var obs = this.http.post(this.rootUrl + '/main/upload_data/', uploadData)
    obs.subscribe((data : any)=>{
      console.log('data obs', data);
      this.data_sources.push(data['data']);
      // console.log('this.classes', this.classes)
    },
    (err : HttpErrorResponse)=>{
      // this.isLoginError = true;s
      console.log('data err', err);
    });
  }
}
