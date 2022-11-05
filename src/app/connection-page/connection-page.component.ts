import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConnectionService } from '../services/connection_service/connection.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-connection-page',
  templateUrl: './connection-page.component.html',
  styleUrls: ['./connection-page.component.scss'],
})
export class ConnectionPageComponent implements OnInit {
  formProperties: any = {};
  formLogin: any = {};
  display: boolean = false;
  funciona: boolean = false;
  token: string = "";
  grabarConexion: boolean = true;

  constructor(
    public ref: DynamicDialogRef,
    private connectionService: ConnectionService,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    let json: any = JSON.parse(localStorage.getItem("dataConection")!);
    if (json != null) {
      this.formProperties = json;
      this.formProperties.password = "";
      this.grabarConexion = false;
    }
    console.log("INICIO DE LA PAGINA FLOTANTE");
    console.log(this.formProperties);
  }

  enviarFormulario() {

    let formulario: any = document.getElementById('crearConexiones');

    this.formLogin.host = this.formProperties.host;
    this.formLogin.user = this.formProperties.user;
    this.formLogin.password = this.formProperties.password;

    if (formulario.reportValidity()) {
      this.connectionService
        .login(this.formLogin)
        .subscribe((res: any) => this.finalizarGuardar(res));
      console.log("SE CONSUMIÓ EL LOGIN");


      setTimeout( () => {
        if (this.funciona) {
          formulario.reset();
          this.formLogin = {};
        } else { this.showDialog(); }
      }, 2000);

    }
  }

  finalizarGuardar(respuesta: any) {
    this.funciona = true;
    console.log("RESPUESTA DE LOGIN:");
    console.log(respuesta);
    if (respuesta.message == 'Connection Success') {
      this.grabar_localstorage(this.formProperties);
      this.token = respuesta.signature;
      this.grabar_token(this.token);
      if (this.grabarConexion) {
        this.connectionService
          .guardarConexion(this.formProperties, this.token)
          .subscribe((res: any) => this.finalizarGuardarConexion(res));
      }
      this.irADashboard();
    }
  }

  finalizarGuardarConexion(respuesta: any) {
    console.log(this.formProperties);
    this.formProperties = {};
  }

  irADashboard() {
    location.href = '/dashboard';
  }

  showDialog() {
    this.display = true;
  }


  grabar_localstorage(data: any) {
    localStorage.setItem('dataConection', JSON.stringify(data));
  }

  grabar_token(data: any) {
    localStorage.setItem('token', data);
  }
}
