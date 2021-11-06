import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  logout() {
    // console.log('localStorage1', localStorage);
    // localStorage.removeItem('userToken');
    // console.log('localStorage2', localStorage);
    // this.RouterModule.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
    return onAuthUIStateChange;
  }
  
  listData() {
    this.router.navigate(['/list-data']);
  }

  goToConversations() {
    this.router.navigate(['/conversations']);
  }

}
