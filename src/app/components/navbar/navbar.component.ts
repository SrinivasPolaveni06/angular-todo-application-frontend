import { Component } from '@angular/core';
import { ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
//import { FormComponent } from 'src/app/pages/form/form.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    console.log("i am executed whenever the component initialise");
    //this.getAllTodos() // this functon executed when ever the component initiated
  }
  //todos:any=[]
  // constructor(public srv: TodoService,   private router:Router,private FormComponent:FormComponent) {
    // this.srv.all().subscribe()
    // inseted of writing above line we put this line in our own custom functon "getAllProducts()"
    constructor(public srv: TodoService,   private router:Router) {


  }
  // ngAfterViewInit() {
  //   console.log("i am executed after home html component")
  //   this.getAllTodos();
  // }
  // getAllTodos() {
  //   return this.srv.all().subscribe(



  //     {
  //       next: (res:any) => {
  //         //console.log("i am executed on success");
  //         //console.log(res);
  //         this.todos = res;
  //         console.log(this.todos.length)

  //       },
  //       error: (err) => {
  //         console.log(err)
  //       },
  //       complete: () => {
  //         //console.log("i am executed even after success or failure")
  //       }
  //     }



  //   )
  // }
}
