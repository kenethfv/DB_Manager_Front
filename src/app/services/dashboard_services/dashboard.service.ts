import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient/*, private DashboardComponent: DashboardComponent*/) {}

  //
  private consumirGet(url: string): Observable<any> {
    return this.http
      .get<any>(environment.urlService + url)
      .pipe(catchError((e) => this.manejarError(e)));
  }
  //

  private consumirPost(url: string, parametro: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
 
    return this.http
      .post<any>(environment.urlService + url, parametro, httpOptions,)
      .pipe(catchError((e) => this.manejarError(e)));
  }

  private manejarError(e: any) {
    console.log(e);
    console.log(e.error.message);
    //this.DashboardComponent.queryInfo2(e.error.message)
    const error = e.error.message;
    const div = document.querySelector('#resultado');
    const p = document.createElement('p');
    p.className = "error";
    for(let val in error){
      let text = document.createTextNode(`${val}: ${error[val]}`)
      p.appendChild(text)
    }
    div?.appendChild(p);
    return throwError('Ha ocurrido un error');
  }

  getTables(data: any) {
    return this.consumirPost('/tables', data);
  }

  dashboardQuery(data: any) {
    return this.consumirPost('/querys', data);
  }


  getDatabases(data: any) {
    return this.consumirPost('/database', data);
  }

}
