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
  //selectedText: String = "";

  //objeto de local storage
  usuarioConectado: any = {};

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    //this.llenarTablas(this.tablas);
    this.llamarMetodo();
    DashboardComponent.selectableTextArea =
      document.querySelectorAll('#editor');

    DashboardComponent.selectableTextArea.forEach((element) => {
      element.addEventListener('mouseup', selectableTextAreaMouseUp);
    });

    function selectableTextAreaMouseUp() {
      let selectedText = window.getSelection()?.toString().trim();
      let addTextToResult: string = ((<HTMLInputElement>(
        document.getElementById('resultado')
      )).value = selectedText || '');
    }

    //
    this.obtener_localStorage();
  }

  limpiarEditor() {
    let limpiaTexto = ((<HTMLInputElement>(
      document.getElementById('editor')
    )).value = '');
  }

  limpiarResultado() {
    let claseError = document.querySelector('.error');
    let claseSuccess = document.querySelector('.success');
    const div = document.querySelector('#resultado');
    claseError?.remove();
    claseSuccess?.remove();
  }

  mostrarResultado() {
    const selectedText = window.getSelection()?.toString().trim();
    console.log('texto: ' + selectedText);
    const regSelect = /select [a-zA-Z1-9*=<>+^(),.%/ ]+\;/gi;
    const regDelete = /delete [a-zA-Z1-9*=<>+^(),.%/ ]+\;/gi;

    let queryObject: any = {};
    queryObject.host = this.host;
    queryObject.user = this.usuarioConectado.user;
    queryObject.password = this.usuarioConectado.password;
    queryObject.database = 'test';
    queryObject.query = selectedText;

    if (selectedText?.match(regSelect)) {
      //alert('running select script');
      this.dashboardService
        .dashboardQuery(queryObject)
        .subscribe((res: any) => this.respuestaQuery(res));
    } /*if (selectedText?.match(regDelete))*/ else {
      //alert('running delete script');
      this.dashboardService
        .dashboardQuery(queryObject)
        .subscribe((res: any) => this.resQuery(res));
    }

    /*let limpiaTexto = 'Answer from service will go here ';
      let agrega = ((<HTMLInputElement>document.getElementById('result')).value =
      limpiaTexto);*/
  }

  respuestaQuery(respuesta: any) {
    this.response = respuesta;
    this.data = this.response.data;
    console.log(this.data);
    this.queryInfo(this.data);
  }

  queryInfo(info: any) {
    console.log(info);
    const div = document.querySelector('#resultado');
    const tb = document.createElement('table');
    tb.className = 'success';
    const tr = document.createElement('tr');
    let objectProp = Object.keys(info[0]);

    objectProp.forEach((pr: any) => {
      let header = document.createElement('th');
      let headerText = document.createTextNode(pr);
      header.appendChild(headerText);
      tr.appendChild(header);
    });
    tb.appendChild(tr);

    info.forEach((arr: any, index: number) => {
      let objectValue = Object.values(info[index]);
      const tr2 = document.createElement('tr');
      objectValue.forEach((val: any) => {
        let header = document.createElement('td');
        let headerText = document.createTextNode(val);
        header.appendChild(headerText);
        tr2.appendChild(header);
      });
      tb.appendChild(tr2);
    });
    div?.appendChild(tb);
  }

  resQuery(respuesta: any) {
    this.response = respuesta;
    this.data = this.response.data;

    console.log(this.response);
    this.queryInfo2(this.response);
  }

  queryInfo2(info: any) {
    console.log(info);
    const status = info.statusCode;
    const data = info.data;
    const div = document.querySelector('#resultado');
    const p = document.createElement('p');
    let statusText = document.createTextNode(
      `Operacion exitosa => StatusCode: ${status}`
    );
    p.appendChild(statusText);
    p.className = 'success';
    for (let val in data) {
      let text = document.createTextNode(`${val}: ${data[val]}`);
      p.appendChild(text);
    }
    div?.appendChild(p);
  }

  llamarMetodo() {
    this.objeto.host = this.host;
    this.objeto.user = this.usuarioConectado.user;
    this.objeto.password = this.usuarioConectado.password;
    this.objeto.database = 'test';

    this.dashboardService
      .getTables(this.objeto)
      .subscribe((res: any) => this.finalizarGuardar(res));
  }

  finalizarGuardar(respuesta: any) {
    this.response = respuesta;
    this.data = this.response.data;
    console.log(this.response);
    console.log(this.data);
    this.llenarTablas(this.data);
  }

  llenarTablas(tb: any) {
    let claseTabla = document.querySelector('.lista-tablas');
    claseTabla?.remove();
    const div = document.querySelector('#aside');
    const lista = document.createElement('ul');
    lista.className = 'lista-tablas';
    tb.forEach((object: any) => {
      for (let value in object) {
        console.log(object[value]);
        let line = document.createElement('li');
        let textLine = document.createTextNode(object[value]);
        line.appendChild(textLine);
        lista.appendChild(line);
      }
    });

    div?.appendChild(lista);
  }

  //OBTENER INFO DE USUARIO CONECTADO DE
  obtener_localStorage() {
    this.usuarioConectado = JSON.parse(localStorage.getItem('dataConection')!);
    console.log("EL USUARIO LOGUEADO ES:");
    console.log(this.usuarioConectado);
  }
}
