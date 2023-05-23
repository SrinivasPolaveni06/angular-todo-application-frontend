import { AfterViewInit, Component, ViewChild, OnInit, Injectable, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TodoElement } from 'src/app/components/interfaces/todo-item';
import { TodoService } from 'src/app/services/todo.service';
import { Router } from '@angular/router';
import { MatSort, MatSortModule, MatSortHeader } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})



@Injectable()
export class HomeComponent implements OnInit {
  title = 'angular-app';
  fileName = 'ExcelSheet.xlsx';
  displayedColumns: string[] = ['id', 'title', 'target', 'completed', 'createdAt', 'updatedAt', 'Actions'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatSort) sort: any;
  // constructor(){
  //   this.paginator;
  // }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  todos: TodoElement[] = [];

  // productUnSelectedIcon = "favorite_outlined"
  constructor(private srv: TodoService, private router: Router, public dialog: MatDialog) {
    // this.srv.all().subscribe()
    // inseted of writing above line we put this line in our own custom functon "getAllProducts()"



  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: any): void {
    this.dialog.open(DialogAnimationsExampleDialog, {

      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id
      }
    });

    // dialog.afterClosed().subscribe(result=>{
    //   if (result.reload){
    //     this.getAllTodos()
    //   }
    // })


  }


  // onDelete(event:any,id:any){

  //   const verify=window.confirm("Are you sure you want to delete this todo..");
  //   if(verify){
  //     return this.srv.delete(id).subscribe(



  //       {
  //         next: (res:any) => {
  //           //console.log("i am executed on success");
  //           //console.log(res);
  //           this.getAllTodos();

  //         },
  //         error: (err:any) => {
  //           console.log(err)
  //         },
  //         complete: () => {
  //           //console.log("i am executed even after success or failure")
  //         }
  //       })
  //   }else{
  //     return
  //   }
  // }


  ngOnInit(): void {
    console.log("i am executed whenever the component initialise");
    this.getAllTodos() // this functon executed when ever the component initiated
  }
  ngAfterViewInit() {
    console.log("i am executed after home html component")
    this.dataSource.paginator = this.paginator;


  }
  getAllTodos() {
    return this.srv.all().subscribe(



      {
        next: (res: any) => {
          //console.log("i am executed on success");
          console.log(res);
          this.todos = res;
          this.srv.todosCount = res.length;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort;

        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          //console.log("i am executed even after success or failure")
        }
      }



    )
  }

  onEdit(event: any, element: any) {
    //console.log("hello")
    this.router.navigateByUrl(`/todo/` + element.id);
  }
  onDownload() {

    window.print();

  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.html',
  styleUrls: ['./dialog-animations-example-dialog.scss'],

})
export class DialogAnimationsExampleDialog implements OnInit {
  id: any = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, private srv: TodoService) { }
  //Id=this.homeComponent.id;
  ngOnInit(): void {
    this.id = this.data.id;
  }
  onDelete() {
    console.log("hello world" + this.id)
    //console.log(this.Id)
    return this.srv.delete(this.id).subscribe(



      {
        next: (res: any) => {
          //console.log("i am executed on success");
          console.log(res);
          this.dialogRef.close({ reload: true })
          window.location.reload();
        },
        error: (err: any) => {
          console.log(err)
        },
        complete: () => {
          //console.log("i am executed even after success or failure")
        }
      })
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
