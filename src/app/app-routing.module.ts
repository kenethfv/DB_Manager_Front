import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnectionPageComponent } from './connection-page/connection-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './utility/app.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'connection', component: ConnectionPageComponent, },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
