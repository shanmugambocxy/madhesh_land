import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanddataService } from '../landdata.service';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-addland',
  templateUrl: './addland.component.html',
  styleUrls: ['./addland.component.css']
})
export class AddlandComponent implements OnInit {


  isPanel1Expanded = false;
  isPanel2Expanded = false;
  isPanel3Expanded = false;
  isPanel4Expanded = false;
  LPSFormGroup: FormGroup;
  expansionPanelsArray: FormArray;

  togglePanel1() {
    this.isPanel1Expanded = !this.isPanel1Expanded;
  }

  togglePanel2() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }
  togglePanel3() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  } togglePanel4() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }

  personalInfoFormGroup!: FormGroup;
  contactInfoFormGroup!: FormGroup;

  awardInfoFormGroup!: FormGroup;
  FMBFormGroup: FormGroup;
  expansionPanelsArrayFMB: FormArray;
  fourOneFormGroup: FormGroup;
  expansionPanelsArray4: FormArray;
  sixDDFormGroup:FormGroup;
  expansionPanelsSixDD:FormArray;
  constructor(private builder: FormBuilder, private formBuilder: FormBuilder) { }
  isLinear = true;

  ngOnInit(): void {

    this.awardInfoFormGroup = this.formBuilder.group({
   
    });

    this.personalInfoFormGroup = this.formBuilder.group({
      citynrural: ['', Validators.required],
      circle: ['', Validators.required],
      division: ['', Validators.required],
      village: ['', Validators.required],
      land_name: ['', Validators.required],
      geo_tagging_geo_fencing: ['', Validators.required],
    });

    this.contactInfoFormGroup = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      // phone: ['', Validators.required]
    });

  // LPS FORM
    this.LPSFormGroup = this.formBuilder.group({
      expansionPanels: this.formBuilder.array([])
    });

    this.expansionPanelsArray = this.LPSFormGroup.get('expansionPanels') as FormArray;
    this.addExpansionPanel();
// FMB
    this.FMBFormGroup = this.formBuilder.group({
      expansionPanelsFMB: this.formBuilder.array([])
    });

    this.expansionPanelsArrayFMB = this.FMBFormGroup.get('expansionPanelsFMB') as FormArray;
    this.addExpansionPanelFMB();
// 4one
    this.fourOneFormGroup = this.formBuilder.group({
      expansionPanels4: this.formBuilder.array([])
    });

    this.expansionPanelsArray4 = this.fourOneFormGroup.get('expansionPanels4') as FormArray;
    this.addExpansionPanel4One();

    // 6DD
    this.sixDDFormGroup = this.formBuilder.group({
      expansionPanelsSix: this.formBuilder.array([])
    });

    this.expansionPanelsSixDD = this.sixDDFormGroup.get('expansionPanelsSix') as FormArray;
    this.addExpansionPanelSixDD();
  }

  addExpansionPanel4One() {
    const expansionPanel4One = this.formBuilder.group({
      file: null,
      refNo: [''],
      extent: [''],
      surveyNo: [''],
      repeatedFields: this.formBuilder.array([])
    });

    this.expansionPanelsArray4.push(expansionPanel4One);
  }
  addExpansionPanelSixDD(){
    const expansionPanelSix = this.formBuilder.group({
      file: null,
      refNo: [''],
      extent: [''],
      surveyNo: [''],
      repeatedFields: this.formBuilder.array([])
    });
    this.expansionPanelsSixDD.push(expansionPanelSix);
  }

  addExpansionPanelFMB() {
    const expansionPanelFMB = this.formBuilder.group({
      file: null,
      refNo: [''],
      extent: [''],
      surveyNo: [''],
      repeatedFields: this.formBuilder.array([])
    });

    this.expansionPanelsArrayFMB.push(expansionPanelFMB);
  }

  removeLastRepeatedField(type) {
    if (this.expansionPanelsArray.length > 0 && type === 'lps') {
      this.expansionPanelsArray.removeAt(this.expansionPanelsArray.length - 1);
    } else if (this.expansionPanelsArrayFMB.length > 0 && type === 'fmb') {
      this.expansionPanelsArrayFMB.removeAt(this.expansionPanelsArrayFMB.length - 1);
    } else if (this.expansionPanelsArray4.length > 0 && type === '4(1)') {
      this.expansionPanelsArray4.removeAt(this.expansionPanelsArray4.length - 1);
    }else if(this.expansionPanelsSixDD.length > 0 && type ==='6DD'){
      this.expansionPanelsSixDD.removeAt(this.expansionPanelsSixDD.length - 1);
    }
  }

  addExpansionPanel() {
    const expansionPanel = this.formBuilder.group({
      file: null,
      refNo: [''],
      extent: [''],
      surveyNo: [''],
      repeatedFields: this.formBuilder.array([])
    });
    this.expansionPanelsArray.push(expansionPanel);
  }

  onFileChange(event: any, panelIndex: number, type) {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    if (type === 'lps') {
      const panelFormGroup = this.expansionPanelsArray.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
      } else {
        panelFormGroup.get('file').setValue(null);
      }
    } else if (type === 'fmb') {
      const panelFormGroup = this.expansionPanelsArrayFMB.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
      } else {
        panelFormGroup.get('file').setValue(null);
      }
    }else if(type=== '4(1)'){
      const panelFormGroup = this.expansionPanelsArray4.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
      } else {
        panelFormGroup.get('file').setValue(null);
      }
    }else if(type ==='6DD'){
      const panelFormGroup = this.expansionPanelsSixDD.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
    }else {
      panelFormGroup.get('file').setValue(null);
    }
  }

  }

  submit() {
    console.log(this.personalInfoFormGroup.value);
    console.log(this.LPSFormGroup.value)
    console.log(this.FMBFormGroup.value)
    console.log(this.fourOneFormGroup.value)
     console.log(this.sixDDFormGroup.value)
  }
  removeExpansionPanel(index: number, type) {
    if (type === 'lps') {
      this.expansionPanelsArray.removeAt(index);
    } else if (type === 'fmb') {
      this.expansionPanelsArrayFMB.removeAt(index)
    }else if(type === '4(1)'){
      this.expansionPanelsArray4.removeAt(index)
    }else if(type === '6DD'){
      this.expansionPanelsSixDD.removeAt(index) 
    }
  }

  addRepeatedField(expansionPanelIndex: number, type) {
    let expansionPanel;
    let repeatedFieldsArray;
    if (type === 'lps') {
      expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    } else if (type === 'fmb') {
      expansionPanel = this.expansionPanelsArrayFMB.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }else if(type === '4(1)'){
      expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }else if(type === '6DD'){
      expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }
    const repeatedField = this.formBuilder.group({
      field1: [''],
      field2: ['']
    });

    repeatedFieldsArray.push(repeatedField);
  }

  removeRepeatedField(expansionPanelIndex: number, repeatedFieldIndex: number, type) {
    let expansionPanel;
    let repeatedFieldsArray;
    if (type === 'lps') {
      expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    } else if (type === 'fmb') {
      expansionPanel = this.expansionPanelsArrayFMB.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }else if (type === '4(1)') {
      expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }else if (type === '6DD') {
      expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('repeatedFields') as FormArray;
    }

    repeatedFieldsArray.removeAt(repeatedFieldIndex);
  }
  panelOpenState = false;   // mat expansion panel in Lps

  // Lps input field - start
  lpsFields: any[] = [];

  addLpsField() {
    const newLpsField = 'New Lps Field';
    this.lpsFields.push(newLpsField);
  }

  removeLpsField(index: number) {
    this.lpsFields.splice(index, 1);
  }
  // Lps input field - end

  // Lps form addition - start
  lpsForms: any[] = [];

  addLpsForm() {
    const newLpsIndex = this.lpsForms.length + 2;
    const newLpsForm = { index: newLpsIndex, value: '' };
    this.lpsForms.push(newLpsForm);
  }

  lpsFields2: any[] = [];

  addLpsField2() {
    const newLpsField2 = 'New Lps Field2';
    this.lpsFields2.push(newLpsField2);
  }

  removeLpsField2(index: number) {
    this.lpsFields2.splice(index, 1);
  }
  // Lps form addition - end


  // Fmb input field - start
  fmbFields: any[] = [];

  addFmbField() {
    const newFmbField = 'New Fmb Field';
    this.fmbFields.push(newFmbField);
  }

  removeFmbField(index: number) {
    this.fmbFields.splice(index, 1);
  }
  // Fmb input field - end

  // Fmb form addition - start
  fmbForms: any[] = [];

  addFmbForm() {
    const newFmbIndex = this.fmbForms.length + 2;
    const newFmbForm = { index: newFmbIndex, value: '' };
    this.fmbForms.push(newFmbForm);
  }

  fmbFields2: any[] = [];

  addFmbField2() {
    const newFmbField2 = 'New Fmb Field2';
    this.fmbFields2.push(newFmbField2);
  }

  removeFmbField2(index: number) {
    this.fmbFields2.splice(index, 1);
  }
  // Fmb form addition - end

  // Four input field - start
  fourFields: any[] = [];

  addFourField() {
    const newFourField = 'New Four Field';
    this.fourFields.push(newFourField);
  }

  removeFourField(index: number) {
    this.fourFields.splice(index, 1);
  }
  // Four input field - end

  // Four form addition - start
  fourForms: any[] = [];

  addFourForm() {
    const newFourIndex = this.fourForms.length + 2;
    const newFourForm = { index: newFourIndex, value: '' };
    this.fourForms.push(newFourForm);
  }

  fourFields2: any[] = [];

  addFourField2() {
    const newFourField2 = 'New Four Field2';
    this.fourFields2.push(newFourField2);
  }

  removeFourField2(index: number) {
    this.fourFields2.splice(index, 1);
  }
  // Four form addition - end


  // Dd input field - start
  ddFields: any[] = [];

  addDdField() {
    const newDdField = 'New Dd Field';
    this.ddFields.push(newDdField);
  }

  removeDdField(index: number) {
    this.ddFields.splice(index, 1);
  }
  // Dd input field - end

  // Dd form addition - start
  ddForms: any[] = [];

  addDdForm() {
    const newDdIndex = this.ddForms.length + 2;
    const newDdForm = { index: newDdIndex, value: '' };
    this.ddForms.push(newDdForm);
  }

  ddFields2: any[] = [];

  addDdField2() {
    const newDdField2 = 'New Dd Field2';
    this.ddFields2.push(newDdField2);
  }

  removeDdField2(index: number) {
    this.ddFields2.splice(index, 1);
  }
  // Dd form addition - end


  //left over add-start
  leftForms1: string[] = [];
  leftForms2: string[] = [];
  leftForms3: string[] = [];

  addLeftForm1() {
    const newLeftForm1 = 'New Left Form1';
    this.leftForms1.push(newLeftForm1);
  }

  addLeftForm2() {
    const newLeftForm2 = 'New Left Form2';
    this.leftForms2.push(newLeftForm2);
  }

  addLeftForm3() {
    const newLeftForm3 = 'New Left Form3';
    this.leftForms3.push(newLeftForm3);
  }
  //left over add-end

  //left over remove-start
  removeLeftForm1(index: number) {
    this.leftForms1.splice(index, 1);
  }

  removeLeftForm2(index: number) {
    this.leftForms2.splice(index, 1);
  }

  removeLeftForm3(index: number) {
    this.leftForms3.splice(index, 1);
  }
  //left over remove-end

}
