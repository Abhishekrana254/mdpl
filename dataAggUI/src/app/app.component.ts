// import { Component } from '@angular/core';
import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dataAggUI';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      
      this.authState = authState;
      this.user = authData as CognitoUserInterface;

      // console.log('user', this.user.username, this.user.attributes);
      // this.username = this.user.username;
      let username :string = this.user.username!; 
      localStorage.setItem('username', username);      
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
