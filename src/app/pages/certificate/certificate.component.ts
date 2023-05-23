import { Component } from '@angular/core';
import * as moment from 'moment';
import { Practice } from 'src/app/components/interfaces/todo-item';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  Person:Practice={
   
    "title":"Srinivas",
    lastname:"Polaveni",
    gender:"Male",
    feild:"Software Developer",
    head:"Anji Naidu",
    mentor:"Amrithraj",
    date:new Date()
  }
 
   // Date:any=moment(this.Person.date).format("DD-MM-YYYY");
   onDownload(){
     if(!this.Person.title || !this.Person.lastname || !this.Person.gender || !this.Person.feild || !this.Person.head || !this.Person.mentor || !this.Person.date ){
       return
     }else{
       window.print();
     }
   }
}
