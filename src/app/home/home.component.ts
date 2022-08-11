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
  display: boolean = false;

  primeraPagina: boolean = false;

  infoConexion: any = {};
  infoStorage: any = {};

  constructor(
    public dialogService: DialogService,
    private connectionService: ConnectionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerConexiones();
  }

  formularioComponent() {
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
    this.confirmationService.confirm({
      message: '¿Estas seguro de establecer conexión?',
      header: 'Confirmación de conexión',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.enviarFormulario(data);
      },
      reject: () => {},
    });
  }

  enviarFormulario(info: any) {
    this.infoConexion.host = info.Host ;
    this.infoConexion.user = info.User;
    this.infoConexion.password = info.Password;

    this.infoStorage.host = this.infoConexion.host;
    this.infoStorage.user = this.infoConexion.user;
    this.infoStorage.password = this.infoConexion.password;
    this.infoStorage.name = info.Name;

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
      this.grabar_localstorage(this.infoStorage);
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
}
