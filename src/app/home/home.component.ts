import { Component, OnInit } from '@angular/core';
import { ConnectionPageComponent } from '../connection-page/connection-page.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConnectionService } from '../services/connection_service/connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService],
})
export class HomeComponent implements OnInit {
  ref?: DynamicDialogRef;

  lang = [{ name: 5 }, { name: 10 }, { name: 15 }];

  conexiones = [];

  primeraPagina = false;

  constructor(
    public dialogService: DialogService,
    private connectionService: ConnectionService
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

    this.ref.onClose.subscribe((respuesta: any) => {
      if (respuesta) {
        // this.mostrarGuardarToast();
        // this.reset();
        // this.ngOnInit();
      }
    });
  }

  obtenerConexiones() {
    this.connectionService
      .getConnections()
      .subscribe((res: any) => this.mostrarClientes(res));
  }

  mostrarClientes(clients: any) {
    console.log(clients.data);
    this.conexiones = clients.data;
  }
}
