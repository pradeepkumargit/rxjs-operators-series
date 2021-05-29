import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {

  constructor() { }

  dellAvaiable() {
   return false;
  }

  hpAvailable() {
   return false;
  }

  promiseVal:any;

  dell = {
    brand:'Dell',
    HardDisk:'2 TB',
    color:'Black'
  }

  hp = {
    brand:'Hp',
    HardDisk:'1 TB',
    color:'White'
  }

  notAvai = {
    brand:'Not Available',
    status:'Failed'
  }

  ngOnInit(): void {
    let buyLaptop = new Promise( (resolve,reject) => {
      //resolve('Promise is resolved');
      //reject('Promise is Reject')
      if (this.dellAvaiable()) {
        return setTimeout(()=>{
          //resolve('Dell is purchased');
          resolve(this.dell);
        },3000)       
      } else if(this.hpAvailable()){
        return setTimeout(() => {
          //resolve('Hp is purchased');
          resolve(this.hp);
        },3000)        
      } else {
        return setTimeout(() => {
          //reject('Laptop in not available in store');
          reject(this.notAvai);
        },3000)       
      }
    })

    buyLaptop.then( res => {     
      this.promiseVal = res;
      console.log('then code =>', res);
    }).catch(res => {
      this.promiseVal = res;
      console.log('catch code =>', res);
    })

  }
}
