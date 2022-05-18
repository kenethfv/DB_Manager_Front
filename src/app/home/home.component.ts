import { Component, OnInit } from '@angular/core';
import { ConnectionPageComponent } from '../connection-page/connection-page.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[DialogService],
})
export class HomeComponent implements OnInit {

  ref?: DynamicDialogRef;

  lang = [
    { name: 5 },
    { name: 10 },
    { name: 15 },
  ];

  conexiones = [
    {
      esquema:"HR",
      usuario:"RRHH",
    },
    {
      esquema:"UMG",
      usuario:"RMaldonado",
    }
  ];

 primeraPagina = false;

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  formularioComponent(){
    this.ref = this.dialogService.open(ConnectionPageComponent, {
      header: 'Nueva conexión',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
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

}
