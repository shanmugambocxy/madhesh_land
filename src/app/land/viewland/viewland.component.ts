import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-viewland',
  templateUrl: './viewland.component.html',
  styleUrls: ['./viewland.component.css']
})
export class ViewlandComponent implements OnInit {

  edit = false;
  view = false;
  isPanel1Expanded = false;
  isPanel2Expanded = false;
  isPanel3Expanded = false;
  isPanel4Expanded = false;
  isLinear = false;

  @ViewChild('stepper') stepper: MatStepper;
  landId: string;


  FMBInfoFormGroup: FormGroup;
  filesTwo: any;
  filesThree: any;
  filesFour: any[];
  leftOver: any[];
  awardLists: any[]=[];
  LandData: any;
  togglePanel1() {
    this.isPanel1Expanded = !this.isPanel1Expanded;
  }

  togglePanel2() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }
  togglePanel3() {
    this.isPanel3Expanded = !this.isPanel3Expanded;
  }
  togglePanel4() {
    this.isPanel4Expanded = !this.isPanel4Expanded;
  }

  personalInfoFormGroup: FormGroup;
  LPSFormGroup: FormGroup;
  FourOneFormGroup: FormGroup;
  SixDDFormGroup: FormGroup;
  submitted = false;
  awardInfoFormGroup: FormGroup;
  leftOverGroup: FormGroup;
  awardDetailsArray: FormArray;

  index = 0;
  types = [
    { label: 'City', value: 'city' },
    { label: 'Rural', value: 'rural' },
  ];
  contactInfoFormGroup: any;
  constructor(private builder: FormBuilder, private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private commonService: CommonService, public dialog: MatDialog) {
    this.activeRoute.paramMap.subscribe(params => {
      this.landId = params.get('id');
      if (this.landId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getLandandFileDetails();
      } else if (this.router.url.includes('view')) {
        this.view = true;
      }
    })
  }
  filesOne: any;

  getLandandFileDetails() {
    const payload = {
      id: Number(this.landId)
    }
    this.commonService.apiPostCall(payload, 'getAllLandDetails').subscribe(data => {
      this.LandData = data;
      if (this.LandData) {
        this.personalInfoFormGroup.patchValue(this.LandData.firstTabList[0])
        this.filesOne = this.LandData.secondTabList;
        if (this.filesOne) {
          for (const item of this.filesOne) {
            const fileGroup = this.formBuilder.group({
              extent: [item.extent],
              fileName: [item.fileName],
              filePath: [item.filePath],
              id: [item.id],
              landName: [item.landName],
              refNo: [item.refNo],
              surveyerNo: [item.surveyerNo],
              file: null
            });
            this.filesArrayOne.push(fileGroup);

            const index = this.filesArrayOne.length - 1;
            const fileControl = fileGroup.get('file');
            // Create a File object from the file path
            const file = new File([item.fileName], item.fileName);
            console.log(file)
            // Patch the file value
            fileControl.patchValue(file);
          }
        }
        this.filesTwo = this.LandData.thirdTabList;

        if (this.filesTwo) {
          for (const item of this.filesTwo) {
            const fileGroup = this.formBuilder.group({
              extent: [item.extent],
              fileName: [item.fileName],
              filePath: [item.filePath],
              id: [item.id],
              landName: [item.landName],
              refNo: [item.refNo],
              surveyerNo: [item.surveyerNo],
              file: null
            });
            this.filesArrayTwo.push(fileGroup);

            const index = this.filesArrayTwo.length - 1;
            const fileControl = fileGroup.get('file');
            fileControl.setValidators(Validators.required); // Optional: Add validators if needed
            fileControl.updateValueAndValidity();

            // Create a File object from the file path
            const file = new File([item.fileName], item.fileName);
            // Patch the file value
            fileControl.patchValue(file);
          }
        }

        this.filesThree = this.LandData.fourthTabList;
        if (this.filesThree) {
          for (const item of this.filesThree) {
            const fileGroup = this.formBuilder.group({
              extent: [item.extent],
              fileName: [item.fileName],
              filePath: [item.filePath],
              id: [item.id],
              landName: [item.landName],
              refNo: [item.refNo],
              surveyerNo: [item.surveyerNo],
              file: null
            });
            this.filesArrayThree.push(fileGroup);

            const index = this.filesArrayThree.length - 1;
            const fileControl = fileGroup.get('file');
            fileControl.setValidators(Validators.required); // Optional: Add validators if needed
            fileControl.updateValueAndValidity();

            // Create a File object from the file path
            const file = new File([item.fileName], item.fileName);
            // Patch the file value
            fileControl.patchValue(file);
          }
        }

        this.filesFour = this.LandData.fifthTabList;
        if (this.filesFour) {
          for (const item of this.filesFour) {
            const fileGroup = this.formBuilder.group({
              extent: [item.extent],
              fileName: [item.fileName],
              filePath: [item.filePath],
              id: [item.id],
              landName: [item.landName],
              refNo: [item.refNo],
              surveyerNo: [item.surveyerNo],
              file: null
            });
            this.filesArrayFour.push(fileGroup);

            const index = this.filesArrayFour.length - 1;
            const fileControl = fileGroup.get('file');
            fileControl.setValidators(Validators.required); // Optional: Add validators if needed
            fileControl.updateValueAndValidity();

            // Create a File object from the file path
            const file = new File([item.fileName], item.fileName);
            // Patch the file value
            fileControl.patchValue(file);
          }
        }

        this.leftOver = [
          { 'surveyNumber': ['23', '45'], 'extent': ['34', '56'], 'file1': 'LPS', 'file2': '4(1)' },
          { 'surveyNumber': ['23', '85'], 'extent': ['24', '61'], 'file1': 'Award', 'file2': '6DD' }

        ]

        this.awardLists = this.LandData.seventhTabList;
        this.awardDetailsArray = this.awardInfoFormGroup.get('awardsDet') as FormArray;
        this.awardLists.forEach((item) => {
          const awardDetailsGroup = this.formBuilder.group({
            award_details_award_amount: [item.award_details_award_amount],
            award_details_date: [item.award_details_date],
            award_details_disbursement_civil_court_deposit: [item.award_details_disbursement_civil_court_deposit],
            award_details_disbursement_direct_payment: [item.award_details_disbursement_direct_payment],
            award_details_disbursement_revenue_deposit: [item.award_details_disbursement_revenue_deposit],
            award_details_extent: [item.award_details_extent],
            award_details_no: [item.award_details_no],
            award_details_notified_person: [item.award_details_notified_person],
            award_details_survey_nos: [item.award_details_survey_nos],
            filename: [item.filename],
            id: [item.id],
            landname: [item.landname],
            pho_extavailable_extent: [item.pho_extavailable_extent],
            pho_extavailable_survey_nos: [item.pho_extavailable_survey_nos],
            pho_extcannot_court_case: [item.pho_extcannot_court_case],
            pho_extcannot_encroachment: [item.pho_extcannot_encroachment],
            pho_extcannot_extent: [item.pho_extcannot_extent],
            pho_extcannot_noc_issued: [item.pho_extcannot_noc_issued],
            pho_extcannot_quashed: [item.pho_extcannot_quashed],
            pho_extcannot_reconveyed: [item.pho_extcannot_reconveyed],
            pho_extcannot_scattered: [item.pho_extcannot_scattered],
            pho_extcannot_survey_nos: [item.pho_extcannot_survey_nos],
            pho_extcannot_wantofapproach: [item.pho_extcannot_wantofapproach],
            pho_extent: [item.pho_extent],
            pho_schimpl_extent: [item.pho_schimpl_extent],
            pho_schimpl_survey_nos: [item.pho_schimpl_survey_nos],
            pnho_court_case: [item.pnho_court_case],
            pnho_encroachment: [item.pnho_encroachment],
            pnho_extent: [item.pnho_extent],
            pnho_quashed: [item.pnho_quashed],
            pnho_survey_nos: [item.pnho_survey_nos],
            pnho_without_encumbrance: [item.pnho_without_encumbrance],


          });
          this.awardDetailsArray.push(awardDetailsGroup);
        });
      
        this.awardLists.forEach((award, index) => {
         
          const awardGroup = this.awardDetailsArray.at(index) as FormGroup;
          console.log('awrdgrp',awardGroup)
          awardGroup.patchValue({
            award_details_award_amount: award.awardDetailsList[0].award_details_award_amount,
            award_details_date: award.awardDetailsList[0].award_details_date,
            award_details_disbursement_civil_court_deposit: award.awardDetailsList[0].award_details_disbursement_civil_court_deposit,
            award_details_disbursement_direct_payment:  award.awardDetailsList[0].award_details_disbursement_direct_payment,
            award_details_disbursement_revenue_deposit:  award.awardDetailsList[0].award_details_disbursement_revenue_deposit,
            award_details_extent:   award.awardDetailsList[0].award_details_extent,
            award_details_no:  award.awardDetailsList[0].award_details_no,
            award_details_notified_person:   award.awardDetailsList[0].award_details_notified_person,
            award_details_survey_nos:   award.awardDetailsList[0].award_details_survey_nos,
            filename:   award.awardDetailsList[0].filename,
            id:   award.awardDetailsList[0].id,
            landname:   award.awardDetailsList[0].landname,
            pho_extavailable_extent:   award.awardDetailsList[0].pho_extavailable_extent,
            pho_extavailable_survey_nos: award.awardDetailsList[0].pho_extavailable_survey_nos,
            pho_extcannot_court_case: award.awardDetailsList[0].pho_extcannot_court_case,
            pho_extcannot_encroachment: award.awardDetailsList[0].pho_extcannot_encroachment,
            pho_extcannot_extent: award.awardDetailsList[0].pho_extcannot_extent,
            pho_extcannot_noc_issued: award.awardDetailsList[0].pho_extcannot_noc_issued,
            pho_extcannot_quashed: award.awardDetailsList[0].pho_extcannot_quashed,
            pho_extcannot_reconveyed:award.awardDetailsList[0].pho_extcannot_reconveyed,
            pho_extcannot_scattered: award.awardDetailsList[0].pho_extcannot_scattered,
            pho_extcannot_survey_nos: award.awardDetailsList[0].pho_extcannot_survey_nos,
            pho_extcannot_wantofapproach: award.awardDetailsList[0].pho_extcannot_wantofapproach,
            pho_extent: award.awardDetailsList[0].pho_extent,
            pho_schimpl_extent:award.awardDetailsList[0].pho_schimpl_extent,
            pho_schimpl_survey_nos: award.awardDetailsList[0].pho_schimpl_survey_nos,
            pnho_court_case:award.awardDetailsList[0].pnho_court_case,
            pnho_encroachment: award.awardDetailsList[0].pnho_encroachment,
            pnho_extent: award.awardDetailsList[0].pnho_extent,
            pnho_quashed: award.awardDetailsList[0].pnho_quashed,
            pnho_survey_nos: award.awardDetailsList[0].pnho_survey_nos,
            pnho_without_encumbrance:award.awardDetailsList[0].pnho_without_encumbrance,
          });
        });
        this.awardDetailsArray.controls.forEach((control) => {
          control.disable();
        });
      }
    })


  }

  getFileUrl(index: number, type: string): string {
    let fileGroup;
    if (type === 'lps') {
      fileGroup = this.filesArrayOne.at(index);
    } else if (type === 'fmb') {
      fileGroup = this.filesArrayTwo.at(index);
    } else if (type === '4One') {
      fileGroup = this.filesArrayThree.at(index);
    } else if (type === '6DD') {
      fileGroup = this.filesArrayFour.at(index);
    }
    const file = fileGroup.get('file').value;
    return file ? URL.createObjectURL(file) : '#';
  }

  getformone(data: MatStepper, d: number) {
    this.submitted = true;
    if (this.personalInfoFormGroup.invalid) {
    } else {
      this.submitted = false;
      setTimeout(() => {
        data.selectedIndex = this.index + d;
      }, 200)
    }
  }
  newSurveyNumber: string;
  newExtent: string;

  addSurveyNumber(index) {
    if (this.newSurveyNumber && this.newSurveyNumber.trim() !== '') {
      this.leftOver[index].surveyNumber.push(this.newSurveyNumber);
      this.newSurveyNumber = '';
    }
  }

  getData(data, type) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        from: "viewfileDet",
        data: data.value
      }
    });
    dialog.afterClosed().subscribe(data => {
      if (data) {

        // this.api.apiDeleteCall(id, 'Coupon/deleteCoupon').subscribe(response => {
        //   if (response.message.includes('Successfully')) {
        //     this.snackbar.openFromComponent(SnackbarComponent, {
        //       data: response.message,
        //     });
        //     this.getCouponsList();
        //   }
        // })
      }
    })
  }

  back(){
    this.router.navigate(['/land/home']);
  }
  removeSurveyNumber(number: string) {
    if (this.view) {
      const index = this.leftOver.findIndex(item => item.surveyNumber.includes(number));
      if (index > -1) {
        const numberIndex = this.leftOver[index].surveyNumber.indexOf(number);
        if (numberIndex > -1) {
          this.leftOver[index].surveyNumber.splice(numberIndex, 1);
        }
      }
    }
  }

  addExtent(index) {
    if (this.newExtent && this.newExtent.trim() !== '') {
      this.leftOver[index].extent.push(this.newExtent);
      this.newExtent = '';
    }
  }

  removeExtent(extent: string) {
    const index = this.leftOver.findIndex(item => item.extent.includes(extent));
    if (index > -1) {
      const extentIndex = this.leftOver[index].extent.indexOf(extent);
      if (extentIndex > -1) {
        this.leftOver[index].extent.splice(extentIndex, 1);
      }
    }
  }

  ngOnInit(): void {
    this.personalInfoFormGroup = this.formBuilder.group({
      citynrural: ['', Validators.required],
      circle: ['', Validators.required],
      division: ['', Validators.required],
      village: ['', Validators.required],
      unique_code: [''],
      land_name: ['', Validators.required],
      geo_tagging_geo_fencing: ['', Validators.required],
    });

    this.LPSFormGroup = this.formBuilder.group({
      files: this.formBuilder.array([])
    });

    this.FMBInfoFormGroup = this.formBuilder.group({
      files: this.formBuilder.array([])
    });

    this.FourOneFormGroup = this.formBuilder.group({
      files: this.formBuilder.array([])
    });

    this.SixDDFormGroup = this.formBuilder.group({
      files: this.formBuilder.array([])
    });

   this.awardInfoFormGroup = this.formBuilder.group({
      awardsDet: this.formBuilder.array([]),
    });

    // Initialize form array controls for each expansion panel
    this.awardLists.forEach(() => {
      this.addAwardDetails();
    });

    // if(!this.edit && !this.view){
    //   this.addNewFileGroup();
    // }
    this.getLandandFileDetails();

  }
  getAwardDetailsArrayControls(index: number): FormArray {
    return (this.awardInfoFormGroup.get('awardsDet') as FormArray).at(index) as FormArray;
  }

  addAwardDetails() {
    const awardDetailsGroup = this.formBuilder.group({
      award_details_award_amount: [' '],
      award_details_date: [' '],
      award_details_disbursement_civil_court_deposit: [' '],
      award_details_disbursement_direct_payment: [' '],
      award_details_disbursement_revenue_deposit: [' '],
      award_details_extent: [' '],
      award_details_no: [' '],
      award_details_notified_person: [' '],
      award_details_survey_nos: [' '],
      filename: [' '],
      landname: [' '],
      pho_extavailable_extent: [' '],
      pho_extavailable_survey_nos: [' '],
      pho_extcannot_court_case: [' '],
      pho_extcannot_encroachment: [' '],
      pho_extcannot_extent: [' '],
      pho_extcannot_noc_issued: [' '],
      pho_extcannot_quashed: [' '],
      pho_extcannot_reconveyed: [' '],
      pho_extcannot_scattered: [' '],
      pho_extcannot_survey_nos: [' '],
      pho_extcannot_wantofapproach: [' '],
      pho_extent: [' '],
      pho_schimpl_extent: [' '],
      pho_schimpl_survey_nos: [' '],
      pnho_court_case: [' '],
      pnho_encroachment: [' '],
      pnho_extent: [' '],
      pnho_quashed: [' '],
      pnho_survey_nos: [' '],
      pnho_without_encumbrance: [' '],  
      });

    (this.awardInfoFormGroup.get('awardsDet') as FormArray).push(awardDetailsGroup);
  } 
  
  get filesArrayOne() {
    return this.LPSFormGroup.get('files') as FormArray;
  }

  get filesArrayTwo() {
    return this.FMBInfoFormGroup.get('files') as FormArray;
  }
  get filesArrayThree() {
    return this.FourOneFormGroup.get('files') as FormArray;
  }

  get filesArrayFour() {
    return this.SixDDFormGroup.get('files') as FormArray;

  }

  addNewFileGroup(type: string) {
    const fileGroup = this.formBuilder.group({
      file: null
    });
    if (type === 'lps') {
      this.filesArrayOne.push(fileGroup);
    } else if (type === 'fmb') {
      this.filesArrayTwo.push(fileGroup)
    } else if (type === '4One') {
      this.filesArrayThree.push(fileGroup)
    } else if (type === '6DD') {
      this.filesArrayFour.push(fileGroup)
    }
  }

  deleteFileGroup(index: number, type: string) {
    if (type === 'lps') {
      this.filesArrayOne.removeAt(index);
    } else if (type === 'fmb') {
      this.filesArrayTwo.removeAt(index);
    } else if (type === '4One') {
      this.filesArrayThree.removeAt(index);
    } else if (type === '6DD') {
      this.filesArrayFour.removeAt(index);
    }
  }
  triggerUpload(index: number, type: string) {
    let fileInput;
    if (type === 'lps') {
      fileInput = document.getElementsByClassName('file-input')[index] as HTMLInputElement;
      fileInput.click();
    } else if (type === 'fmb') {
      fileInput = document.getElementsByClassName('file-inputfmb')[index] as HTMLInputElement;
      fileInput.click();
    } else if (type === '4One') {
      fileInput = document.getElementsByClassName('file-input4One')[index] as HTMLInputElement;
      fileInput.click();
    } else if (type === '6DD') {
      fileInput = document.getElementsByClassName('file-input6DD')[index] as HTMLInputElement;
      fileInput.click();
    }
  }

  onFileChange(event: any, index: number, type: string) {

    let fileGroup;
    if (type === 'lps') {
      fileGroup = this.filesArrayOne.at(index);
    } else if (type === 'fmb') {
      fileGroup = this.filesArrayTwo.at(index);
    } else if (type === '4One') {
      fileGroup = this.filesArrayThree.at(index);
    } else if (type === '6DD') {
      fileGroup = this.filesArrayFour.at(index);
    }
    const file = event.target.files[0];
    fileGroup.patchValue({ file: file });

  }

  getFileName(index: number, type: string): string {
    let fileGroup;
    if (type === 'lps') {
      fileGroup = this.filesArrayOne.at(index);
    } else if (type === 'fmb') {
      fileGroup = this.filesArrayTwo.at(index);
    } else if (type === '4One') {
      fileGroup = this.filesArrayThree.at(index);
    } else if (type === '6DD') {
      fileGroup = this.filesArrayFour.at(index);

    }

    const file = fileGroup.get('file').value;
    return file ? file.name : 'No file selected';
  }

  submitForm() {
    // Implement your form submission logic here
    console.log('Form submitted!');
  }




}



