import { BindingScope } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tablas: any = ['empleados', 'puestos', 'departamentos'];

  objeto: any = {};
  response: any = {};
  data: any = [];

  host: String = 'db-manager-umg.cusjupztirzz.us-east-1.rds.amazonaws.com';

  static selectableTextArea: NodeListOf<Element>;

  limpiarEditor() {
    let limpiaTexto = ((<HTMLInputElement>(
      document.getElementById('editor')
    )).value = '');
  }

  limpiarResultado() {
    let limpiaTexto = ((<HTMLInputElement>(
      document.getElementById('result')
    )).value = '');
  }

  agregaTexto() {
    let limpiaTexto = 'Answer from service will go here ';
    let agrega = ((<HTMLInputElement>document.getElementById('result')).value =
      limpiaTexto);

    const selectedText = window.getSelection()?.toString().trim();
    const regSelect = /select [a-zA-Z1-9*=<>+^(),.%/ ]+\;/gi;
    const regDelete = /delete [a-zA-Z1-9*=<>+^(),.%/ ]+\;/gi;

    if (selectedText?.match(regSelect)) {
      alert('running select script');
    } else if (selectedText?.match(regDelete)) {
      alert('running delete script');
    }

    //const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      this.tablas.push(selectedText);
      console.log(this.tablas);
    }
  }

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    DashboardComponent.selectableTextArea =
      document.querySelectorAll('#editor');

    DashboardComponent.selectableTextArea.forEach((element) => {
      element.addEventListener('mouseup', selectableTextAreaMouseUp);
    });

    function selectableTextAreaMouseUp() {
      const selectedText = window.getSelection()?.toString().trim();
      console.log(selectedText);
      let addTextToResult: string = ((<HTMLInputElement>(
        document.getElementById('resultado')
      )).value = selectedText || '');
    }
  }

  llamarMetodo() {
    this.objeto.host = this.host;
    this.objeto.user = 'admin';
    this.objeto.password = 'd2cany8bdwypjtACDvaq';
    this.objeto.database = 'test';

    this.dashboardService
      .getTables(this.objeto)
      .subscribe((res: any) => this.finalizarGuardar(res));

      // this.dashboardService
      // .cualquiercosa(this.objeto)
      // .subscribe((res: any) => this.finalizarGuardar(res));
  }

  finalizarGuardar(respuesta: any) {
    this.response = respuesta;

    this.data = this.response.data;

    console.log(this.data[1].table);
  }
}
