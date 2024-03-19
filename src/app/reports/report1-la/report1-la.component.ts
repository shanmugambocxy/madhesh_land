import { Component, OnInit } from '@angular/core';
import { LanddataService } from '../../land/landdata.service';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report1-la',
  templateUrl: './report1-la.component.html',
  styleUrls: ['./report1-la.component.css']
})
export class Report1LAComponent implements OnInit {

  alldata : any[] = [];
  reportdata : any[] = [];


  constructor(private landdataService: LanddataService) { }

  ngOnInit(): void {
    this.landdataService.getDataforDivcircity().subscribe(data => {
      this.alldata = data;
      const divisionname =  this.alldata.map(s => s.division)
      const uniquedivision =[...new Set(divisionname)];
    this.landdataService.getdataforreport1().subscribe(data => {
      interface ReportItem {division: string;}
      this.reportdata = data.filter((item: ReportItem) => uniquedivision.includes(item.division));
      console.log(this.reportdata)
    });
  });
  }
  downloadExcel() {
    /* create worksheet */
    const ws = XLSX.utils.table_to_sheet(document.getElementById('tableId'));

    /* create workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'LandAcquired Report.xlsx');
  }
}
