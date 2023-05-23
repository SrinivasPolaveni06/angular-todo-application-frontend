import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  hideRequiredControl = new FormControl(false);
  Value1:boolean=false;
  todoForm = this.fb.group({
    title: ["", Validators.compose([Validators.required, Validators.minLength(3)])],
    // incomplete:["",Validators.compose([Validators.required])],
    // done:["",Validators.compose([Validators.required])],
    target: ["", Validators.compose([Validators.required])],
    completed: [this.Value1, Validators.compose([Validators.required])],
    createdAt:"",
    updatedAt:""
  })

  id:any="";
  
  Incompleted:boolean=true;
   Done1:boolean=false;

  constructor(private fb: FormBuilder,private srv: TodoService,private router: Router, private ar: ActivatedRoute){}

  submit(event: any) {
    event.preventDefault();
    // console.log("form is submitted");
    if (this.todoForm.invalid) {
      return
    }
    //console.log(this.todoForm.value);

    const formValues=this.todoForm.value

    const CreatedDate=moment().format("YYYY-MM-DD hh:mm:SS");

    const taergetDate=moment(formValues.target).format("YYYY-MM-DD hh:mm:SS");

    const finalData={
      ...formValues,target:taergetDate,createdAt:CreatedDate,updatedAt:CreatedDate
    }

    const editedData={
      ...formValues,target:taergetDate,updatedAt:CreatedDate
    }
    if (this.id) {
      this.srv.update(editedData, this.id).subscribe({
        next: (res:any) => {
          console.log(res);
          this.router.navigateByUrl('/')
        }
      })
      return
    }else{
     //console.log(finalData)
    this.srv.create(finalData).subscribe({
      next: (res) => {
        //console.log(res);
        alert("creating product")
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {
        //console.log("complete");
      }
    })
  }
    
  }

  get f(){
    return this.todoForm.controls;
  }
  changeGender(event:any) {
    this.Value1=event.value
    // console.log(this.todoForm.value);
    // console.log(typeof(event.value))
  }

  ngOnInit(): void {
    this.ar.params.subscribe((params: any) => {
      //console.log(params)

      if (params.id) {
        this.id = params.id
        this.getTodo()
      }

    })
    
  }
  getTodo(){
    this.srv.singleTodo(this.id).subscribe({
      next: (res:any) => {
        //console.log(res);
        
        const taergetDate=moment(res.target).format("YYYY-MM-DD");
        const updatedRes={...res,target:taergetDate}
        this.todoForm.patchValue(updatedRes)
        if(res.completed){
          this.Incompleted=false
          this.Done1=true
        }else{
          this.Done1=false
          this.Incompleted=true
        }
      }
    }
    )
  }
}
