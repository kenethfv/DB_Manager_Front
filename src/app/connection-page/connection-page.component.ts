import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-connection-page',
  templateUrl: './connection-page.component.html',
  styleUrls: ['./connection-page.component.scss'],
})
export class ConnectionPageComponent implements OnInit {
  formProperties: any = {};

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit(): void {}

  enviarFormulario() {}
}
