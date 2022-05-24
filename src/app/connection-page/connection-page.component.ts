import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConnectionService } from '../services/connection_service/connection.service';

@Component({
  selector: 'app-connection-page',
  templateUrl: './connection-page.component.html',
  styleUrls: ['./connection-page.component.scss'],
})
export class ConnectionPageComponent implements OnInit {
  formProperties: any = {};
  formLogin: any = {};

  constructor(
    public ref: DynamicDialogRef,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {}

  enviarFormulario() {
    let formulario: any = document.getElementById('crearConexion');

    this.formLogin.host = this.formProperties.host;
    this.formLogin.user = this.formProperties.user;
    this.formLogin.password = this.formProperties.password;


    console.log(this.formLogin);

    this.connectionService
      .login(this.formLogin)
      .subscribe((res: any) => this.finalizarGuardar(res));
    //this.mostrarEditarToast();
    formulario.reset();
    this.formProperties = {};
    // this.mostrarFormulario = false;
    // this.reset();
    // this.mostrarBotonNuevo = true;
  }

  finalizarGuardar(respuesta: any) {
    console.log(respuesta);
  }
}
