import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromiseComponent } from './promise/promise.component';
import { ObservableComponent } from './observable/observable.component';
import { ListComponent } from './observable/list/list.component';
import { FromEventComponent } from './observable/from-event/from-event.component';
import { MapComponent } from './observable/map/map.component';
import { MergeComponent } from './observable/merge/merge.component';
import { MergemapComponent } from './observable/mergemap/mergemap.component';
import { ConcatComponent } from './observable/concat/concat.component';
import { ConcatmapComponent } from './observable/concatmap/concatmap.component';
import { HandleMultipleHttpRequestsComponent } from './observable/handle-multiple-http-requests/handle-multiple-http-requests.component';
import { SwitchMapComponent } from './observable/switch-map/switch-map.component';


const routes: Routes = [
  { path:'promise',component: PromiseComponent },
  { 
    path:'observable',
    component: ObservableComponent, 
    children:[
      { path: '',component: ListComponent },
      { path: 'fromEvent',component: FromEventComponent },
      { path: 'map',component: MapComponent},
      { path: 'concat',component: ConcatComponent },
      { path: 'merge',component: MergeComponent },
      { path: 'mergemap',component: MergemapComponent },
      { path: 'concatmap',component: ConcatmapComponent },
      { path: 'handlemultiplehttprequest',component: HandleMultipleHttpRequestsComponent },
      { path: 'switchmap',component: SwitchMapComponent }
    ]
  },
  { path:'**',redirectTo:'promise'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
