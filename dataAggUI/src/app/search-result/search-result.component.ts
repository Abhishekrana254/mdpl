import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {


  data_list: any = [];
  isDataAvailable: Boolean = false;
  readonly rootUrl = environment.apiBaseUrl;

  constructor(private route: ActivatedRoute, private elementRef: ElementRef,
    private http: HttpClient, private ngZone: NgZone, private ref: ChangeDetectorRef) { 

    console.log('this.route.queryParams', this.route.queryParams)
    this.route.queryParams
      .subscribe(
      params => {
        console.log(params);  
        this.ngZone.run( () => {
          this.data_list = JSON.parse(params['data_list']);
          console.log('this', this.data_list);
          // this.isDataAvailable = true;
          this.ref.detectChanges();
        }); 
      },
      (error) => console.log('error', error),
      () => {
      } 
    ) 

    // alert(localStorage.getItem('refreshed'));
    if (localStorage.getItem('refreshed') == 'false') {
      localStorage.setItem('refreshed', 'true');
      // alert(window.location);
      window.location.reload()
    }

    localStorage.setItem('desc_refreshed', 'false');    
  }


  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
    // localStorage.setItem('refreshed', 'false');
  }

}
