import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';
import { of, from } from 'rxjs';
import { map, mergeAll, mergeMap, concatAll, delay, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-concatmap',
  templateUrl: './concatmap.component.html',
  styleUrls: ['./concatmap.component.scss']
})
export class ConcatmapComponent implements OnInit {

  constructor(private designUtilityService:DesignUtilityService) { }

  getData(data) {
    return of(data + ' Video Uploaded').pipe(delay(2000));
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
    
    //Ex - 02 Map + Concat All
    source.pipe(
      map(res => this.getData(res)),
      concatAll()
    )
    .subscribe(res => {
      //console.log(res);
      this.designUtilityService.print(res, 'elContainer2')
    }) 
    
     
    //Ex - 03 ConcatMap
    source.pipe(
      concatMap(res => this.getData(res))
    )
    .subscribe(res => {
      console.log(res);
      this.designUtilityService.print(res, 'elContainer3')
    }) 
     // Ex - 04 Map
     source.pipe(
      map(res => this.getData(res))
    )
    .subscribe(res => {
      //console.log(res);
      this.designUtilityService.print(res, 'elContainer1')
    })   

     //Ex - 05 MergeMap
     source.pipe(
      mergeMap(res => this.getData(res))
    )
    .subscribe(res => {
      //console.log(res);
      this.designUtilityService.print(res, 'elContainer5')
    }) 
    
     
    //Ex - 06 ConcatMap
    source.pipe(
      concatMap(res => this.getData(res))
    )
    .subscribe(res => {
      console.log(res);
      this.designUtilityService.print(res, 'elContainer6')
    })   
  }

}
