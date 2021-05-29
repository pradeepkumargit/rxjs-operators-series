import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  pluck,
  concatMap,
  filter
} from "rxjs/operators";
import { SearchService } from 'src/app/appServices/search-service';
import { Search } from 'src/app/appInterface/search.interface';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements AfterViewInit{

 //http://my-json-server.typicode.com/Uxtrendz/apis/videoList
 
  @ViewChild('searchForm') searchForm: NgForm;
  searchResults:Search;
  searchResultsCount:number;

  constructor(private searchService:SearchService) { }

  ngAfterViewInit(): void {
    const formValue  = this.searchForm.valueChanges;
    formValue.pipe(
     //map( data => data['searchTerm'])
      filter(() => this.searchForm.valid),
      pluck('searchTerm'),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(data => this.searchService.getSearches(data))
    ).
    subscribe(res => {
      this.searchResults = res;
      console.log( this.searchResults);
      this.searchResultsCount =  Object.keys(res).length
    })
  }
}
