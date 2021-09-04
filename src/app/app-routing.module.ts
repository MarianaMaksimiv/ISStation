import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'iss-page', pathMatch: 'full'},
  {path: 'iss-page', loadChildren: () => import('./iss-info/iss-info.module').then(m => m.IssInfoModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
