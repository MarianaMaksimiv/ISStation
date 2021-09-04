import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssPageComponent } from './pages/iss-page/iss-page.component';

const routes: Routes = [
  {path: '', component: IssPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssInfoRoutingModule { }
