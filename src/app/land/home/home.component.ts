import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanddataService } from '../landdata.service';
import * as _ from 'lodash';
import { filter, reduce } from 'lodash';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { Console } from 'console';
import { FormControl } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

export interface SaveLandApiModel {
  landDigitDataEntity: LandDigitDataEntity
  // lpsTabDetails: LpsTabDetail[]
  fouroneTabDetails: FouroneTabDetail[]
  sixddTabDetails: SixddTabDetail[]
  awardTabDetails: AwardTabDetail[]
  leftoverTabDetails?: LeftoverTabDetails //finally add
}

export interface LandDigitDataEntity {
  v_NAME_OF_DIVISION: string
  v_NAME_OF_DISTRICT: string
  v_NAME_OF_CIRCLE: string
  v_NAME_OF_GEO_TAGGING: string
  v_NAME_OF_SCHEME: string
  n_UNIQUE_ID: any
  mode: string
  v_NAME_OF_VILLAGE: string
}

export interface LpsTabDetail {
  lpsVillageDetails: LpsVillageDetail[]
  lpsFileDynamicValuesDetails: LpsFileDynamicValuesDetail[]
  dynamicValuesDetails: DynamicValuesDetail[]
  n_ID: any
  v_FILE_NAME: string
  n_UNIQUE_ID: number
  v_FILE_PATH: string
  v_TOTAL_EXTENT: string
  v_REF_NO: string
  mode: string
  n_FILE_ID: string
}

export interface LpsVillageDetail {
  mode: string
  n_ID: any
  n_UNIQUE_ID: number
  v_NAME_OF_VILLAGE: string
  n_FILE_ID: number
  v_EXTENT: string
  v_SURVEY_NO: string
}

export interface LpsFileDynamicValuesDetail {
  mode: string
  n_ID: any
  v_FILE_NAME: string
  n_UNIQUE_ID: number
  n_FILE_ID: number
  v_FILE_PATH: string
}

export interface DynamicValuesDetail {
  mode: string
  n_ID: any
  v_FILE_NAME: string
  n_UNIQUE_ID: number
  n_FILE_ID: number
  v_COLUMN_NAME: string
  v_VALUE_NAME: string
}

export interface FouroneTabDetail {
  fourOneDynamicFileEntityDetails: FourOneDynamicFileEntityDetail[]
  dynamicValuesDetails: DynamicValuesDetail2[]
  n_ID: any
  n_UNIQUE_ID: any
  v_FILE_1_FILENAME: string
  v_4_ONE_GO_REF_NO: string
  d_DATE_OF_GAZETTE_NOTIFICATION: string
  v_GAZETTE_REF_NO: string
  d_DATE_OF_4_ONE_GO: string
  d_DATE_OF_LOCALITY: string
  v_FILE_2_FILENAME: string
  v_FILE_1_FILEPATH: string
  v_FILE_2_FILEPATH: string
  v_TOTAL_EXTENT: string
  v_REF_NO: string
  mode: string
}

export interface FourOneDynamicFileEntityDetail {
  mode: string
  n_ID: any
  v_FILE_NAME: string
  n_UNIQUE_ID: any
  n_FILE_ID: number
  v_FILE_PATH: string
  v_SURVEY_NO: string
  v_SOUTH: string
  v_NAME_OF_OWNER: string
  v_EAST: string
  v_WEST: string
  v_NORTH: string
}

export interface DynamicValuesDetail2 {
  mode: string
  n_ID: number
  v_FILE_NAME: string
  n_UNIQUE_ID: any
  n_FILE_ID: number
  v_COLUMN_NAME: string
  v_VALUE_NAME: string
}

export interface SixddTabDetail {
  mode: string
  sixDdDynamicFileEntityValuesDetails: SixDdDynamicFileEntityValuesDetail[]
  dynamicValuesDetails: DynamicValuesDetail3[]
  n_ID: any
  n_UNIQUE_ID: any
  d_DATE_OF_6DD_GO: string
  v_FILE_1_FILENAME: string
  d_DATE_OF_GAZETTE_NOTIFICATION: string
  v_GAZETTE_REF_NO: string
  d_DATE_OF_LOCALITY: string
  v_FILE_2_FILENAME: string
  v_FILE_1_FILEPATH: string
  v_FILE_2_FILEPATH: string
  v_TOTAL_EXTENT: string
  v_REF_NO: string
  v_6DD_GO_REF_NO: string
}

export interface SixDdDynamicFileEntityValuesDetail {
  mode: string
  n_ID: any
  n_UNIQUE_ID: number
  n_FILE_ID: number
  v_EXTENT: string
  v_SURVEY_NO: string
  v_NAME_OF_OWNER: string
}

export interface DynamicValuesDetail3 {
  mode: string
  n_ID: any
  v_FILE_NAME: string
  n_UNIQUE_ID: any
  n_FILE_ID: number
  v_COLUMN_NAME: string
  v_VALUE_NAME: string
}

export interface AwardTabDetail {
  mode: string
  awardOtherFileEntityValuesDetails: AwardOtherFileEntityValuesDetail[]
  dynamicValuesDetails: DynamicValuesDetail4[]
  awardDirectPaymentEntityValuesDetails: AwardDirectPaymentEntityValuesDetail[]
  awardRevenuePaymentEntityValuesDetails: AwardRevenuePaymentEntityValuesDetail[]
  awardCourtDepositPaymentEntityValuesDetails: AwardCourtDepositPaymentEntityValuesDetail[]
  awardPossessionTakenOverEntityValuesDetails: AwardPossessionTakenOverEntityValuesDetail[]
  awardPossessionNotTakenOverEntityValuesDetails: AwardPossessionNotTakenOverEntityValuesDetail[]
  awardPossessionExtentAvailableEntityValuesDetails: AwardPossessionExtentAvailableEntityValuesDetail[]
  n_ID: any
  v_FILE_NAME: string
  n_UNIQUE_ID: any
  v_PHO_SCHEME_TOTAL_EXTENT: string
  n_TOTAL_AWARD_AMOUNT: number
  v_PNHO_TOTAL_EXTENT: string
  v_PHO_TOTAL_EXTENT: string
  v_FILE_PATH: string
  v_TOTAL_EXTENT: string
  v_AWARD_NO: string
  d_AWARD_DATE: string
}

export interface AwardOtherFileEntityValuesDetail {
  mode: string
  n_ID: any
  v_FILE_NAME: string
  n_UNIQUE_ID: any
  v_LEGAL_PROCEEDING: string
  n_FILE_ID: number
  v_FILE_PATH: string
  v_EXTENT: string
}

export interface DynamicValuesDetail4 {
  mode: string
  n_ID: any
  v_FILE_NAME: string
  n_UNIQUE_ID: any
  n_FILE_ID: number
  v_COLUMN_NAME: string
  v_VALUE_NAME: string
}

export interface AwardDirectPaymentEntityValuesDetail {
  mode: string
  n_ID: any
  n_UNIQUE_ID: any
  v_NOTIFIED_PERSON: string
  n_FILE_ID: number
  v_AMOUNT: number
}

export interface AwardRevenuePaymentEntityValuesDetail {
  mode: string
  n_ID: any
  n_UNIQUE_ID: any
  v_NOTIFIED_PERSON: string
  n_FILE_ID: number
  v_AMOUNT: number
}

export interface AwardCourtDepositPaymentEntityValuesDetail {
  mode: string
  n_ID: any
  n_UNIQUE_ID: any
  v_NOTIFIED_PERSON: string
  n_FILE_ID: number
  v_AMOUNT: number
}

export interface AwardPossessionTakenOverEntityValuesDetail {
  mode: string
  n_ID: any
  n_UNIQUE_ID: any
  n_FILE_ID: number
  v_TOTAL_EXTENT: string
  v_SURVEY_NO: string
}

export interface AwardPossessionNotTakenOverEntityValuesDetail {
  mode: string
  n_ID: any
  n_UNIQUE_ID: any
  n_FILE_ID: number
  v_TOTAL_EXTENT: string
  v_SURVEY_NO: string
}

export interface AwardPossessionExtentAvailableEntityValuesDetail {
  mode: string
  n_ID: any
  n_UNIQUE_ID: any
  n_FILE_ID: number
  v_TOTAL_EXTENT: string
  v_SURVEY_NO: string
}

export interface LeftoverTabDetails {
  leftOverLPS4OneEntity: LeftOverLps4OneEntity[]
  left6DDAwardEntity: Left6DdawardEntity[]
  left4One6DDEntity: Left4One6Ddentity[]
}

export interface LeftOverLps4OneEntity {
  mode: string
  left4One6DDEntityDetails: any
  left6DDAwardRepoEntityDetails: any
  primarykey: any
  n_UNIQUE_ID: any
  v_EXTENT: string
  v_SURVEY_NO: string
}

export interface Left6DdawardEntity {
  mode: string
  primarykey: any
  n_UNIQUE_ID: any
  v_EXTENT: string
  v_SURVEY_NO: string
}

export interface Left4One6Ddentity {
  mode: string
  primarykey: any
  n_UNIQUE_ID: any
  v_EXTENT: string
  v_SURVEY_NO: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  dataSource = new MatTableDataSource<any>([]);
  // columnsToDisplay = ['n_UNIQUE_ID', 'v_NAME_OF_SCHEME', 'v_NAME_OF_CIRCLE', 'v_NAME_OF_DIVISION', 'v_TOTAL_EXTENT', 'v_PHO_TOTAL_EXTENT', 'v_PNHO_TOTAL_EXTENT', 'v_PHO_SCHEME_TOTAL_EXTENT', 'actions'];
  // columnsToDisplay = ['n_UNIQUE_ID', 'v_NAME_OF_SCHEME', 'v_NAME_OF_DIVISION', 'v_NAME_OF_DISTRICT', 'v_NAME_OF_VILLAGE', '4(1) (in acres)', '6DD (in acres)', 'v_TOTAL_EXTENT', 'v_PHO_TOTAL_EXTENT', 'v_PNHO_TOTAL_EXTENT', 'v_PHO_SCHEME_TOTAL_EXTENT', 'actions'];
  columnsToDisplay = ['n_UNIQUE_ID', 'v_NAME_OF_SCHEME', 'v_NAME_OF_DIVISION', 'v_NAME_OF_DISTRICT', 'v_NAME_OF_VILLAGE', '4(1) (in acres)', '6DD (in acres)', 'Award (in acres)', 'Award Amount', 'DP Amount', 'RD Amount', 'CC Amount', 'LHO (in acres)', 'Utilized (in acres)', 'Non Utilized (in acres)', 'Future Dev (in acres)', 'LNHO (in acres)', 'actions'];



  alldata: any[] = [];
  countdata: any[] = [];
  totalcountsingle!: number;
  message = '';
  filteredData: any[] = [];
  excelData: any[] = [];
  searchText: string = '';
  legalProceedingsFilter: string = '';
  statusFilter: string = '';
  currentPage = 1; // current page number
  itemsPerPage = 10; // number of items to be displayed per page
  totalItems = this.alldata.length; // total number of items
  totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // total number of pages
  userList: any[];
  accesslevel1: string;
  group_name: string;
  transform(items: any[], options: any): any[] {
    const { itemsPerPage, currentPage } = options;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }
  searchFilter = '';
  divisionSelect = new FormControl();
  divisionSelectList: string[] = ['All'];
  districtSelect = new FormControl();
  districtSelectList: string[] = ['All'];
  originalTableData: any = [];


  constructor(private landdataService: LanddataService, private commonService: CommonService, private router: Router, public dialog: MatDialog, private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.accesslevel1 = sessionStorage.getItem('accesslevel1');
    this.group_name = sessionStorage.getItem('group_name');
    this.getLandCount();

  }
  applyFilter() {
    // console.log(this.dataSource.data)
    const filterValue = this.searchFilter ? this.searchFilter?.toLowerCase() : '';
    const filteredData = this.dataSource.data.filter((item) => {
      // console.log(filterValue)
      const legalProceedingsMatch = !this.legalProceedingsFilter || item?.legalProceedings?.toLowerCase() === this.legalProceedingsFilter.toLowerCase();
      const statusMatch = !this.statusFilter || item?.status?.toLowerCase() === this.statusFilter?.toLowerCase();
      // const searchMatch = item['n_UNIQUE_ID']?.toString().toLowerCase().includes(filterValue) || item['v_NAME_OF_SCHEME']?.toLowerCase().includes(filterValue) || item['v_NAME_OF_CIRCLE']?.toLowerCase().includes(filterValue) || item['v_NAME_OF_DIVISION']?.toLowerCase().includes(filterValue) || item['v_TOTAL_EXTENT']?.includes(filterValue) || item['v_PHO_TOTAL_EXTENT']?.includes(filterValue) || item['v_PNHO_TOTAL_EXTENT']?.includes(filterValue) || item['v_PHO_SCHEME_TOTAL_EXTENT']?.includes(filterValue);
      const searchMatch = item['n_UNIQUE_ID']?.toString().toLowerCase().includes(filterValue) || item['v_NAME_OF_SCHEME']?.toLowerCase().includes(filterValue) || item['v_NAME_OF_DISTRICT']?.toLowerCase().includes(filterValue) || item['v_NAME_OF_VILLAGE']?.toLowerCase().includes(filterValue) || item['v_NAME_OF_DIVISION']?.toLowerCase().includes(filterValue) || item['v_TOTAL_EXTENT']?.includes(filterValue) || item['v_PHO_TOTAL_EXTENT']?.includes(filterValue) || item['v_PNHO_TOTAL_EXTENT']?.includes(filterValue) || item['v_PHO_SCHEME_TOTAL_EXTENT']?.includes(filterValue);

      return legalProceedingsMatch && statusMatch && searchMatch;
    });
    if (filterValue.trim() && filteredData) {
      // console.log(filteredData)
      this.dataSource.data = filteredData;
    } else {
      this.dataSource.data = this.userList;

    }
  }

  getLandCount() {
    const body = {
      types: this.accesslevel1,
      values: this.group_name
    }

    this.commonService.apiPostCall(body, 'GetData').subscribe((data) => {
      console.log(data);

      this.userList = data;
      // this.dataSource.data = data;
      this.originalTableData = data;
      this.dataSource = new MatTableDataSource(data);
      const uniqueDivisions: any = [] = [...new Set(data.map(item => item.v_NAME_OF_DIVISION))];
      // const uniqueDistrict: any = [] = [...new Set(data.map(item => item.v_NAME_OF_DISTRICT))];

      this.divisionSelectList = ['All', ...uniqueDivisions];
      // this.districtSelectList = ['All', ...uniqueDistrict];
      // console.log(this.dataSource.data+"mass");

    });

    this.commonService.apiPostCall(body, 'GetDataCount').subscribe((data) => {
      this.countdata = data;
      this.totalcountsingle = reduce(this.countdata, (sum, obj) => sum + parseInt(obj.v_TOTAL_COUNT, 10), 0);
    });

  }

  delete(id: string): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        from: "delete",
      }
    });
    dialog.afterClosed().subscribe(data => {
      if (data) {
        const delLoad = {
          "id": Number(id)
        }
        this.commonService.apiPostCall(delLoad, 'deleteV2LandData').subscribe(response => {
          // if (response.message.includes('Successfully')) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: 'Land data deleted successfully',
          });
          this.getLandCount();
          // }
        })

      }
    })
  }



  searchfilterData() {
    const searchText = this.searchText?.toLowerCase();
    // console.log(this.searchText)
    this.filteredData = this.alldata.filter((data: any) => {
      return (
        (data.unique_code && data.unique_code.toLowerCase().includes(searchText)) ||
        (data.land_name && data.land_name.toLowerCase().includes(searchText)) ||
        (data.citynrural && data.citynrural.toLowerCase().includes(searchText)) ||
        (data.division && data.division.toLowerCase().includes(searchText)) ||
        (data.village && data.village.toLowerCase().includes(searchText)) ||
        (data.total_extent_land_acquired && data.total_extent_land_acquired.toLowerCase().includes(searchText)) ||
        (data.extent && data.extent.toLowerCase().includes(searchText)) ||
        (data.not_handed_over_extent && data.not_handed_over_extent.toLowerCase().includes(searchText)) ||
        (data.legalproceedings && data.legalproceedings.toLowerCase().includes(searchText))

      );
    });
  }




  get filterData() {
    if (this.legalProceedingsFilter || this.statusFilter) {
      return this.alldata.filter(data => {
        if (this.legalProceedingsFilter && data.legalproceedings !== this.legalProceedingsFilter) {
          return false;
        }
        if (this.statusFilter && data.status !== this.statusFilter) {
          return false;
        }
        return true;
      });
    } else {
      return this.alldata;
    }
  }



  edit(type, id) {
    // console.log(type, id)
    this.router.navigate(['/land/' + type, id]);
  }
  // exportPDF() {
  //   const doc = new jsPDF();

  //   // Define the columns and their widths
  //   const columns = [
  //     { title: 'Unique Code', dataKey: 'unique_code' },
  //     { title: 'Land Name', dataKey: 'land_name' },
  //     { title: 'City/Rural', dataKey: 'citynrural' },
  //     { title: 'Division', dataKey: 'division' },
  //     { title: 'Total Extent Land Acquired', dataKey: 'total_extent_land_acquired' },
  //     { title: 'Extent', dataKey: 'extent' },
  //     { title: 'Not Handed Over Extent', dataKey: 'not_handed_over_extent' },
  //     { title: 'Legal Proceedings', dataKey: 'legalproceedings' }
  //   ];

  //   const rows = this.alldata.map(item => {
  //     return {
  //       unique_code: item.unique_code,
  //       land_name: item.land_name,
  //       citynrural: item.citynrural,
  //       division: item.division,
  //       total_extent_land_acquired: item.total_extent_land_acquired,
  //       extent: item.extent,
  //       not_handed_over_extent: item.not_handed_over_extent,
  //       legalproceedings: item.legalproceedings
  //     };
  //   });

  //   doc.autoTable(columns, rows, {
  //     theme: 'grid', // 'striped', 'grid', 'plain'
  //     startY: 10, // Y position for the start of the table
  //     tableWidth: 'auto', // 'auto', 'wrap', 'number'
  //     columnWidth: 'auto' // 'auto', 'wrap', 'number'
  //   });

  //   // Save the PDF with a filename
  //   doc.save('TableData.pdf');
  // }

  printTable() {
    // Add the CSS class to hide the hero section
    const heroSection = document.querySelector('#hero') as HTMLElement;
    heroSection.classList.add('hide-on-print');

    // Trigger the print dialog
    window.print();

    // Remove the CSS class after printing
    heroSection.classList.remove('hide-on-print');
  }



  getTotal(column: string) {

    return this.dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN(Number(data2[column])) ? Number(data2[column]) : 0;
      // console.log('value>>>', acc + value);

      return acc + value;
    }, 0);

  }
  getTotal_N(column: string) {

    return this.dataSource?.filteredData.reduce((acc, data2) => {
      const value = data2[column] !== null && !isNaN((data2[column])) ? (data2[column]) : 0;
      return acc + value;
    }, 0);

  }
  applyTable1Filter() {
    debugger
    const divisionFilterValue = this.divisionSelect.value;
    const districtFilterValue = this.districtSelect.value;


    if (!divisionFilterValue || divisionFilterValue.length == 0) {
      this.dataSource = new MatTableDataSource(this.originalTableData)
      // this.dataSource = new MatTableDataSource(
      //   this.originalTableData.filter(data => {
      //     if (
      //       (districtFilterValue.includes('All') || districtFilterValue.includes(data.v_NAME_OF_DISTRICT))
      //     ) {
      //       return true;
      //     }
      //     return false;
      //   })
      // );
      // return;
    } else {
      this.dataSource = new MatTableDataSource(
        this.originalTableData.filter(data => {
          if (
            (divisionFilterValue.includes('All') || divisionFilterValue.includes(data.v_NAME_OF_DIVISION))
          ) {
            return true;
          }
          return false;
        })
      );
      const uniqueDistrict: any = [] = [...new Set(this.dataSource.data.map(item => item.v_NAME_OF_DISTRICT))];
      this.districtSelectList = ['All', ...uniqueDistrict];

    }

    console.log('dataSource', this.dataSource);


  }

  applyTable2Filter() {
    debugger
    const divisionFilterValue = this.divisionSelect.value;

    const districtFilterValue = this.districtSelect.value;

    if (!districtFilterValue || districtFilterValue.length == 0) {
      this.dataSource = new MatTableDataSource(
        this.originalTableData.filter(data => {
          if (
            (divisionFilterValue.includes('All') || divisionFilterValue.includes(data.v_NAME_OF_DIVISION))
          ) {
            return true;
          }
          return false;
        })
      );
      // return;
    } else {
      if (this.dataSource && this.dataSource.data.length > 0) {
        this.dataSource = new MatTableDataSource(
          this.dataSource.data.filter(data => {
            if (
              (districtFilterValue.includes('All') || districtFilterValue.includes(data.v_NAME_OF_DISTRICT))
            ) {
              return true;
            }
            return false;
          })

          // this.originalTableData.filter(data => {
          //   if (
          //     (districtFilterValue.includes('All') || districtFilterValue.includes(data.v_NAME_OF_DISTRICT))
          //   ) {
          //     return true;
          //   }
          //   return false;
          // })
        );
      }
    }





    console.log('dataSource', this.dataSource);


  }

  convert() {
    var columnStyle: any;
    let currentdate = new Date();
    let formaateDate = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1).toString().padStart(2, '0')
      + "-" + currentdate.getDate().toString().padStart(2, '0') + ' ' + currentdate.getHours().toString().padStart(2, '0') + ":" + currentdate.getMinutes().toString().padStart(2, '0');
    console.log('formate', formaateDate);

    try {
      let currentdate = new Date();
      let formaateDate = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1).toString().padStart(2, '0')
        + "-" + currentdate.getDate().toString().padStart(2, '0') + ' ' + currentdate.getHours().toString().padStart(2, '0') + ":" + currentdate.getMinutes().toString().padStart(2, '0');
      console.log('formate', formaateDate);

      let getExportdata = [];
      var fileName: any;
      let headerName: any = [];
      let selectedDatetype: any;


      columnStyle = {
        // 0: { halign: "center" },

        // 1: { halign: "right" },
        // 2: { halign: "right" },

        // 3: { halign: "right" },
        // 4: { halign: "right" },

      }
      fileName = 'Land Digitization';
      headerName = ['S.No', 'Scheme Name', 'Division', 'District', 'Village', '4(1) (in acres)', '6DD (in acres)', 'Award (in acres)', 'Award Amount', 'DP Amount', 'RD Amount', 'CC Amount', 'LHO (in acres)', 'Utilized (in acres)', 'Not Utilized (in acres)', 'Future Dev (in acres)', 'LNHO (in acres)',];
      // headerName = ['S.No', 'Scheme Name', 'Division', 'District', 'Village',];

      this.dataSource.data.forEach((element, index) => {
        let data = [
          index + 1,

          element.v_NAME_OF_SCHEME,
          element.v_NAME_OF_DIVISION,
          element.v_NAME_OF_DISTRICT,
          element.v_NAME_OF_VILLAGE,
          element.fourone_total_extent,
          element.sixdd_total_extent,
          element.v_TOTAL_EXTENT,
          element.n_TOTAL_AWARD_AMOUNT,
          element.award_direct_payment,
          element.award_revenue_payment,
          element.award_court_deposit,
          element.lhoExtent1,
          element.utilisedExtent,
          element.notUtilisedExtent,
          element.futureDevExtent,
          element.lnhoExtent1


        ]
        getExportdata.push(data)
      });



      console.log('getExportdata', getExportdata);


      const doc = new jsPDF('landscape');
      const imageUrl = '/assets/img/Tnhbnew1.png'; // Replace with the path to your image
      // doc.addImage(imageUrl, 'png', 70, 10, 40, 40);
      const imageWidth = 25; // Adjust the image width as needed
      const pdfWidth = doc.internal.pageSize.getWidth();

      // const imageX = (pdfWidth - imageWidth) / 2;
      const imageX = 10;

      const imageY = 5; // Adjust the top margin as needed

      // doc.addImage(imageUrl, 'png', 0, 0, 200, 30);

      // doc.text(fileName + ' ' + '-' + ' ' + selectedDatetype + ':', 14, 15, { align: "center" });
      // let cellWidth = this.selectedCategory == 1 || this.selectedCategory == 4 ? {

      //   0: { cellWidth: 12 }, // Set width for column 0
      //   1: { cellWidth: 28 }, // Set width for column 1
      //   // Add more column styles as needed
      // } : {

      // };

      autoTable(doc, {
        head: [headerName],
        body: getExportdata,
        theme: 'grid', // 'striped', 'grid', 'plain', or 'css' (default is 'striped')
        headStyles: {
          fillColor: [14, 31, 83],
          // Header background color
          textColor: 255, // Header text color
          // textColor: '#0E1F5',
          fontSize: 5 // Header font size

        },
        bodyStyles: {
          textColor: 0, // Body text color
          fontSize: 5 // Body font size

        },
        // columnStyles: columnStyle,
        alternateRowStyles: {
          fillColor: [255, 255, 255] // Alternate row background color
        },
        // columnStyles: cellWidth,
        margin: { top: 45 },
        pageBreak: 'auto',
        didDrawPage: (data) => {
          // console.log('data', data.pageCount);
          // doc.addImage(imageUrl, 'png', 0, 0, 200, 30);
          doc.addImage(imageUrl, 'png', 20, 0, 250, 30);

          doc.setTextColor(14, 31, 83);
          // let titleX = this.selectedDate != 5 ? 70 : 90
          let titleY = 33;
          // doc.text(fileName, 0, 0, { align: "center" });
          doc.text(fileName, doc.internal.pageSize.getWidth() / 2, titleY, { align: "center" });

          doc.setFontSize(10);
          // let subTitle;

          // doc.text(subTitle, titleX, 25, { align: "center" });
          // if (type == "layoutProject") {
          //   doc.text(this.layoutProjectSelect, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

          // }
          // doc.setFontSize(10);
          doc.text('Page:' + ' ' + data.pageNumber + ', ' + 'Generated on: ' + formaateDate, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
        },
      },)
      debugger

      if (getExportdata.length > 0) {
        setTimeout(() => {
          doc.save(fileName + '.pdf');
        }, 100);

      } else {

      }

    } catch (error) {
      console.log('error', error);


    }


  }
  exportExcel() {

    this.excelData = this.dataSource.data.map((item, index) => ({

      'S.No': index + 1,
      'Scheme Name': item.v_NAME_OF_SCHEME,
      'Division': item.v_NAME_OF_DIVISION,
      'District': item.v_NAME_OF_DISTRICT,
      'Village': item.v_NAME_OF_VILLAGE,
      '4(1) (in acres)': item.fourone_total_extent,
      '6DD (in acres)': item.sixdd_total_extent,
      'Award (in acres)': item.v_TOTAL_EXTENT,
      'Award Amount': item.n_TOTAL_AWARD_AMOUNT,
      'DP Amount': item.award_direct_payment,
      'RD Amount': item.award_revenue_payment,
      'CC Amount': item.award_court_deposit,
      'LHO (in acres)': item.lhoExtent1,
      'Utilized (in acres)': item.utilisedExtent,
      'Not Utilized (in acres)': item.notUtilisedExtent,
      'Future Dev (in acres)': item.futureDevExtent,
      'LNHO (in acres)': item.lnhoExtent1

      // unique_code: item.unique_code,
      // land_name: item.land_name,
      // citynrural: item.citynrural,
      // division: item.division,
      // total_extent_land_acquired: item.total_extent_land_acquired,
      // extent: item.extent,
      // not_handed_over_extent: item.not_handed_over_extent,
      // legalproceedings: item.legalproceedings


    }));

    const worksheet = XLSX.utils.json_to_sheet(this.excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, 'TableData.xlsx');
  }

}