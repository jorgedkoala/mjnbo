import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import {Event} from '../_models/event'
import {GlobalsService} from '..//services/globals.service'
import * as jsPDF from 'jspdf'
import * as moment from 'moment'
//declare let jsPDF;


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit, OnChanges {
    @ViewChild('toPDF') el: ElementRef;
    @Input() events: Event[];
    //@Input() fechas: object;
    public data: any;
    msgs: any[];
    public dataTotal:number[]=[];
    public dataFuertes:number[]=[];
    public dataMedia:number[]=[];
    public dataSuaves:number[]=[];
    public labels:number[]=[];
  constructor(public globals: GlobalsService) {
      console.log('constructor graficos');
   }

ngOnChanges(){
          
          if (this.events.length){
        console.log('change graficos');
        this.setLabels();
        this.fillData();
        
        this.setData();
          }
}
  ngOnInit() {
    //  console.log('init graficos');
    //    this.fillData();
    //    this.setData();

    //     for (let x=0;x<moment().weeksInYear();x++){
    //     this.dataTotal.push(0);
    //     this.dataSuaves.push(0);
    //     this.dataMedia.push(0);
    //     this.dataFuertes.push(0);
    //     this.labels.push(x);
    // }
  }

  setData(){

            this.data = {
            labels: this.labels,
            datasets: [
                {
                    label: 'Total,',
                    data: this.dataTotal,
                    fill: true,
                    borderColor: 'black',
                    backgroundColor: "rgba(192,192,192,0.4)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 3,
                    pointHoverRadius: 8,
                    lineTension: 0.5,
                },
                {
                    label: 'Fuertes',
                    data: this.dataFuertes,
                    fill: true,
                    borderColor: '#ff0000',
                    backgroundColor: "rgba(192,0,0,0.2)",
                    pointBorderColor: '#ff0000',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 3,
                    pointHoverRadius: 8,
                    hidden:true,
                },
                {
                    label: 'Media',
                    data: this.dataMedia,
                    fill: true,
                    borderColor: 'orange',
                    backgroundColor: "rgba(192,99,0,0.2)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 3,
                    pointHoverRadius: 8,
                    hidden:true,                    
                },
                {
                    label: 'Suave',
                    data: this.dataSuaves,
                    fill: true,
                    borderColor: 'yellow',
                    backgroundColor: "rgba(192,192,0,0.4)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 3,
                    pointHoverRadius: 8,
                    hidden:true,                    
                }
            ]
        }
        console.log('end set data');
  }
    selectData(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    }
setLabels(){
        this.dataTotal=[];
        this.dataSuaves=[];
        this.dataMedia=[];
        this.dataFuertes=[];
        this.labels=[];
      for (let x=moment(this.globals.fechas['inicio']).week();x<moment(this.globals.fechas['fin']).week();x++){
        this.dataTotal.push(0);
        this.dataSuaves.push(0);
        this.dataMedia.push(0);
        this.dataFuertes.push(0);
        this.labels.push(x);
    } 
    console.log('end labels');
}
fillData(){
    
    this.events.forEach((evento)=>{
      let week =   moment(new Date(evento.start)).week()-moment(this.globals.fechas['inicio']).week();
      this.dataTotal[week]++;
      console.log(week);
      switch(evento.intensidad.toString()){
          case "1":
          this.dataSuaves[week]++;
          break;
          case "2":
          this.dataMedia[week]++;
          break;
          case "3":
          this.dataFuertes[week]++;
          break;
      }

    })
     console.log('end fill data',this.dataTotal);
}

downloadPdf(){
        let pdf = new jsPDF({orientation: 'landscape'});
        let options = {
            pagesplit: false
        };
        pdf.addHTML(this.el.nativeElement, 15, 30, options, () => {
           // pdf.addPage();
                pdf.save("grafico.pdf");
        });
        
}
}
