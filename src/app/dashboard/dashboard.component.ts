import { BindingScope } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  static selectableTextArea: NodeListOf<Element>;
  
  limpiarEditor(){
    let limpiaTexto = (<HTMLInputElement>document.getElementById('editor')).value = "";
  }

  limpiarResultado(){
    let limpiaTexto = (<HTMLInputElement>document.getElementById('result')).value = "";
  }

  agregaTexto(){
    let limpiaTexto = "Answer from service will go here "
    let agrega = (<HTMLInputElement>document.getElementById('result')).value = limpiaTexto;

    const selectedText = window.getSelection()?.toString().trim();
    const regSelect = /select [a-zA-Z1-9*=<>+^(),.%/ ]+\;/gi;
    const regDelete = /delete [a-zA-Z1-9*=<>+^(),.%/ ]+\;/gi;

    if(selectedText?.match(regSelect)){
      alert("running select script")
    } else if (selectedText?.match(regDelete)){
      alert("running delete script")
    }

    
  }
  

  constructor() { 
    
  }

  ngOnInit(): void {

    DashboardComponent.selectableTextArea = document.querySelectorAll('#editor');
  
    DashboardComponent.selectableTextArea.forEach(element => {
      element.addEventListener("mouseup", selectableTextAreaMouseUp);
    });

    function selectableTextAreaMouseUp(){
      const selectedText = window.getSelection()?.toString().trim();
      console.log(selectedText);
      let addTextToResult:string = (<HTMLInputElement>document.getElementById('resultado')).value = selectedText || "";
      
    }

    
  }

  

}
