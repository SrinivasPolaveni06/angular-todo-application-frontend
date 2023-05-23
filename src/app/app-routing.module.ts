import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TodoComponent } from './pages/todo/todo.component';
import { FormComponent } from './pages/form/form.component';
import { CertificateComponent } from './pages/certificate/certificate.component';

const routes: Routes = [
  {
  path:'',
  component:HomeComponent
},
{
  path:'todo',
  component:TodoComponent
},
{
  path:'todo/:id',
  component:TodoComponent
}, 
{
  path:"form",
  component:FormComponent
},
{
  path:"certificate",
  component:CertificateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
