import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
//import {ScheduleModule} from 'primeng/primeng';
import {ApiService} from '../services/api.service'
import * as jsPDF from 'jspdf'
import {Event} from '../_models/event'
import {URLS} from '../_models/urls'




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarioComponent implements OnInit {
  @ViewChild('toPDF') el: ElementRef;
    @Input() events: Event[];
  constructor(private api:ApiService) { }

  ngOnInit() {
    console.log('init calendar, nothing to do',this.events)
  }

downloadPdf(){
        let pdf = new jsPDF();
        let options = {
            pagesplit: false
        };
        pdf.addHTML(this.el.nativeElement, 15, 30, options, () => {
            //pdf.addPage();
                pdf.save("calendar.pdf");
        });
}

}
