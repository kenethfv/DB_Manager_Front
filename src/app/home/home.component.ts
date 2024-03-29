import { Component, OnInit } from '@angular/core';
import { ConnectionPageComponent } from '../connection-page/connection-page.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConnectionService } from '../services/connection_service/connection.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class HomeComponent implements OnInit {
  ref?: DynamicDialogRef;

  lang = [{ name: 5 }, { name: 10 }, { name: 15 }];

  conexiones = [];
  conexion = {};
  display: boolean = false;

  primeraPagina: boolean = false;

  infoConexion: any = {};
  infoStorage: any = {};
  token: String = "";

  constructor(
    public dialogService: DialogService,
    private connectionService: ConnectionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerConexiones();
  }

  formularioComponent() {
    localStorage.removeItem("dataConection");
    this.ref = this.dialogService.open(ConnectionPageComponent, {
      header: 'Nueva conexión',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    // this.ref.onClose.subscribe((respuesta: any) => {
    //   if (respuesta) {
    //     // this.mostrarGuardarToast();
    //     // this.reset();
    //     // this.ngOnInit();
    //   }
    // });
  }

  obtenerConexiones() {
    this.connectionService
      .getConnections()
      .subscribe((res: any) => this.mostrarClientes(res));
  }

  mostrarClientes(clients: any) {
    console.log(clients);
    this.conexiones = clients.data;
  }

  flotanteConectar(data: any) {
    this.infoConexion.host = data.Host;
    this.infoConexion.user = data.User;
    this.infoConexion.password = data.Password;

    this.infoStorage.host = this.infoConexion.host;
    this.infoStorage.user = this.infoConexion.user;
    this.infoStorage.password = this.infoConexion.password;
    this.infoStorage.name = data.Name;
    this.grabar_localstorage(this.infoStorage);

    this.confirmationService.confirm({
      message: '¿Estas seguro de establecer conexión?',
      header: 'Confirmación de conexión',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ref = this.dialogService.open(ConnectionPageComponent, {
          header: 'Confirma conexión',
          width: '70%',
          contentStyle: { 'max-height': '500px', overflow: 'auto' },
          baseZIndex: 10000,
        });
        //enviarFormulario();
      },
      reject: () => { },
    });
  }

  enviarFormulario(info: any) {
    console.log(this.infoConexion);

    this.connectionService
      .login(this.infoConexion)
      .subscribe((res: any) => this.finalizarGuardar(res));

    this.infoConexion = {};
  }

  finalizarGuardar(respuesta: any) {
    console.log(respuesta);
    if (respuesta.message == 'Connection Success') {
      console.log(this.infoStorage);
      this.token = respuesta.signature;
      this.grabar_token(this.token);
      this.mostrarconexionExitosa();
      this.infoStorage = {};
      this.irADashboard();
    } else if (!respuesta) {
      this.mostrarErroconexion();
    }

  }

  irADashboard() {
    location.href = '/dashboard';
  }

  showDialog() {
    this.display = true;
  }

  mostrarconexionExitosa() {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Info',
      detail: 'Conexión correcta',
    });
  }
  mostrarEditarToast() {
    this.messageService.add({
      key: 'te',
      severity: 'warn',
      summary: 'Info',
      detail: 'Cliente editado correctamente',
    });
  }
  mostrarErroconexion() {
    this.messageService.add({
      key: 'td',
      severity: 'error',
      summary: 'Info',
      detail: 'Error de conexión, revisa tus credenciales',
    });
  }


  //USO DE LOCAL STORAGE

  grabar_localstorage(data: any) {
    localStorage.setItem('dataConection', JSON.stringify(data));
  }

  grabar_token(data: any) {
    localStorage.setItem('token', data);
  }
}
