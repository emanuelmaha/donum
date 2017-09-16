import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../../../../_models';
import { CompleterService, CompleterData } from 'ng2-completer';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']

})
export class ReportsComponent {
  dataService: CompleterData;
  loading: boolean;
  members = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.members, 'color', 'color');
  }

  report(type: string) {
   // this.loading = true;
   var doc = new jsPDF();
   doc.text(20, 20, 'Hello world!');
   doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
   doc.addPage();
   doc.text(20, 20, 'Do you like that?');

   // Save the PDF
   doc.save('Test.pdf');
  }
}
