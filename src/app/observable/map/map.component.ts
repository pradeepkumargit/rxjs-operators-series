import { Component, OnInit } from '@angular/core';
import { interval, Subscription, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  msg1;
  msg2;

  constructor(private designUtilityService:DesignUtilityService) { }

  ngOnInit(): void {
    // Ex -01
    const broadCastVideo = interval(1000);
    this.sub1 = broadCastVideo.pipe(
      map(data => 'Video ' + data)
    ).subscribe(res => {
      this.msg1 = res;
    })

    setTimeout(() => {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
      this.sub3.unsubscribe();
    },10000)

     // Ex -02
     this.sub2 = broadCastVideo.pipe(
       map(data => 'Multiply ' + data * 10)
     ).subscribe(res => {
       this.msg2 = res;
     })

     // Ex -03
     const members = from([
       {id:1,name:'Pradeep'},
       {id:2,name:'Neha'},
       {id:3,name:'Noopur'},
       {id:4,name:'Harshit'}
     ]);


     this.sub3 = members.pipe(
       map(data => data.name)
     ).subscribe(res => {
       this.designUtilityService.print(res,'elContainer')
       console.log(res)
     })
  }

}
