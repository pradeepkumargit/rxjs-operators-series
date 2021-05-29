import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DesignUtilityService } from 'src/app/appServices/design-utility.service';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent implements OnInit, AfterViewInit{

  constructor(private designUtilityService:DesignUtilityService) { }
  
  @ViewChild('addBtn') addBtn:ElementRef;

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    let count = 1;
    fromEvent(this.addBtn.nativeElement, 'click').subscribe(res => {
      let countVal = 'Video' + count++;
      console.log(countVal);
      this.designUtilityService.print(countVal,'elContainer');
      this.designUtilityService.print(countVal,'elContainer2');
    })
  }
}
