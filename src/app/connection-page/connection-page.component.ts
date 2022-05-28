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

  constructor(
    public ref: DynamicDialogRef,
    private connectionService: ConnectionService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {}

  enviarFormulario() {
    let formulario: any = document.getElementById('crearConexiones');
    this.funciona = false;

    this.formLogin.host = this.formProperties.host;
    this.formLogin.user = this.formProperties.user;
    this.formLogin.password = this.formProperties.password;

    if (formulario.reportValidity()) {
      this.connectionService
        .login(this.formLogin)
        .subscribe((res: any) => this.finalizarGuardar(res));

      formulario.reset();

      this.formLogin = {};
      this.funciona = true;
    }
  }

  finalizarGuardar(respuesta: any) {
    console.log(respuesta);
    if (respuesta.message == 'Connection Success') {
      this.connectionService
        .guardarConexion(this.formProperties)
        .subscribe((res: any) => this.finalizarGuardarConexion(res));
      this.irADashboard();
    }

    if ((this.funciona = false)) {
      this.showDialog();
    }
  }

  finalizarGuardarConexion(respuesta: any) {
    this.grabar_localstorage(this.formProperties);
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
}
