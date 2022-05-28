import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  private consumirGet(url: string): Observable<any> {
    return this.http
      .get<any>(`https://gcccnx9do8.execute-api.us-east-1.amazonaws.com/prod${url}`)
      .pipe(catchError((e) => this.manejarError(e)));
  }

  private consumirPost(url: string, parametro: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(`https://gcccnx9do8.execute-api.us-east-1.amazonaws.com/prod${url}`, parametro, httpOptions)
      .pipe(catchError((e) => this.manejarError(e)));
  }

  private manejarError(e: any) {
    console.log(e);
    return throwError('Ha ocurrido un error');
  }

  getConnections() {
    return this.consumirGet('/connections');
  }

  login(data: any) {
    return this.consumirPost('/login', data);
  }

  guardarConexion(data: any) {
    return this.consumirPost('/connections', data);
  }

}
