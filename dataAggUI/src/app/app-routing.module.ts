import { ConversationsComponent } from './conversations/conversations.component';
import { ListDataComponent } from './list-data/list-data.component';
import { AppComponent } from './app.component';
import { DescriptionComponent } from './description/description.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { DefaultComponent } from './default/default.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: SearchComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  },
  {
    path: 'description',
    component: DescriptionComponent
  },
  {
    path: 'list-data',
    component: ListDataComponent
  },
  // {
  //   path: 'conversations',
  //   component: ConversationsComponent
  // }
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
