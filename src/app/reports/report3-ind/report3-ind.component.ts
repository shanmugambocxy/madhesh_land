import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';
import { CommonService } from 'src/app/services/common.service';

interface Table2Data {
  division: string;
  village: string;
  lps: string;
  fourOne: string;
  sixDD: string;
  award: string;
  total6DD4_1: number;
  sixdd_file_count: number;
  total_Sixacres_AwardAcres: number;
}
interface TableD6Data {
  division: string;
  V_AWARD_NO: string;
  D_AWARD_DATE: string;
  V_TOTAL_EXTENT: string;
  N_TOTAL_AWARD_AMOUNT: number;
  totalAmountDirectPayment: number;
  totalAmountRevenuePayment: number;
  totalAmountCourtDeposit: number;
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
  selector: 'app-report3-ind',
  templateUrl: './report3-ind.component.html',
  styleUrls: ['./report3-ind.component.css']
})
export class Report3IndComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  table1Columns: string[] = ['village', 'fourOne', 'sixDD', 'award', 'possessTaken']
  table2Columns: string[] = ['village', 'lps_acres', 'fourOne_acres', 'fourOneGO', 'sixDD_acres', 'sixDDGO', 'diff']
  table3Columns: string[] = ['village', 'sixDD_acres', 'award_acres', 'diff']
  table4Columns: string[] = ['village', 'possessTaken', 'utilized', 'non_utilized']
  table5Columns: string[] = ['village', 'non_utilized', 'govtDept', 'reconvey', 'quash', 'encroach', 'litigation', 'availableForScheme']
  table6Columns: string[] = ['division', 'awardNo', 'date', 'award_acres', 'award_amount', 'direct', 'revenue', 'cc']
  table2NewColumns: string[] = ['n_UNIQUE_ID', 'v_NAME_OF_SCHEME', 'division', 'lps_village', 'four_one_village', 'sixdd_village', 'award_village'];

  divisionSelect = new FormControl(['']);
  divisionSelectList: string[] = ['All'];
  villageSelect = new FormControl(['']);
  villageSelectList: string[] = ['All'];
  filteredData: any[] = [];
  accesslevel1: string;
  group_name: string;
  lpsAcres = false;
  fourAcres = false;
  sixddAcres = false;
  awardAcres = false;
  disable = true;
  totalLpsAcre = 0;
  total4oneAcres = 0;
  totalSixAcres = 0;
  totalAwardAcres = 0;
  totalLps = 0;
  totalFour = 0;
  totalSix = 0;
  totalPtoAcres = 0;
  totalNotificationNoOfGos4_1 = 0
  totalnoofGO6DD = 0;
  total6DD4_1 = 0;
  totalAward = 0;
  totalAward6DDAcres = 0;
  total_Extend_In_Acres = 0;
  total_Award_Amount = 0;
  total_Direct_Payment = 0;
  total_Revenue_Deposit = 0;
  total_CC_Deposit = 0;
  total_utilized = 0;
  total_non_utilized = 0;





  villageCtrl = new FormControl('');
  filtered1Village: Observable<any[]>;
  filtered2Village: Observable<any[]>;
  filtered3Village: Observable<any[]>;
  table2dataSource: MatTableDataSource<Table2Data>;
  awardAmountDetailsdataSource: MatTableDataSource<TableD6Data>;

  table2Data: Table2Data[];
  originalTable2Data: Table2Data[];
  table2NewData: Table2NewData[];
  table2NewDataSource: MatTableDataSource<Table2NewData>;
  report1NewDataSource: MatTableDataSource<Table2Data>;
  report2NewDataSource: MatTableDataSource<Table2Data>;
  report3NewDataSource: MatTableDataSource<Table2Data>;
  report4NewDataSource: MatTableDataSource<Table2Data>;
  report5NewDataSource: MatTableDataSource<Table2Data>;
  report6NewDataSource: MatTableDataSource<Table2Data>;
  allDisabled: boolean;
  valuerep1: string[] = ['All'];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  ngOnInit(): void {
    this.accesslevel1 = sessionStorage.getItem('accesslevel1');
    this.group_name = sessionStorage.getItem('group_name');
    this.divisionSelect.setValue(['All']);
    this.villageSelect.setValue(['All']);
    this.fetchDataFromAPI(this.accesslevel1, this.group_name);
    this.getAwardAmountDetails();
    this.filtered1Village = this.villageCtrl.valueChanges.pipe(startWith(''), map((village) => village ? this.filtervillage(village) : this.villageSelectList.slice()));
    this.filtered2Village = this.villageCtrl.valueChanges.pipe(startWith(''), map((village) => village ? this.filtervillage(village) : this.villageSelectList.slice()));
    this.filtered3Village = this.villageCtrl.valueChanges.pipe(startWith(''), map((village) => village ? this.filtervillage(village) : this.villageSelectList.slice()));
  }

  filtervillage(name: string) {
    const filteredArray = this.villageSelectList.filter((village) => village && village.toLowerCase().includes(name.toLowerCase()));
    this.valuerep1 = filteredArray;
    return filteredArray.length !== 0 ? filteredArray : ['No Item found'];
  }
  ngAfterViewInit() {
    // this.table2NewDataSource.paginator = this.paginator;
  }
  generatePDF(type: string) {
    const pdf = new jsPDF('l', 'mm', 'a4');
    pdf.setFontSize(1);

    // Add image
    pdf.addImage('assets/img/tnhb_logo.png', 'PNG', 10, 10, 50, 30);
    const tableStartPositionY = 50;

    // Convert table to PDF using jspdf-autotable
    autoTable(pdf, { html: '#tableId' + type, startY: tableStartPositionY })

    // Save or display the PDF
    pdf.save('Report.pdf');
  }


  applyTable2Search(event: Event, type: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (type === '1') {
      this.report1NewDataSource.filter = filterValue.trim().toLowerCase();
    } else if (type === '2') {
      this.report2NewDataSource.filter = filterValue.trim().toLowerCase();
    } else if (type === '3') {
      this.report3NewDataSource.filter = filterValue.trim().toLowerCase();
    } else if (type === '4') {
      // this.report4NewDataSource.filter = filterValue.trim().toLowerCase();
      this.table2dataSource.filter = filterValue.trim().toLowerCase();


    } else if (type === '5') {
      // this.report5NewDataSource.filter = filterValue.trim().toLowerCase();
      this.table2dataSource.filter = filterValue.trim().toLowerCase();


    } else if (type === '6') {
      // this.report6NewDataSource.filter = filterValue.trim().toLowerCase();
      this.awardAmountDetailsdataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  applyTable2Filter(type: string): void {

    const divisionFilterValue = this.divisionSelect.value;
    const villageFilterValue = this.villageSelect.value;
    if (!divisionFilterValue || !villageFilterValue) {
      return;
    }
    if (type === '1') {
      this.report1NewDataSource = new MatTableDataSource<Table2Data>(
        this.originalTable2Data.filter(data => {
          if (divisionFilterValue.includes('All') || divisionFilterValue.includes(data.division)) {
            if (villageFilterValue.includes('All') || villageFilterValue.includes(data.village)) {
              return true;
            }
          }
          return false;
        })
      );
    } else if (type === '2') {
      this.report2NewDataSource = new MatTableDataSource<Table2Data>(
        this.originalTable2Data.filter(data => {
          if (divisionFilterValue.includes('All') || divisionFilterValue.includes(data.division)) {
            if (villageFilterValue.includes('All') || villageFilterValue.includes(data.village)) {
              return true;
            }
          }
          return false;
        })
      );
    } else if (type === '3') {
      this.report3NewDataSource = new MatTableDataSource<Table2Data>(
        this.originalTable2Data.filter(data => {
          if (divisionFilterValue.includes('All') || divisionFilterValue.includes(data.division)) {
            if (villageFilterValue.includes('All') || villageFilterValue.includes(data.village)) {
              return true;
            }
          }
          return false;
        })
      );
    }

  }

  fetchDataFromAPI(type: string, value: string): void {
    debugger
    const requestBody = {
      "types": type,
      "values": value
    };

    this.http.post<any[]>('https://landapi.aocxy.com/GetCountDataVillage', requestBody).subscribe(
      (response) => {
        if (response) {


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
            total6DD4_1: Math.abs(Number(item.fourOneAcres) - item.sixDDAcres),
            sixdd_file_count: item.sixdd_file_count,
            total_Sixacres_AwardAcres: Math.abs(item.sixDDAcres - item.awardAcres),
          }));
          console.log('mappedResponse', mappedResponse);

          // this.total6DD4_1 = _.sum(mappedResponse, 'total6DD4_1');
          console.log('total6DD4_1', this.total6DD4_1);

          response.forEach(item => {
            this.totalLps += Number(item.lps_file_count);
            this.totalFour += Number(item.four_one_count);
            this.totalSix += Number(item.sixdd_file_count);
            this.totalPtoAcres += Number(item.possissiontakenOver);
            this.totalAward += Number(item.award_file_count);
            this.totalLpsAcre += item.lpsAcres;
            this.total4oneAcres += item.fourOneAcres;
            this.totalSixAcres += item.sixDDAcres;
            this.totalAwardAcres += item.awardAcres;
            // this.totalAward6DDAcres += (item.awardAcres - item.sixDDAcres);
            this.totalAward6DDAcres += Math.abs(item.sixDDAcres - item.awardAcres);

            let total6DD4_1 = Math.abs(Number(item.four_one_count) - item.sixDDAcres)
            this.total6DD4_1 += total6DD4_1;
          });
          this.originalTable2Data = mappedResponse;
          this.report1NewDataSource = new MatTableDataSource<Table2Data>(this.originalTable2Data);
          this.report2NewDataSource = new MatTableDataSource<Table2Data>(this.originalTable2Data);
          this.report3NewDataSource = new MatTableDataSource<Table2Data>(this.originalTable2Data);
          this.report4NewDataSource = new MatTableDataSource<Table2Data>(this.originalTable2Data);
          this.report5NewDataSource = new MatTableDataSource<Table2Data>(this.originalTable2Data);
          this.report6NewDataSource = new MatTableDataSource<Table2Data>(this.originalTable2Data);
          this.table2dataSource = new MatTableDataSource<Table2Data>(this.originalTable2Data);
          console.log('report1NewDataSource', this.report1NewDataSource);

          debugger
          const uniqueDivisions = [...new Set(mappedResponse.map(item => item.division))];
          const uniqueVillages = [...new Set(mappedResponse.map(item => item.village))];


          this.divisionSelectList = ['All', ...uniqueDivisions];
          this.villageSelectList = ['All', ...uniqueVillages];
          if (this.report1NewDataSource.data.length) {
            this.disable = false;
          } else {
            this.disable = true;
          }
        }
      },
      (error) => {
        console.error('Error fetching data from API:', error);
      }
    );
  }


  getTotal(column: string) {
    return this.table2dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(parseInt(data2[column])) ? parseInt(data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab1(column: string) {


    return this.report1NewDataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(parseInt(data2[column])) ? parseInt(data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab1_N(column: string) {
    debugger
    return this.report1NewDataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab2(column: string) {


    return this.report2NewDataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(parseInt(data2[column])) ? parseInt(data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab2_N(column: string) {
    debugger
    return this.report2NewDataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab3(column: string) {


    return this.report3NewDataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(parseInt(data2[column])) ? parseInt(data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab3_N(column: string) {
    debugger
    return this.report3NewDataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
      return acc + value;
    }, 0);

  }

  getTotalTab4(column: string) {


    return this.table2dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(parseInt(data2[column])) ? parseInt(data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab4_N(column: string) {
    debugger
    return this.table2dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab5(column: string) {


    return this.table2dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(parseInt(data2[column])) ? parseInt(data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab5_N(column: string) {
    debugger
    return this.table2dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
      return acc + value;
    }, 0);

  }


  getTotalTab6(column: string) {
    debugger
    return this.awardAmountDetailsdataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(parseInt(data2[column])) ? parseInt(data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  getTotalTab6_N(column: string) {
    debugger
    if (column == 'N_TOTAL_AWARD_AMOUNT') {
      return this.awardAmountDetailsdataSource?.filteredData.reduce((acc, data2) => {
        const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
        let totalValue = acc + value;
        return typeof totalValue == "string" ? parseInt(totalValue) : totalValue;
      }, 0);
    } else {
      return this.awardAmountDetailsdataSource?.filteredData.reduce((acc, data2) => {
        const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
        return acc + value;
      }, 0);
    }


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



  getAwardAmountDetails() {
    debugger
    // let data = { "types": "All", "values": "All" };
    let data = { "id": 1 };

    // let endPoint = 'getAllAwardFiles';
    let endPoint = 'totals';


    this.commonService.getAwardAmountDeposit(data, endPoint).subscribe(res => {
      if (res && res.length > 0) {
        // this.awardAmountDetailsdataSource.data = res.data;
        this.awardAmountDetailsdataSource = new MatTableDataSource<TableD6Data>(res);
        this.total_Extend_In_Acres = this.awardAmountDetailsdataSource.data.map(num => num).reduce((acc, num) => acc + (parseInt(num.V_TOTAL_EXTENT) ? parseInt(num.V_TOTAL_EXTENT) : 0), 0);
        console.log('total_Extend_In_Acres', this.total_Extend_In_Acres);

        this.total_Award_Amount = this.awardAmountDetailsdataSource.data.map(num => num).reduce((acc, num) => acc + ((num.N_TOTAL_AWARD_AMOUNT) ? (num.N_TOTAL_AWARD_AMOUNT) : 0), 0);
        this.total_Direct_Payment = this.awardAmountDetailsdataSource.data.map(num => num).reduce((acc, num) => acc + ((num.totalAmountDirectPayment) ? (num.totalAmountDirectPayment) : 0), 0);
        this.total_Revenue_Deposit = this.awardAmountDetailsdataSource.data.map(num => num).reduce((acc, num) => acc + ((num.totalAmountRevenuePayment) ? (num.totalAmountRevenuePayment) : 0), 0);
        this.total_CC_Deposit = this.awardAmountDetailsdataSource.data.map(num => num).reduce((acc, num) => acc + ((num.totalAmountCourtDeposit) ? (num.totalAmountCourtDeposit) : 0), 0);
      } else {
        // this.awardAmountDetailsdataSource.data = [];
        this.awardAmountDetailsdataSource = new MatTableDataSource<TableD6Data>([]);


      }
    })
  }


}
