import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';
import { interval, merge, from, of } from 'rxjs';
import { map, take, mergeAll, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-mergemap',
  templateUrl: './mergemap.component.html',
  styleUrls: ['./mergemap.component.scss']
})
export class MergemapComponent implements OnInit {

  constructor(private designUtilityService:DesignUtilityService) { }

  getData(data) {
    return of(data + ' Video Uploaded');
  }
  ngOnInit(): void {
    const source = from(['Tech','Comedy','News']);

    // Ex - 01 Map
    source.pipe(
      map(res => this.getData(res))
    )
    .subscribe(res => {
      //console.log(res);
      this.designUtilityService.print(res, 'elContainer1')
    })   
    
    // Ex - 02 Map + Merge All
    source.pipe(
      map(res => this.getData(res)),
      mergeAll()
    )
    .subscribe(res => {
      //console.log(res);
      this.designUtilityService.print(res, 'elContainer2')
    }) 
    
     
    // Ex - 03 MergeMap
    source.pipe(
      mergeMap(res => this.getData(res))
    )
    .subscribe(res => {
      console.log(res);
      this.designUtilityService.print(res, 'elContainer3')
    })   
  }
}
