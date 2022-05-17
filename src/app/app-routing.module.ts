import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnectionPageComponent } from './connection-page/connection-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connection', component:ConnectionPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
