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
  fuinciona: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    private connectionService: ConnectionService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {

  }

  enviarFormulario() {
    let formulario: any = document.getElementById('crearConexiones');
    this.fuinciona = false;

    this.formLogin.host = this.formProperties.host;
    this.formLogin.user = this.formProperties.user;
    this.formLogin.password = this.formProperties.password;

    if (formulario.reportValidity()) {
      this.connectionService
        .login(this.formLogin)
        .subscribe((res: any) => this.finalizarGuardar(res));

      this.connectionService
        .guardarConexion(this.formProperties)
        .subscribe((res: any) => this.finalizarGuardarConexion(res));

      formulario.reset();
      this.formProperties = {};
      this.formLogin = {};
      this.fuinciona = true;
    }
  }

  finalizarGuardar(respuesta: any) {
    console.log(respuesta);
    if (respuesta.message == 'Connection Success') {
      this.irADashboard();
    } else if (!respuesta) {
      this.showDialog();
    }
  }

  finalizarGuardarConexion(respuesta: any) {

  }

  irADashboard() {
    location.href = '/dashboard';
  }

  showDialog() {
    this.display = true;
  }
}
