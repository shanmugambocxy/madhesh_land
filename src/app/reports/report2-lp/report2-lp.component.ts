import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
interface Table2Data {
  division: string;
  village: string;
  lps: string;
  fourOne: string;
  sixDD: string;
  award: string;
  lpsAcres: number;
  fourAcres: number;
  sixAcres: number;
  awardAcres: number;
  possissiontakenOver: number;
  possiosionNotTakenOver: number;
}

interface Table2NewData {
  lps_village: string;
  four_one_village: string;
  sixdd_village: string;
  award_village: string;
  v_NAME_OF_DIVISION: string;
  v_NAME_OF_SCHEME: string;
  n_UNIQUE_ID: string;
}


@Component({
  selector: 'app-report2-lp',
  templateUrl: './report2-lp.component.html',
  styleUrls: ['./report2-lp.component.css']
})
export class Report2LPComponent implements OnInit {

  table2dataSource: MatTableDataSource<Table2Data>;
  table2Columns: string[] = ['division', 'village', 'lps', 'lps_acres', 'fourOne', 'fourOne_acres', 'sixDD', 'sixDD_acres', 'award', 'award_acres', 'possessTaken', 'possessNotTaken']
  table2NewColumns: string[] = ['n_UNIQUE_ID', 'v_NAME_OF_SCHEME', 'division', 'lps_village', 'four_one_village', 'sixdd_village', 'award_village'];

  divisionSelect = new FormControl('');
  divisionSelectList: string[] = ['All'];
  villageSelect = new FormControl('');
  villageSelectList: string[] = ['All'];
  filteredData: any[] = [];
  accesslevel1: string;
  group_name: string;
  lpsAcres = false;
  fourAcres = false;
  sixddAcres = false;
  awardAcres = false;
  disable = true;
  total_LPS: number = 0;
  total_LPS_Acres: number = 0;
  total_4_1: number = 0;
  total_4_1_Acres: number = 0;
  total_6DD: number = 0;
  total_6DD_Acres: number = 0;
  total_Award: number = 0;
  total_Award_Acres: number = 0;
  total_PTO_Acres: number = 0;
  total_PNTO_Acres: number = 0;








  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.accesslevel1 = sessionStorage.getItem('accesslevel1');
    this.group_name = sessionStorage.getItem('group_name');
    this.divisionSelect.setValue('All');
    this.villageSelect.setValue('All');
    this.fetchDataFromAPI(this.accesslevel1, this.group_name);
    this.fetchNewDataFromAPI(this.accesslevel1, this.group_name);

  }

  generatePDF() {
    const pdf = new jsPDF('l', 'mm', 'a4');
    pdf.setFontSize(1);

    // Add image
    pdf.addImage('assets/img/tnhb_logo.png', 'PNG', 10, 10, 50, 30);
    const tableStartPositionY = 50;

    // Convert table to PDF using jspdf-autotable
    autoTable(pdf, { html: '#tableId', startY: tableStartPositionY })

    // Save or display the PDF
    pdf.save('Report.pdf');
  }


  applyTable2Search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table2dataSource.filter = filterValue.trim().toLowerCase();
    this.table2NewDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyTable2Filter(): void {
    const divisionFilterValue = this.divisionSelect.value;
    const villageFilterValue = this.villageSelect.value;

    if (!divisionFilterValue || !villageFilterValue) {
      return;
    }

    this.table2dataSource = new MatTableDataSource<Table2Data>(
      this.originalTable2Data.filter(data => {
        if (divisionFilterValue.includes('All') || divisionFilterValue.includes(data.division)) {
          if (villageFilterValue.includes('All') || villageFilterValue.includes(data.village)) {
            return true;
          }
        }
        return false;
      })
    );

    this.table2NewDataSource = new MatTableDataSource<Table2NewData>(
      this.table2NewData.filter(data => {
        if (
          (divisionFilterValue.includes('All') || divisionFilterValue.includes(data.v_NAME_OF_DIVISION)) &&
          (villageFilterValue.includes('All') || villageFilterValue.includes(data.lps_village))
        ) {
          return true;
        }
        return false;
      })
    );



  }

  fetchDataFromAPI(type: string, value: string): void {
    const requestBody = {
      "types": type,
      "values": value
    };

    this.http.post<any[]>('https://landapi.aocxy.com/GetCountDataVillage', requestBody).subscribe(
      (response) => {
        const mappedResponse: Table2Data[] = response.map(item => ({
          division: item.v_NAME_OF_DIVISION,
          village: item.v_VILLAGE,
          lps: item.lps_file_count,
          fourOne: item.four_one_count,
          sixDD: item.sixdd_file_count,
          award: item.award_file_count,
          lpsAcres: item.lpsAcres,
          fourAcres: item.fourOneAcres,
          sixAcres: item.sixDDAcres,
          awardAcres: item.awardAcres,
          possissiontakenOver: item.possissiontakenOver,
          possiosionNotTakenOver: item.possiosionNotTakenOver

        }));
        console.log('mappedResponse', mappedResponse);

        this.total_LPS = mappedResponse.map(num => num).reduce((acc, num) => acc + (Number(num.lps) ? Number(num.lps) : 0), 0);
        console.log('total_LPS', this.total_LPS);
        this.total_LPS_Acres = mappedResponse.map(num => num).reduce((acc, num) => acc + (num.lpsAcres ? num.lpsAcres : 0), 0);
        this.total_4_1 = mappedResponse.map(num => num).reduce((acc, num) => acc + (Number(num.fourOne) ? Number(num.fourOne) : 0), 0);
        this.total_4_1_Acres = mappedResponse.map(num => num).reduce((acc, num) => acc + (num.fourAcres ? num.fourAcres : 0), 0);
        this.total_6DD = mappedResponse.map(num => num).reduce((acc, num) => acc + (Number(num.sixDD) ? Number(num.sixDD) : 0), 0);
        this.total_6DD_Acres = mappedResponse.map(num => num).reduce((acc, num) => acc + (num.sixAcres ? num.sixAcres : 0), 0);
        this.total_Award = mappedResponse.map(num => num).reduce((acc, num) => acc + (Number(num.award) ? Number(num.award) : 0), 0);
        this.total_Award_Acres = mappedResponse.map(num => num).reduce((acc, num) => acc + (num.awardAcres ? num.awardAcres : 0), 0);
        this.total_PTO_Acres = mappedResponse.map(num => num).reduce((acc, num) => acc + ((num.possissiontakenOver) ? (num.possissiontakenOver) : 0), 0);
        this.total_PNTO_Acres = mappedResponse.map(num => num).reduce((acc, num) => acc + ((num.possiosionNotTakenOver) ? (num.possiosionNotTakenOver) : 0), 0);


        this.originalTable2Data = mappedResponse;
        this.table2dataSource = new MatTableDataSource<Table2Data>(this.originalTable2Data);

        const uniqueDivisions = [...new Set(mappedResponse.map(item => item.division))];
        const uniqueVillages = [...new Set(mappedResponse.map(item => item.village))];

        this.divisionSelectList = ['All', ...uniqueDivisions];
        this.villageSelectList = ['All', ...uniqueVillages];
        if (this.table2dataSource.data.length && this.originalTable2Data.length) {
          this.disable = false;
        } else {
          this.disable = true
        }
      },
      (error) => {
        console.error('Error fetching data from API:', error);
      }
    );
  }

  fetchNewDataFromAPI(type: string, value: string): void {
    const requestBody = {
      "types": type,
      "values": value
    }

    this.http.post<any[]>('https://landapi.aocxy.com/GetListDataVillage', requestBody).subscribe(
      (response) => {
        this.table2NewData = response;
        this.table2NewDataSource = new MatTableDataSource<Table2NewData>(this.table2NewData);
      },
      (error) => {
        console.error('Error fetching data from the new API:', error);
      }
    );
  }

  table2Data: Table2Data[];
  originalTable2Data: Table2Data[];
  table2NewData: Table2NewData[];
  table2NewDataSource: MatTableDataSource<Table2NewData>;

  getTotal(column: string) {
    return this.table2dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(parseInt(data2[column])) ? parseInt(data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotal_N(column: string) {

    return this.table2dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  columnVisibility = {
    lps: false,
    fourOne: false,
    sixDD: false,
    award: false
  };

  toggleColumnVisibility(columnName: string, checked: boolean) {
    this.columnVisibility[columnName] = checked;

    const allUnchecked = Object.values(this.columnVisibility).every((value) => !value);

    if (allUnchecked) {
      this.table2Columns = ['division', 'village', 'lps', 'lps_acres', 'fourOne', 'fourOne_acres', 'sixDD', 'sixDD_acres', 'award', 'award_acres', 'possessTaken', 'possessNotTaken'];
      this.table2NewColumns = ['n_UNIQUE_ID', 'v_NAME_OF_SCHEME', 'division', 'lps_village', 'four_one_village', 'sixdd_village', 'award_village'];
    } else {
      this.table2Columns = ['division', 'village'];
      Object.keys(this.columnVisibility).forEach((column) => {
        if (this.columnVisibility[column]) {
          this.table2Columns.push(column);
          // Add corresponding acres columns
          if (column !== 'division' && column !== 'village') {
            this.table2Columns.push(`${column}_acres`);
            // Special case for 'award' column
            if (column === 'award') {
              this.table2Columns.push('possessTaken', 'possessNotTaken');
            }
          }
        }
      });

      this.table2NewColumns = ['n_UNIQUE_ID', 'v_NAME_OF_SCHEME', 'division'];
      Object.keys(this.columnVisibility).forEach((column) => {
        if (this.columnVisibility[column]) {
          if (column === 'lps') {
            this.table2NewColumns.push('lps_village');
          }
          if (column === 'fourOne') {
            this.table2NewColumns.push('four_one_village');
          }
          if (column === 'sixDD') {
            this.table2NewColumns.push('sixdd_village');
          }
          if (column === 'award') {
            this.table2NewColumns.push('award_village');
          }
        }
      });
    }
  }





}
