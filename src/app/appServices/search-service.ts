import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Search } from '../appInterface/search.interface';


@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {}

  url: string = "http://my-json-server.typicode.com/Uxtrendz/apis/videoList";

  getSearches(searchTerm):Observable<Search> {
    return this.httpClient.get<Search>(this.url+'?q='+searchTerm);
  }
}