import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, concatMap, take } from 'rxjs/operators';
import { forkJoin, of} from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { extend } from 'webdriver-js-extender';

@Component({
  selector: 'app-handle-multiple-http-requests',
  templateUrl: './handle-multiple-http-requests.component.html',
  styleUrls: ['./handle-multiple-http-requests.component.scss']
})
export class HandleMultipleHttpRequestsComponent implements OnInit {

  userName;
  posts;
  albums;
  user;
  constructor(private httpClient: HttpClient) { 
    this.posts = [];
    this.albums = [];
    this.userName = 'Prdaeep'
  }


  ngOnInit(): void {
    //this.getDataByUsingNestedSubscribe();
    //this.getDataByUsingMergeMap();
    //this.getDataByUsingConcatMap()
    //this.getDataByUsingForkJoin();
    this.combine2Techniques()
  }

  /**
   * Getting data using nested Subscription
   */
  getDataByUsingNestedSubscribe() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users?username=Bret')
    .pipe(map(users => users[0]))
    .subscribe(user => {
      this.userName = user.username;

      // get Posts Data
      this.httpClient.get(`https://jsonplaceholder.typicode.com/posts?userid=${user.id}`)
      .subscribe( posts => {
        this.posts = posts;
        console.log('All Posts',this.posts);
      })
      // get Albums Data
      this.httpClient.get(`https://jsonplaceholder.typicode.com/albums?userid=${user.id}`)
      .subscribe( albums => {
        this.albums = albums;
        console.log('All Albums',this.albums);
      })
    })
  }

  /**
   * Getting data using mergeMap - both call going on the same time
   * User case 
   * Based on the user id - got from first api call
   * Getting the all the post data
   */
  getDataByUsingMergeMap() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users?username=Bret').pipe(
      map(users => {
        const user  = users[0];
        this.userName = user.username;       
        return user;
        }
      ),
      mergeMap(user => this.httpClient.get(`https://jsonplaceholder.typicode.com/posts?userid=${user.id}`)),
      take(1)
    ).subscribe( posts => {
      this.posts = posts;
      console.log('MergeMap Post',posts);
    });   
  }

  /**
   * Getting data using concat Map
   * User case 
   * Based on the user id - got from first api call
   * Getting the all the post data
   */
  getDataByUsingConcatMap() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users?username=Bret').pipe(
      map(users => {
        const user  = users[0];
        this.userName = user.username;       
        return user;
        }
      ),
      concatMap(user => this.httpClient.get(`https://jsonplaceholder.typicode.com/posts?userid=${user.id}`)),
      take(1)
    ).subscribe( posts => {
      this.posts = posts;
      console.log('MergeMap Post',posts);
    });   
  }

  /**
   * Getting data using ForkJoin, Merging two API's(posts, albums) response into single API response
   */
  getDataByUsingForkJoin() {
    const posts =  this.httpClient.get(`https://jsonplaceholder.typicode.com/posts?userid=1`);
    const albums =  this.httpClient.get(`https://jsonplaceholder.typicode.com/albums?userid=1`);
    forkJoin([posts,albums]).subscribe(
      result => {
        console.log('forkjoin Result',result);
        this.posts = result[0];
        console.log('All Posts using ForkJoin',this.posts);
        this.albums = result[1];
        console.log('All Albums using ForkJoin',this.albums);
      }
    )
  }

  /**
   * Method to combine - MergeMap and ForkJoin
   */
  combine2Techniques() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users?username=Bret').pipe(
      map( users => {
        const user = users[0];
        this.userName = user.username;
        return user;
      }),
      mergeMap( user => {
        const posts = this.httpClient.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const albums = this.httpClient.get(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);

        return forkJoin([posts, albums, of(user)]);
      }),
      take(1)
    ).subscribe( result => {
        console.log('after merge of three API data using mergemap and forkjoin', result);
        this.posts = result[0];
        this.albums = result[1];
        this.user = result[2]
    });
  }
}

//  Inheritance using interface in typescript
//************************* */

interface LibraryResource {
  catelogNumber: number
}
interface Book {
  title: string
}

interface Encylopedia extends LibraryResource, Book  {
  volume : number
}

let refBook: Encylopedia = {
  catelogNumber: 123,
  title: 'The book of Everthing',
  volume: 1
}
console.log('refBook',refBook);

interface Person {
  name: string,
  email: string
}

interface Author extends Person {
  numBookPublished: number;
}

interface Librarian extends Person {
  department: string,
  assistCustomer: (custName:string) => void;
}

// let favouriteAuthor: Author = {}
// let favoriteLibrarianAuthor : Librarian = {}

// interface Librarian {
//   doWork: () =>  void
// }

class ElementrySchoolLibrarian implements Librarian {  
  name: string;
  email: string;
  department: string;
  assistCustomer(custName:string) {
    console.log(this.name + ' is assisting ' + custName);
  }
  doWork() {
    console.log('Reading to and teaching children..');
  }
}

let kidsLibrarian  = new ElementrySchoolLibrarian();
kidsLibrarian.doWork(); 

class UniversityLibrarian implements Librarian {
  name: string;
  email: string;
  department: string;
  assistCustomer(custName:string) {
    console.log(this.name + ' is assisting ' + custName);
  }
}
let favoriteLibrarian: Librarian  = new UniversityLibrarian();
favoriteLibrarian.name = 'Pradeep';
favoriteLibrarian.assistCustomer('Abhi');
//console.log('favoriteLibrarian',favoriteLibrarian);

// Mixins in TypeScript

