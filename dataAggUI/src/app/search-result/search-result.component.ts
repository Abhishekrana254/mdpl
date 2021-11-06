import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {


  data_list: any = [];
  constructor(private route: ActivatedRoute, private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        console.log(params);
        this.data_list = JSON.parse(params['data_list']);
        // this.data_list =  params['data_list'];
        console.log('this', this.data_list);
        // console.log( this.data_list[0].id, this.data_list[0].name)
        
      }
    )
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

}
