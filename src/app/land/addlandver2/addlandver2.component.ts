import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { LandDigitDataEntity, SaveLandApiModel } from '../home/home.component';
import { AddVerService } from './add-ver.service';
import { AwardTabDeatil, FourOneTabDeatil, LandDigitMediaModel, Root, SixDdTabDeatil } from './addlandver.model';
import * as uuid from 'uuid';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Console } from 'console';
declare var AWS: any;

@Component({
  selector: 'app-addlandver2',
  templateUrl: './addlandver2.component.html',
  styleUrls: ['./addlandver2.component.css']
})
export class Addlandver2Component {

  villages = [
    'Neelagiri Therku Thottam',
    'Maharajasamuthiram',
    'Nagapattinam',
    'PATTINAMKATHAN',
    'SAKKARAIKOTTAI',
    'KAMUTHAKUDI & KATTUPARAMAKUDI',
    'Soorankottai',
    'Ponneri',
    'Kilmudalambedu',
    'Purasaiwakkam 1',
    'Purasaiwakkam 2',
    'Egmore Nungambakkam',
    'Sevilimedu',
    'Pappankuzhi',
    'Sivakanchi part of Konerikuppam',
    'Tirupattur',
    'S.Pallipattu',
    'Ambur',
    'Tiruvannamalai',
    'Arcot',
    'Walajah Town',
    'Anandhalai',
    'Seekarajapuram',
    'Arakkonam',
    'Sathuvachari',
    'Alamelurangapuram',
    'Kondasamuthiram',
    'Tirur',
    'Sevvapet',
    'Vellavedu',
    'Narasingapuram',
    'Parvatharajapuram',
    'Chembarambakkam',
    'Kuthambakkam',
    'Chitravuthan palayam',
    'ERODE "c"',
    'Erode & Surampatti',
    'Periyar Nagar',
    'Surampatty',
    'Erode "A"',
    'Erode & Periyasemur',
    'Erode',
    'Ayyamperumalpatty',
    'Kannankurichi',
    'EDAPPADY',
    'AVANI PERUR WEST',
    'KOTTAGOUNDAMPATTY - BLOCK I',
    'KOTTAGOUNDAMPATTY - BLOCK II',
    'KOTTAGOUNDAMPATTY - BLOCK III',
    'Maravaneri',
    'Maravaneri',
    'Alagapuram Pudur',
    'Alagapuram & Hasthampatty',
    'ANNADHANAPATTY',
    'DHADAGAPATTY WARD I BLOCK 1',
    'Jagir Ammapalayam',
    'ATTUR',
    'Kandampatty West',
    'Bodinaickenpatty',
    'Kandampatty east',
    'Thathampatty',
    'Periyeri Village',
    'VAGURAMPATTY',
    'NAMAKKAL',
    'KONDICHETTIPATTY',
    'PALLIPALAYAM VILLAGE',
    'Pudupalayam Agraharam',
    'KADACHANALLUR',
    'KADACHANALLUR',
    'TIRUCHENGODE',
    'MUTHANAMPALAYAM',
    'KOOTTAPALLI',
    'Hosur',
    'Chennathur',
    'Avalapalli',
    'Chennthur',
    'Moranapalli',
    'Naligapata Agraharam',
    'Naligapeta Agraharam',
    'Rangopanditha Agraharam',
    'Nallur',
    'Kattinganapalli',
    'A.jettihalli',
    'Virupakshipuram',
    'Navalpattu',
    'Kumbakudi',
    'Valavanthankottai',
    'Valavanthankottai  ( SIDCO )',
    'Sinthamani',
    'k.k.Nagar',
    'singalanthapuram',
    'Sinapiratty',
    'thanthoni',
    'Kurumbanchavadi',
    'Puthukottai',
    'UCHAPATTI ',
    'UCHAPATTI',
    'THOPPUR',
    'Maharajapuram',
    'KEELPERUMPAKKAM',
    'Panampattu',
    'Salamedu',
    'Nathapattu',
    'VELISEMMANDALAM',
    'Villavarayanatham',
    'Anaikuppam',
    'Pachaiyankuppam',
    'V.M.Chathram',
    'Alampatti',
    'Sankaraperi',
    'Tenkasi',
    'Nagercoil',
    'Vadiveeshwaram',
    'Keelanatham',
    'Kulavanigarpuram',
    'Meelavittan',
    'N/A',
    'Vilangudi',
    'Padanthal',
    'Thimmarasanaikkanur',
    'Andipatty',
    'RJPM - VadakkuVenganallur',
    'RJPM - Sammandhapuram',
    'Palayampatti-Unit - II',
    'Palayampatti- Chathradattiyapatti',
    'Anaiyor',
    'Thiruthangal',
    'VNR- Enjar -Unit -1',
    'VNR- Enjar -Unit -II',
    'Villipathiri (V) Unit-I',
    'Villipathiri (V) Unit -I',
    'Villipathiri (V) Unit -II',
    'Kottapatti',
    'Allampatti',
    'Silayaneri',
    'Thathaneri',
    'exclution 10099/G2/83-8',
    'Chettinayakanpatti',
    'Kurumbupatti',
    'Madakulam',
    'Ponmeni',
    'West Madurai',
    'Kolathur',
    'Mogappair',
    'Padi',
    'Koyambedu',
    'Thirumangalam',
    'Arumbakkam',
    'Periyakudal',
    'Aminjikarai',
    'Chinnakudal',
    'Agaramvada',
    'Mullam',
    'Villivakkam',
    'Ayanavaram',
    'Naduvakarai',
    'Perambur',
    'Erunkancheri',
    'Kilmudhalambedu',
    'Purasawakkam',
    'Kodungaiyur',
    'Tondiarpet',
    'Korattur',
    'SARAVANAMPATTY NHS',
    'VADAVALLI',
    'CHIKKADASAMPALAYAM',
    'SINGANALLUR',
    'TELUNGUPALAYAM',
    'KRISHNARAYAPURAM - GNS Block - V',
    'KUMARAPALAYAM',
    'SOWRIPALAYAM',
    'KALAPATTI (AERODROME)',

    // ! karthick added need to modify to backend because column is not present 

    // Coimbatore district



    'Tatabad',
    'Seeranaicken palayam',
    'Kavundampalayam',
    'Ganapathy',
    'Vilankurichi',
    'Vellakinar',
    'Veerakeralam',
    'Upplipalayam Phase - 1',
    'Upplipalayam phase - 2',
    'Kalapatti',
    'Sundakamuthur(Kovaipudhur)',


    //Tiruppur district

    'Velampalayam Phase-1',
    'Velampalayam phase-2',
    'Rakkiyapalayam',
    'Seyur',
    'Udumalapet',

    // J J nagar division Chennai circle-1 Chennai district
    'Mogappair village',
    'Nolambur Village',
    'Ambattur Village',
    'Thiruvallur district',
    'Perumalagaram Village',
    'Ayyapakkam Village',


  ];
  divisionSelectList: any;
  districtSelectList: any;
  villageSelectList: any;
  accesslevel1: any;
  group_name: any;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  isPanel1Expanded = false;
  isPanel2Expanded = false;
  isPanel3Expanded = false;
  isPanel4Expanded = false;
  LPSFormGroup: FormGroup;
  expansionPanelsArray: FormArray;
  @ViewChild('stepper') stepper: MatStepper;
  index = 0;
  panelOneForm: FormGroup;
  panelTwoForm: FormGroup;
  panelThreeForm: FormGroup;
  landId: string;
  edit = false;
  view = false;
  image: any;
  deletedFiles: any[] = [];
  court_file_STRING: string = null;
  road_file_STRING: string = null;
  enchro_file_STRING: string = null;
  scatt_file_STRING: string = null;
  quash_file_STRING: string = null;
  recon_file_STRING: string = null;
  noc_file_STRING: string = null;
  pnho_court_file_STRING: string = null;
  pnho_enchro_file_STRING: string = null;
  pnho_quash_file_STRING: string = null;
  pnho_encumbr_file_STRING: string = null;

  court_file_STRINGName: string = null;
  road_file_STRINGName: string = null;
  enchro_file_STRINGName: string = null;
  scatt_file_STRINGName: string = null;
  quash_file_STRINGName: string = null;
  recon_file_STRINGName: string = null;
  noc_file_STRINGName: string = null;
  pnho_court_file_STRINGName: string = null;
  pnho_enchro_file_STRINGName: string = null;
  pnho_quash_file_STRINGName: string = null;
  pnho_encumbr_file_STRINGName: string = null;

  court_file_PATH: string = null;
  road_file_PATH: string = null;
  enchro_file_PATH: string = null;
  scatt_file_PATH: string = null;
  quash_file_PATH: string = null;
  recon_file_PATH: string = null;
  noc_file_PATH: string = null;
  pnho_court_file_PATH: string = null;
  pnho_enchro_file_PATH: string = null;
  pnho_quash_file_PATH: string = null;
  pnho_encumbr_file_PATH: string = null;
  court_file_PATH_ID: number;
  road_file_PATH_ID: number;
  enchro_file_PATH_ID: number;
  scatt_file_PATH_ID: number;
  quash_file_PATH_ID: number;
  recon_file_PATH_ID: number;
  noc_file_PATH_ID: number;
  pnho_court_file_PATH_ID: number;
  pnho_enchro_file_PATH_ID: number;
  pnho_quash_file_PATH_ID: number;
  pnho_encumbr_file_PATH_ID: number;
  circleSelectList: any[];

  addOwner4oneButtonDisable: boolean = false;

  togglePanel1() {
    this.isPanel1Expanded = !this.isPanel1Expanded;
  }
  togglePanel2() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }
  togglePanel3() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }
  togglePanel4() {
    this.isPanel2Expanded = !this.isPanel2Expanded;
  }

  personalInfoFormGroup: FormGroup;
  fourOneFormGroup: FormGroup;
  expansionPanelsArray4: FormArray;
  sixDDFormGroup: FormGroup;
  expansionPanelsSixDD: FormArray;
  awardInfoFormGroup: FormGroup;
  expansionPanelsAward: FormArray
  leftInfoFormGroup: FormGroup;
  expansionPanelsLeft: FormArray;
  // Assign Values
  landDigitDataEntity: LandDigitDataEntity;
  lpsTabDetails: any;
  fourOneTabDeatils: FourOneTabDeatil[]
  sixDDDeatils: SixDdTabDeatil[]
  awardDeatils: AwardTabDeatil[]
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  videoSelect = false;
  mainImageSrc!: string;
  apiMainImageSrc!: string;
  images: Array<string> = [];
  apiMainImages: Array<string> = [];
  video!: string;
  noImage = "assets/no_found.jpeg"
  apiVideoUrl!: string;
  leftoverTabDeatils: any;
  landDigitMediaFiles: LandDigitMediaModel[]
  imageArray: string[] = []; // Declare an array variable
  isLinear = true;
  allFiles: any;
  allLandData: Root;
  n_UNIQUE_ID: number;
  firstTabMode = 'create' || 'edit' || 'delete';
  secondTabMode = 'create' || 'edit' || 'delete';
  thirdTabMode = 'create' || 'edit' || 'delete';
  aws_SecretKey: any;
  isLoader: boolean = false;
  allCircleDropdown: any;
  allCircleDivisionDdr: any;
  circleNames: any;
  circleDropDownName: any;


  constructor(private builder: FormBuilder, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private adVerSer: AddVerService,
    private cdr: ChangeDetectorRef, private commonService: CommonService, private activeRoute: ActivatedRoute, private router: Router, private snackbar: MatSnackBar,
    private datePipe: DatePipe, private http: HttpClient,
    public dialog: MatDialog,) {
    this.activeRoute.paramMap.subscribe(params => {
      this.landId = params.get('id');
      if (this.landId && this.router.url.includes('edit')) {
        this.callApi();
        this.edit = true;
      } else if (this.router.url.includes('view')) {
        this.callApi();
        this.view = true;
      }
    })
    if (!this.landId) {
      this.mainImageSrc = this.noImage;
    } else {
      const apiMediasDatas = this.landDigitMediaFiles;
    }
  }

  openFile(filePath: string): string {
    return 'file://' + filePath.replace(/\\/g, '/');
  }

  getAWSSecretKey() {

    this.commonService.aws_SecretKey('awsconfig').subscribe(res => {
      if (res) {
        this.aws_SecretKey = res;
        console.log('this.aws_SecretKey', this.aws_SecretKey);


      }
    })


  }

  getMediasDatasFromApi(data: any) {
    if (data) {
      data.forEach((item) => {
        let byteArray = atob(item.mediaData);
        let byteNumbers = new Array(byteArray.length);
        for (let i = 0; i < byteArray.length; i++) {
          byteNumbers[i] = byteArray.charCodeAt(i);
        }
        let byteArrayUint8 = new Uint8Array(byteNumbers);
        let blob = new Blob([byteArrayUint8], { type: item.fileType });
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          var base64String = reader.result as string;
          this.image = base64String;
          this.imageArray.push(this.image);
          const video = this.imageArray.filter(a => a.includes('video'));
          this.video = video[0];
          const image = this.imageArray.filter(i => i.includes('image'));
          this.images = image;
          this.mainImageSrc = image[0];
        };
      });
    }
  }

  onFileChangeimg(event: any) {
    const files = event.target.files;
    this.allFiles = event.target.files
    if (files.length > 0) {
      const file = files[0];
      if (file) {
        this.handleImageVideoUpload(file);
      }
    }
  }

  handleImageVideoUpload(file: File) {
    const reader = new FileReader();
    if (this.allFiles && this.allFiles[0]) {
      const numberOfFiles = this.allFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target)
          if (e.target.result.includes('image')) {
            this.images.push(e.target.result);
            this.mainImageSrc = this.images[0];
          } else {
            // const videoElement = document.createElement('video');
            // videoElement.preload = 'metadata';
            // videoElement.onloadedmetadata = () => {
            //   window.URL.revokeObjectURL(videoElement.src);
            //   if (videoElement.duration < 5 || videoElement.duration > 30) {
            //     this.snackbar.openFromComponent(SnackbarComponent, {
            //       data:"Video duration should be between 10 and 30 seconds.",
            //     });
            //     return;
            //   }
            this.video = e.target.result;
            this.videoSelect = true;
            // };
            // videoElement.src = URL.createObjectURL(file);
          }

        }
        reader.readAsDataURL(this.allFiles[i]);
      }
    }
  }

  selectImage(image: string) {
    this.mainImageSrc = image;
    this.videoSelect = false;
  }
  selectVideo(video: string) {
    this.videoSelect = true;
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    if (!this.images.length) {
      this.mainImageSrc = this.noImage;
    }
  }

  removeVideo() {
    this.video = "";
    if (this.video === "" || !this.images.length) {
      this.mainImageSrc = this.noImage;
    }
  }

  clearFileInput() {
    this.fileInput.nativeElement.value = '';
  }


  back() {
    this.router.navigate(['/land/home']);
  }

  ngOnInit(): void {
    this.accesslevel1 = sessionStorage.getItem('accesslevel1');
    this.group_name = sessionStorage.getItem('group_name');
    this.getdivision();
    this.firstTabMode = 'edit';
    this.secondTabMode = 'create';
    this.thirdTabMode = 'create';
    this.getAWSSecretKey();
    this.personalInfoFormGroup = this.formBuilder.group({
      n_UNIQUE_ID: ['',],
      v_NAME_OF_CIRCLE: ['', Validators.required],
      v_NAME_OF_DISTRICT: [''],
      v_NAME_OF_DIVISION: ['', Validators.required],
      v_VILLAGE: [''],

      // v_NAME_OF_GEO_TAGGING: ['', Validators.required],

      v_NAME_OF_SCHEME: ['', Validators.required],
      mode: ['edit', null],
    });

    // LPS FORM
    this.LPSFormGroup = this.formBuilder.group({
      expansionPanels: this.formBuilder.array([])
    });

    this.expansionPanelsArray = this.LPSFormGroup.get('expansionPanels') as FormArray;
    if (!this.landId) {
      this.addExpansionPanel(); //797
    }

    // 4one
    this.fourOneFormGroup = this.formBuilder.group({
      expansionPanels4: this.formBuilder.array([])
    });

    this.expansionPanelsArray4 = this.fourOneFormGroup.get('expansionPanels4') as FormArray;
    if (!this.landId) {
      this.addExpansionPanel4One();
    }

    // 6DD
    this.sixDDFormGroup = this.formBuilder.group({
      expansionPanelsSix: this.formBuilder.array([])
    });

    this.expansionPanelsSixDD = this.sixDDFormGroup.get('expansionPanelsSix') as FormArray;
    if (!this.landId) {
      this.addExpansionPanelSixDD();
    }
    // Award
    this.awardInfoFormGroup = this.formBuilder.group({
      expansionPanelsAward: this.formBuilder.array([]),
    });

    this.expansionPanelsAward = this.awardInfoFormGroup.get('expansionPanelsAward') as FormArray;
    // this.addExpansionPanelAward();
    if (!this.landId) {
      this.addExpansionPanelAward();
    }

    // LeftOver
    this.leftInfoFormGroup = this.formBuilder.group({
      expansionPanelsLeft: this.formBuilder.array([]),
    });

    // Left Over
    if (this.n_UNIQUE_ID === undefined) {
      this.panelOneForm = this.formBuilder.group({
        leftOverLPS4OneEntity: this.formBuilder.array([
          this.generateItemLeft('edit')
        ])
      });

      this.panelTwoForm = this.formBuilder.group({
        left4One6DDEntity: this.formBuilder.array([

          this.generateItemLeft('edit')
        ])
      });

      this.panelThreeForm = this.formBuilder.group({
        left6DDAwardEntity: this.formBuilder.array([
          this.generateItemLeft('edit')
        ])
      });
    }

    this.expansionPanelsLeft = this.leftInfoFormGroup.get('expansionPanelsLeft') as FormArray;
    this.addExpansionPanelLeft();

    // if (this.view) {
    //   this.personalInfoFormGroup.disable();
    //   this.LPSFormGroup.disable();
    //   this.panelOneItems.disable();
    //   this.panelThreeItems.disable();
    //   this.panelTwoItems.disable();
    //   this.fourOneFormGroup.disable();
    //   this.sixDDFormGroup.disable();
    //   this.expansionPanelsArray.disable();
    //   this.expansionPanelsArray4.disable();
    //   this.expansionPanelsSixDD.disable();
    //   this.expansionPanelsAward.disable();
    // }

    this.getAllCircleName()
    // this.getCirDivDisVil()
  }

  getAllCircleName() {
    this.commonService.apiGetCall('Circle').subscribe(responce => {
      this.allCircleDropdown = responce
      console.log("all circle dropdown = = = =", this.allCircleDropdown);

      // if (this.allCircleDropdown.length > 0) {
      //   this.personalInfoFormGroup.patchValue({
      //     v_NAME_OF_CIRCLE: this.allCircleDropdown[0]
      //   })
      // }
      this.circleDropDownName = this.personalInfoFormGroup.controls['v_NAME_OF_CIRCLE'].value;
      console.log(this.circleDropDownName, "Hello Circle Drop Down");
    });
  }

  getCirDivDisVil() {
    debugger
    // let apiCall = 'Division/' + this.circleDropDownName
    // let apiCall1 = 'Division/Madurai'
    let circleName = this.personalInfoFormGroup.controls['v_NAME_OF_CIRCLE'].value;
    let selectedCircle = circleName ? circleName : '';
    let apiUrl = "Division/";
    let apiCall = apiUrl + selectedCircle;
    console.log(apiUrl, "name of api string call");

    // console.log(apiCall1, "name of api call actual 1");

    this.commonService.apiGetCall(apiCall).subscribe(response => {
      this.allCircleDivisionDdr = response;
      console.log("get All Circle And Division Name Name ===== ", this.allCircleDivisionDdr);

      // if (this.allCircleDivisionDdr.length > 0) {
      //   // Patch the first value to the form control
      //   this.personalInfoFormGroup.patchValue({
      //     v_NAME_OF_DIVISION: this.allCircleDivisionDdr[0]
      //   });
      // }
      // this.getDistrict();

    });

  }
  getDistrict() {
    debugger
    let circleName = this.personalInfoFormGroup.controls['v_NAME_OF_CIRCLE'].value ? this.personalInfoFormGroup.controls['v_NAME_OF_CIRCLE'].value : '';
    let division = this.personalInfoFormGroup.controls['v_NAME_OF_DIVISION'].value ? this.personalInfoFormGroup.controls['v_NAME_OF_DIVISION'].value : '';
    let apiUrl = "District/";
    let apicall = apiUrl + circleName + '/' + division;
    this.commonService.apiGetCall(apicall).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.districtSelectList = res;
        // this.personalInfoFormGroup.patchValue({
        //   v_NAME_OF_DISTRICT: this.districtSelectList[0]
        // });
      } else {
        this.districtSelectList = [];
      }
      // this.getVillage();
    })
  }
  getVillage() {
    debugger
    let circleName = this.personalInfoFormGroup.controls['v_NAME_OF_CIRCLE'].value ? this.personalInfoFormGroup.controls['v_NAME_OF_CIRCLE'].value : '';
    let division = this.personalInfoFormGroup.controls['v_NAME_OF_DIVISION'].value ? this.personalInfoFormGroup.controls['v_NAME_OF_DIVISION'].value : '';
    let district = this.personalInfoFormGroup.controls['v_NAME_OF_DISTRICT'].value ? this.personalInfoFormGroup.controls['v_NAME_OF_DISTRICT'].value : '';
    let apiUrl = "Village/";
    let apicall = apiUrl + circleName + '/' + division + '/' + district;
    this.commonService.apiGetCall(apicall).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.villageSelectList = res;
        // this.personalInfoFormGroup.patchValue({
        //   v_NAME_OF_VILLAGE: this.villageSelectList[0]
        // });
      } else {
        this.villageSelectList = [];

      }
    })
  }



  generateItemLeft(mode: string): FormGroup {
    return this.formBuilder.group({
      // V_NAME_OF_VILLAGE:'',
      v_SURVEY_NO: '',
      v_EXTENT: '',
      mode: mode,
      n_ID: null,
      primarykey: null,
      n_UNIQUE_ID: this.n_UNIQUE_ID
    });
  }

  get panelOneItems() {
    return this.panelOneForm.get('leftOverLPS4OneEntity') as FormArray;
  }

  get panelTwoItems() {
    return this.panelTwoForm.get('left4One6DDEntity') as FormArray;
  }

  get panelThreeItems() {
    return this.panelThreeForm.get('left6DDAwardEntity') as FormArray;
  }

  deletedLeftOverArray: any[] = [];


  addFields(formArray: FormArray) {
    console.log("LpsformArray", formArray, "this.n_UNIQUE_ID", this.n_UNIQUE_ID);
    formArray.push(this.generateItemLeft('edit'));
  }

  removeFieldss(formArray: FormArray, index: number, formArrayName: string) {
    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: (formArray.at(index) as FormGroup).value,
    };
    this.deletedLeftOverArray.push(deletedData)
    formArray.removeAt(index);
  }

  callApi() {

    const apiBodyMain = {
      "id": Number(this.landId)
    }

    console.log("apiBodyMain:", apiBodyMain);
    this.commonService.apiPostCall(apiBodyMain, 'getAllLandDigitDatas').subscribe((mainApiData) => {
      this.allLandData = mainApiData.data;
      console.log("allLandData:", this.allLandData)
      if (this.allLandData) {
        // land DETAILS
        this.landDigitDataEntity = mainApiData.data.landDigitDataEntity;
        this.n_UNIQUE_ID = this.landDigitDataEntity.n_UNIQUE_ID;
        this.personalInfoFormGroup.patchValue(this.landDigitDataEntity);
        // land Details Media First Tab
        this.landDigitMediaFiles = mainApiData.data?.landDigitMediaFiles ? mainApiData.data?.landDigitMediaFiles : [];
        if (this.landDigitMediaFiles.length) {
          this.getMediasDatasFromApi(this.landDigitMediaFiles);
        }

        // lps data
        this.lpsTabDetails = mainApiData.data?.lpsTabDetails;
        if (this.lpsTabDetails) {
          this.lpsTabDetails?.forEach((lapDetail, i) => {
            this.addExpansionPanel();
            const expansionPanel = this.expansionPanelsArray.at(i) as FormGroup;
            // Patch the main fields (v_FILE_NAME, v_REF_NO, v_TOTAL_EXTENT, mode, etc.)
            expansionPanel.patchValue({
              v_FILE_NAME: this.lpsTabDetails[i].v_FILE_NAME,
              v_FILE_PATH: this.lpsTabDetails[i].v_FILE_PATH,
              // v_REF_NO: this.lpsTabDetails[i].v_REF_NO,
              v_TOTAL_EXTENT: this.lpsTabDetails[i].v_TOTAL_EXTENT,
              mode: "edit",
              n_ID: this.lpsTabDetails[i].n_ID,
              n_UNIQUE_ID: this.lpsTabDetails[i].n_UNIQUE_ID,
            });
            console.log("expansionPanel", expansionPanel);
            // Patch the dynamicValuesDetails FormArray
            const dynamicValuesArray = expansionPanel.get('dynamicValuesDetails') as FormArray;
            dynamicValuesArray.clear(); // Clear the existing FormArray

            for (const dynamicValue of this.lpsTabDetails[i].dynamicValuesDetails) {
              dynamicValuesArray.push(this.formBuilder.group({
                v_COLUMN_NAME: dynamicValue.v_COLUMN_NAME,
                v_VALUE_NAME: dynamicValue.v_VALUE_NAME,
                mode: "edit",
                n_UNIQUE_ID: dynamicValue.n_UNIQUE_ID,
                n_ID: dynamicValue.n_ID,
                n_FILE_ID: this.lpsTabDetails[i].n_ID,
                v_FILE_NAME: dynamicValue.v_FILE_NAME
              }));
            }
            // Patch the lpsVillageDetails FormArray
            const lpsVillageDetailsArray = expansionPanel.get('lpsVillageDetails') as FormArray;
            lpsVillageDetailsArray.clear();

            for (const lpsVillage of this.lpsTabDetails[i].lpsVillageDetails) {
              console.log(lpsVillage.v_NAME_OF_VILLAGE)
              lpsVillageDetailsArray.push(this.formBuilder.group({
                v_NAME_OF_VILLAGE: lpsVillage.v_NAME_OF_VILLAGE,
                // v_NAME_OF_VILLAGE: lpsVillage.v_NAME_OF_VILLAGE,
                mode: "edit",
                n_UNIQUE_ID: lpsVillage.n_UNIQUE_ID,
                v_SURVEY_NO: lpsVillage.v_SURVEY_NO,
                v_EXTENT: lpsVillage.v_EXTENT,
                n_ID: lpsVillage.n_ID,
                n_FILE_ID: this.lpsTabDetails[i].n_ID
              }));
            }

            const fileValuesArray = expansionPanel.get('lpsFileDynamicValuesDetails') as FormArray;
            fileValuesArray.clear(); // Clear the existing FormArray

            for (const dynamicValue of this.lpsTabDetails[i].lpsFileDynamicValuesDetails) {
              console.log(dynamicValue)
              fileValuesArray.push(this.formBuilder.group({
                v_FILE_NAME: [dynamicValue.v_FILE_NAME],
                // n_FILE_ID: dynamicValue.n_FILE_ID,
                n_UNIQUE_ID: dynamicValue.n_UNIQUE_ID,
                n_ID: dynamicValue.n_ID,
                mode: "edit",
                v_FILE_PATH: [dynamicValue.v_FILE_PATH],
                n_FILE_ID: this.lpsTabDetails[i].n_ID
              }));
            }

            this.cdr.detectChanges();
          })
        }

        // 4(1) data
        this.fourOneTabDeatils = mainApiData.data.fourOneTabDeatils;

        this.fourOneTabDeatils.forEach((thirdDetail, i) => {
          this.addExpansionPanel4One()
          const fourOneFormGroup = (this.expansionPanelsArray4.at(i) as FormGroup);
          fourOneFormGroup.patchValue({
            v_FILE_1_FILENAME: this.fourOneTabDeatils[i].v_FILE_1_FILENAME,
            v_FILE_1_FILEPATH: this.fourOneTabDeatils[i].v_FILE_1_FILEPATH,
            v_FILE_2_FILENAME: this.fourOneTabDeatils[i].v_FILE_2_FILENAME,
            v_FILE_2_FILEPATH: this.fourOneTabDeatils[i].v_FILE_2_FILEPATH,
            v_GAZETTE_REF_NO: this.fourOneTabDeatils[i].v_GAZETTE_REF_NO,
            // v_4_ONE_GO_REF_NO: this.fourOneTabDeatils[i].v_4_ONE_GO_REF_NO,
            d_DATE_OF_4_ONE_GO: this.fourOneTabDeatils[i].d_DATE_OF_4_ONE_GO,
            // d_DATE_OF_GAZETTE_NOTIFICATION: this.fourOneTabDeatils[i].d_DATE_OF_GAZETTE_NOTIFICATION,
            // d_DATE_OF_LOCALITY: this.fourOneTabDeatils[i].d_DATE_OF_LOCALITY,
            // v_REF_NO: this.fourOneTabDeatils[i].v_REF_NO,
            v_TOTAL_EXTENT: this.fourOneTabDeatils[i].v_TOTAL_EXTENT,
            mode: "edit",
            n_ID: this.fourOneTabDeatils[i].n_ID,
            n_UNIQUE_ID: this.fourOneTabDeatils[i].n_UNIQUE_ID,
          });
          this.addOwner4oneButtonDisable = false;
          console.log(fourOneFormGroup);
          // Patch the dynamicValuesDetails FormArray
          const dynamicValuesArray = fourOneFormGroup.get('dynamicValuesDetails') as FormArray;
          dynamicValuesArray.clear(); // Clear the existing FormArray

          for (const dynamicValue of this.fourOneTabDeatils[i].dynamicValuesDetails) {
            dynamicValuesArray.push(this.formBuilder.group({
              v_COLUMN_NAME: dynamicValue.v_COLUMN_NAME,
              v_VALUE_NAME: dynamicValue.v_VALUE_NAME,
              mode: "edit",
              n_UNIQUE_ID: dynamicValue.n_UNIQUE_ID,
              n_ID: dynamicValue.n_ID,
              n_FILE_ID: this.fourOneTabDeatils[i].n_ID,
              v_FILE_NAME: dynamicValue.v_FILE_NAME
            }));
          }

          const fourOneDetailsArray = fourOneFormGroup.get('fourOneDynamicFileEntityDetails') as FormArray;
          fourOneDetailsArray.clear();
          for (const fourOne of this.fourOneTabDeatils[i].fourOneDynamicFileEntityDetails) {
            fourOneDetailsArray.push(this.formBuilder.group({
              v_VILLAGE: fourOne.v_VILLAGE,
              v_SURVEY_NO: fourOne.v_SURVEY_NO,
              v_EXTENT_NO: fourOne.v_EXTENT_NO,
              v_NAME_OF_OWNER: fourOne.v_NAME_OF_OWNER,
              // v_EAST: fourOne.v_EAST,
              // v_WEST: fourOne.v_WEST,
              // v_NORTH: fourOne.v_NORTH,
              // v_SOUTH: fourOne.v_SOUTH,
              mode: "edit",
              n_UNIQUE_ID: fourOne.n_UNIQUE_ID,
              n_FILE_ID: this.fourOneTabDeatils[i].n_ID,
              n_ID: fourOne.n_ID
            }));
          }
          console.log("fourOneDetailsArray", fourOneDetailsArray);
        })


        // SixDD tab
        this.sixDDDeatils = mainApiData.data.sixDdTabDeatils;
        this.sixDDDeatils.forEach((fourthDetail, i) => {
          this.addExpansionPanelSixDD();

          const sixDDFormGroup = (this.expansionPanelsSixDD.at(i) as FormGroup);
          sixDDFormGroup.patchValue({
            v_FILE_1_FILENAME: this.sixDDDeatils[i].v_FILE_1_FILENAME,
            v_FILE_1_FILEPATH: this.sixDDDeatils[i].v_FILE_1_FILEPATH,
            v_FILE_2_FILENAME: this.sixDDDeatils[i].v_FILE_2_FILENAME,
            v_FILE_2_FILEPATH: this.sixDDDeatils[i].v_FILE_2_FILEPATH,
            v_GAZETTE_REF_NO: this.sixDDDeatils[i].v_GAZETTE_REF_NO,
            // v_6DD_GO_REF_NO: this.sixDDDeatils[i].v_6DD_GO_REF_NO,
            d_DATE_OF_6DD_GO: this.sixDDDeatils[i].d_DATE_OF_6DD_GO,
            // d_DATE_OF_GAZETTE_NOTIFICATION: this.sixDDDeatils[i].d_DATE_OF_GAZETTE_NOTIFICATION,
            // d_DATE_OF_LOCALITY: this.sixDDDeatils[i].d_DATE_OF_LOCALITY,
            // v_REF_NO: this.sixDDDeatils[i].v_REF_NO,
            v_TOTAL_EXTENT: this.sixDDDeatils[i].v_TOTAL_EXTENT,
            n_ID: this.sixDDDeatils[i].n_ID,
            n_UNIQUE_ID: this.sixDDDeatils[i].n_UNIQUE_ID,
            mode: "edit",
          });

          // Patch the dynamicValuesDetails FormArray
          const dynamicValuesArray = sixDDFormGroup.get('dynamicValuesDetails') as FormArray;
          dynamicValuesArray.clear(); // Clear the existing FormArray

          for (const dynamicValue of this.sixDDDeatils[i].dynamicValuesDetails) {
            dynamicValuesArray.push(this.formBuilder.group({
              v_COLUMN_NAME: dynamicValue.v_COLUMN_NAME,
              v_VALUE_NAME: dynamicValue.v_VALUE_NAME,
              mode: "edit",
              n_UNIQUE_ID: dynamicValue.n_UNIQUE_ID,
              n_ID: dynamicValue.n_ID,
              n_FILE_ID: this.sixDDDeatils[i].n_ID,
              v_FILE_NAME: dynamicValue.v_FILE_NAME,
            }));
          }

          const sixddDetailsArray = sixDDFormGroup.get('sixDdDynamicFileEntityValuesDetails') as FormArray;
          sixddDetailsArray.clear();
          for (const sixDD of this.sixDDDeatils[i].sixDdDynamicFileEntityValuesDetails) {
            sixddDetailsArray.push(this.formBuilder.group({
              // v_VILLAGE: '',
              v_VILLAGE: sixDD.v_VILLAGE,
              n_ID: sixDD.n_ID,
              v_SURVEY_NO: sixDD.v_SURVEY_NO,
              v_EXTENT: sixDD.v_EXTENT,
              v_NAME_OF_OWNER: sixDD.v_NAME_OF_OWNER,
              mode: "edit",
              n_UNIQUE_ID: sixDD.n_UNIQUE_ID,
              n_FILE_ID: this.sixDDDeatils[i].n_ID,
            }));
          }
          console.log(sixddDetailsArray)
        })


        // Left Over Tab
        this.leftoverTabDeatils = mainApiData.data.leftoverTabDeatils;
        console.log("leftOverTabDetails", this.leftoverTabDeatils);

        const leftOverLPS4OneEntity = this.leftoverTabDeatils.leftOverLPS4OneEntity;
        console.log("leftOverLPS4OneEntity First Panel", leftOverLPS4OneEntity);


        // ! First Left Over Tab
        if (leftOverLPS4OneEntity) {
          const lps4OneFormArray = (this.panelOneForm.controls['leftOverLPS4OneEntity'] as FormArray);
          leftOverLPS4OneEntity.forEach((leftOverLps4OneObj, i) => {
            console.log("leftOverLps4OneObj:", leftOverLps4OneObj);
            lps4OneFormArray.push(this.generateItemLeft("edit"));
            lps4OneFormArray.at(i).patchValue(leftOverLps4OneObj);
            lps4OneFormArray.at(i).patchValue({ mode: "edit", primarykey: leftOverLps4OneObj.primarykey });
            console.log("lps4OneFormArray:::", lps4OneFormArray);
          });
          lps4OneFormArray.removeAt(lps4OneFormArray.length - 1);
        }
        else {
        };

        // ! Second Left Over Tab
        const left4One6DDEntity = this.leftoverTabDeatils.left4One6DDEntity;
        console.log("left4One6DDEntity Second Panel", left4One6DDEntity);

        if (left4One6DDEntity) {
          const left4One6DDFormArray = (this.panelTwoForm.controls['left4One6DDEntity'] as FormArray);
          left4One6DDEntity.forEach((left4One6DDObj, i) => {
            left4One6DDFormArray.push(this.generateItemLeft('edit'));
            left4One6DDFormArray.at(i).patchValue(left4One6DDObj);
            left4One6DDFormArray.at(i).patchValue({ mode: "edit", primarykey: left4One6DDObj.primarykey });
          });
          left4One6DDFormArray.removeAt(left4One6DDFormArray.length - 1);
        } else {

        };

        // ! Third Left Over Tab
        const left6DDAwardEntity = this.leftoverTabDeatils.left6DDAwardEntity;
        console.error("left6DDAwardEntity Third Panel", left6DDAwardEntity);
        if (left6DDAwardEntity) {
          const sixdandawardleftFormArray = (this.panelThreeForm.controls['left6DDAwardEntity'] as FormArray);
          left6DDAwardEntity.forEach((left6DDAwardObj, i) => {
            sixdandawardleftFormArray.push(this.generateItemLeft('edit'));
            sixdandawardleftFormArray.at(i).patchValue(left6DDAwardObj);
            sixdandawardleftFormArray.at(i).patchValue({ mode: "edit", primarykey: left6DDAwardObj.primarykey });
          });
          sixdandawardleftFormArray.removeAt(sixdandawardleftFormArray.length - 1);
        } else {

        };

        // Award tab
        this.awardDeatils = mainApiData.data.awardTabDeatils;
        console.log(this.awardDeatils);
        this.awardDeatils.forEach((awardDetail, i) => {
          // if (!this.expansionPanelsAward.at(i)) {
          //   this.expansionPanelsAward.push(new FormGroup({
          //     'n_ID': new FormControl(''),
          //     'n_UNIQUE_ID': new FormControl(''),
          //     'v_AWARD_NO': new FormControl(''),
          //     'mode': new FormControl(''),
          //     'd_AWARD_DATE': new FormControl(''),
          //     'v_TOTAL_EXTENT': new FormControl(''),
          //     'n_TOTAL_AWARD_AMOUNT': new FormControl(''),
          //     'v_PHO_TOTAL_EXTENT': new FormControl(''),
          //     'v_PNHO_TOTAL_EXTENT': new FormControl(''),
          //     'v_PHO_SCHEME_TOTAL_EXTENT': new FormControl(''),
          //     'court_v_extent': new FormControl(''),
          //     'court_v_legal_proceeding': new FormControl(''),
          //     'road_v_extent': new FormControl(''),
          //     'road_v_legal_proceeding': new FormControl(''),
          //     'enchro_v_extent': new FormControl(''),
          //     'enchro_v_legal_proceeding': new FormControl(''),
          //     'scatt_v_extent': new FormControl(''),
          //     'scatt_v_legal_proceeding': new FormControl(''),
          //     'quash_v_extent': new FormControl(''),
          //     'quash_v_legal_proceeding': new FormControl(''),
          //     'recon_v_extent': new FormControl(''),
          //     'recon_v_legal_proceeding': new FormControl(''),
          //     'noc_v_extent': new FormControl(''),
          //     'noc_v_legal_proceeding': new FormControl(''),
          //     'pnho_court_v_extent': new FormControl(''),
          //     'pnho_court_v_legal_proceeding': new FormControl(''),
          //     'pnho_enchro_v_extent': new FormControl(''),
          //     'pnho_enchro_v_legal_proceeding': new FormControl(''),
          //     'pnho_quash_v_extent': new FormControl(''),
          //     'pnho_quash_v_legal_proceeding': new FormControl(''),
          //     'pnho_encumbr_v_extent': new FormControl(''),
          //     'pnho_encumbr_v_legal_proceeding': new FormControl(''),
          //     'dynamicValuesDetails': new FormArray([]),
          //     'awardDirectPaymentEntityValuesDetails': new FormArray([]),
          //     'awardRevenuePaymentEntityValuesDetails': new FormArray([]),
          //     'awardCourtDepositPaymentEntityValuesDetails': new FormArray([]),
          //     'awardPossessionTakenOverEntityValuesDetails': new FormArray([]),
          //     'awardPossessionExtentAvailableEntityValuesDetails': new FormArray([]),
          //     'awardPossessionNotTakenOverEntityValuesDetails': new FormArray([]),
          //   }));
          // }
          this.addExpansionPanelAward();
          this.cdr.detectChanges();
          const awardFormGroup = (this.expansionPanelsAward.at(i) as FormGroup);

          awardFormGroup.controls['v_AWARD_NO'].setValue(this.awardDeatils[i].v_AWARD_NO);
          awardFormGroup.controls['v_TOTAL_EXTENT'].setValue(this.awardDeatils[i].v_TOTAL_EXTENT);
          const d_d_award_date_format = this.awardDeatils[i].d_AWARD_DATE;
          awardFormGroup.controls['d_AWARD_DATE'].setValue(d_d_award_date_format);
          // sixDDFormGroup.controls['file'].setValue(this.sixDDDeatils[i].v_FILE_1_FILENAME);
          awardFormGroup.controls['n_TOTAL_AWARD_AMOUNT'].setValue(this.awardDeatils[i].n_TOTAL_AWARD_AMOUNT);
          awardFormGroup.controls['v_TOTAL_EXTENT'].setValue(this.awardDeatils[i].v_TOTAL_EXTENT);
          awardFormGroup.controls['mode'].setValue("edit");
          awardFormGroup.controls['n_ID'].setValue(this.awardDeatils[i].n_ID);
          awardFormGroup.controls['n_UNIQUE_ID'].setValue(this.awardDeatils[i].n_UNIQUE_ID);
          awardFormGroup.controls['v_FILE_NAME'].setValue(this.awardDeatils[i].v_FILE_NAME);
          awardFormGroup.controls['v_FILE_PATH'].setValue(this.awardDeatils[i].v_FILE_PATH);


          const apiValue_dynamicValuesDetails = this.awardDeatils[i].dynamicValuesDetails;
          const repeatedFieldsFormArray = (awardFormGroup.controls['dynamicValuesDetails'] as FormArray);
          for (let i = 0; i < apiValue_dynamicValuesDetails.length; i++) {
            const apiValue_dynamicValues_group = apiValue_dynamicValuesDetails[i];
            const apiValue_dynamicValues_group_field1 = apiValue_dynamicValues_group.v_COLUMN_NAME;
            const apiValue_dynamicValues_group_field2 = apiValue_dynamicValues_group.v_VALUE_NAME;
            const apiValue_dynamicValues = "edit";
            if (!repeatedFieldsFormArray.at(i)) {
              repeatedFieldsFormArray.push(new FormGroup({
                'v_COLUMN_NAME': new FormControl(''),
                'v_VALUE_NAME': new FormControl(''),
                'mode': new FormControl('')
              }))
            }
            const repeatedField = repeatedFieldsFormArray.at(i) as FormGroup;
            repeatedField.controls['v_COLUMN_NAME'].setValue(apiValue_dynamicValues_group_field1);
            repeatedField.controls['v_VALUE_NAME'].setValue(apiValue_dynamicValues_group_field2);
            repeatedField.controls['mode'].setValue(apiValue_dynamicValues);
          }

          const apiValue_directpayFields = this.awardDeatils[i].awardDirectPaymentEntityValuesDetails;
          const awardFieldsDirectFormArray = (awardFormGroup.controls['awardDirectPaymentEntityValuesDetails'] as FormArray);
          for (let i = 0; i < apiValue_directpayFields.length; i++) {
            const apiValue_awardDirect_group = apiValue_directpayFields[i];
            if (!awardFieldsDirectFormArray.at(i)) {
              awardFieldsDirectFormArray.push(new FormGroup({
                'v_AMOUNT': new FormControl(''),
                'v_NOTIFIED_PERSON': new FormControl(''),
                'mode': new FormControl('')
              }))
            }
            const awarddirectpayField = awardFieldsDirectFormArray.at(i) as FormGroup;
            awarddirectpayField.controls['v_AMOUNT'].setValue(apiValue_awardDirect_group.v_AMOUNT);
            awarddirectpayField.controls['v_NOTIFIED_PERSON'].setValue(apiValue_awardDirect_group.v_NOTIFIED_PERSON);
            awarddirectpayField.controls['mode'].setValue("edit");
          }

          const apiValue_revenuepayFields = this.awardDeatils[i].awardRevenuePaymentEntityValuesDetails;
          const awardFieldsRevenueFormArray = (awardFormGroup.controls['awardRevenuePaymentEntityValuesDetails'] as FormArray);
          for (let i = 0; i < apiValue_revenuepayFields.length; i++) {
            const apiValue_awardRevenue_group = apiValue_revenuepayFields[i];
            if (!awardFieldsRevenueFormArray.at(i)) {
              awardFieldsRevenueFormArray.push(new FormGroup({
                'v_AMOUNT': new FormControl(''),
                'v_NOTIFIED_PERSON': new FormControl(''),
                'mode': new FormControl(''),
                'n_ID': new FormControl(''),
                'n_FILE_ID': new FormControl(''),
                'n_UNIQUE_ID': new FormControl(''),
              }))
            }
            const awardrevenuepayField = awardFieldsRevenueFormArray.at(i) as FormGroup;
            awardrevenuepayField.controls['v_AMOUNT'].setValue(apiValue_awardRevenue_group.v_AMOUNT);
            awardrevenuepayField.controls['v_NOTIFIED_PERSON'].setValue(apiValue_awardRevenue_group.v_NOTIFIED_PERSON);
            awardrevenuepayField.controls['mode'].setValue("edit");
            awardrevenuepayField.controls['n_ID'].setValue(apiValue_awardRevenue_group.n_ID);
            awardrevenuepayField.controls['n_FILE_ID'].setValue(apiValue_awardRevenue_group.n_FILE_ID);
            awardrevenuepayField.controls['n_UNIQUE_ID'].setValue(apiValue_awardRevenue_group.n_UNIQUE_ID);
          }

          const apiValue_courtpayFields = this.awardDeatils[i].awardCourtDepositPaymentEntityValuesDetails;
          const awardFieldsCourtFormArray = (awardFormGroup.controls['awardCourtDepositPaymentEntityValuesDetails'] as FormArray);
          for (let i = 0; i < apiValue_courtpayFields.length; i++) {
            const apiValue_awardCourt_group = apiValue_courtpayFields[i];
            if (!awardFieldsCourtFormArray.at(i)) {
              awardFieldsCourtFormArray.push(new FormGroup({
                'v_AMOUNT': new FormControl(''),
                'v_NOTIFIED_PERSON': new FormControl(''),
                'mode': new FormControl(''),
                'n_ID': new FormControl(''),
                'n_FILE_ID': new FormControl(''),
                'n_UNIQUE_ID': new FormControl(''),
              }))
            }
            const awardcourtpayField = awardFieldsCourtFormArray.at(i) as FormGroup;
            awardcourtpayField.controls['v_AMOUNT'].setValue(apiValue_awardCourt_group.v_AMOUNT);
            awardcourtpayField.controls['v_NOTIFIED_PERSON'].setValue(apiValue_awardCourt_group.v_NOTIFIED_PERSON);
            awardcourtpayField.controls['mode'].setValue("edit");
            awardcourtpayField.controls['n_ID'].setValue(apiValue_awardCourt_group.n_ID);
            awardcourtpayField.controls['n_FILE_ID'].setValue(apiValue_awardCourt_group.n_FILE_ID);
            awardcourtpayField.controls['n_UNIQUE_ID'].setValue(apiValue_awardCourt_group.n_UNIQUE_ID);
          }

          awardFormGroup.controls['v_PHO_TOTAL_EXTENT'].setValue(this.awardDeatils[i].v_PHO_TOTAL_EXTENT);
          awardFormGroup.controls['v_PNHO_TOTAL_EXTENT'].setValue(this.awardDeatils[i].v_PNHO_TOTAL_EXTENT);
          awardFormGroup.controls['v_PHO_SCHEME_TOTAL_EXTENT'].setValue(this.awardDeatils[i].v_PHO_SCHEME_TOTAL_EXTENT);


          const apiValue_dynamicphoFields = this.awardDeatils[i].awardPossessionTakenOverEntityValuesDetails;
          const awardFieldsdynamicphoFormArray = (awardFormGroup.controls['awardPossessionTakenOverEntityValuesDetails'] as FormArray);
          for (let i = 0; i < apiValue_dynamicphoFields.length; i++) {
            const apiValue_awarddynamicpho_group = apiValue_dynamicphoFields[i];
            if (!awardFieldsdynamicphoFormArray.at(i)) {
              awardFieldsdynamicphoFormArray.push(new FormGroup({
                'v_VILLAGE': new FormControl(''),
                'v_SURVEY_NO': new FormControl(''),
                'v_TOTAL_EXTENT': new FormControl(''),
                'mode': new FormControl(''),
                'n_ID': new FormControl(''),
                'n_FILE_ID': new FormControl(''),
                'n_UNIQUE_ID': new FormControl(''),
              }))
            }
            const awarddynamicphoField = awardFieldsdynamicphoFormArray.at(i) as FormGroup;
            awarddynamicphoField.controls['v_SURVEY_NO'].setValue(apiValue_awarddynamicpho_group.v_SURVEY_NO);
            awarddynamicphoField.controls['v_TOTAL_EXTENT'].setValue(apiValue_awarddynamicpho_group.v_TOTAL_EXTENT);
            awarddynamicphoField.controls['v_VILLAGE'].setValue(apiValue_awarddynamicpho_group.v_VILLAGE);
            awarddynamicphoField.controls['mode'].setValue("edit");
            awarddynamicphoField.controls['n_ID'].setValue(apiValue_awarddynamicpho_group.n_ID);
            awarddynamicphoField.controls['n_FILE_ID'].setValue(apiValue_awarddynamicpho_group.n_FILE_ID);
            awarddynamicphoField.controls['n_UNIQUE_ID'].setValue(apiValue_awarddynamicpho_group.n_UNIQUE_ID);
          }


          const apiValue_dynamicpnhoFields = this.awardDeatils[i].awardPossessionNotTakenOverEntityValuesDetails;
          const awardFieldsdynamicpnhoFormArray = (awardFormGroup.controls['awardPossessionNotTakenOverEntityValuesDetails'] as FormArray);
          for (let i = 0; i < apiValue_dynamicpnhoFields.length; i++) {
            const apiValue_awarddynamicpnho_group = apiValue_dynamicpnhoFields[i];
            if (!awardFieldsdynamicpnhoFormArray.at(i)) {
              awardFieldsdynamicpnhoFormArray.push(new FormGroup({
                'v_VILLAGE': new FormControl(''),
                'v_SURVEY_NO': new FormControl(''),
                'v_TOTAL_EXTENT': new FormControl(''),
                'mode': new FormControl(''),
                'n_ID': new FormControl(''),
                'n_FILE_ID': new FormControl(''),
                'n_UNIQUE_ID': new FormControl(''),
              }))
            }
            const awarddynamicpnhoField = awardFieldsdynamicpnhoFormArray.at(i) as FormGroup;
            awarddynamicpnhoField.controls['v_SURVEY_NO'].setValue(apiValue_awarddynamicpnho_group.v_SURVEY_NO);
            awarddynamicpnhoField.controls['v_TOTAL_EXTENT'].setValue(apiValue_awarddynamicpnho_group.v_TOTAL_EXTENT);
            awarddynamicpnhoField.controls['v_VILLAGE'].setValue(apiValue_awarddynamicpnho_group.v_VILLAGE);
            awarddynamicpnhoField.controls['mode'].setValue("edit");
            awarddynamicpnhoField.controls['n_ID'].setValue(apiValue_awarddynamicpnho_group.n_ID);
            awarddynamicpnhoField.controls['n_FILE_ID'].setValue(apiValue_awarddynamicpnho_group.n_FILE_ID);
            awarddynamicpnhoField.controls['n_UNIQUE_ID'].setValue(apiValue_awarddynamicpnho_group.n_UNIQUE_ID);
          }


          const apiValue_dynamicphoschemeFields = this.awardDeatils[i].awardPossessionExtentAvailableEntityValuesDetails;
          const awardFieldsdynamicphoschemeFormArray = (awardFormGroup.controls['awardPossessionExtentAvailableEntityValuesDetails'] as FormArray);
          for (let i = 0; i < apiValue_dynamicphoschemeFields.length; i++) {
            const apiValue_awarddynamicphoscheme_group = apiValue_dynamicphoschemeFields[i];
            if (!awardFieldsdynamicphoschemeFormArray.at(i)) {
              awardFieldsdynamicphoschemeFormArray.push(new FormGroup({
                'v_VILLAGE': new FormControl(''),
                'v_SURVEY_NO': new FormControl(''),
                'v_TOTAL_EXTENT': new FormControl(''),
                'mode': new FormControl(''),
                'n_ID': new FormControl(''),
                'n_FILE_ID': new FormControl(''),
                'n_UNIQUE_ID': new FormControl(''),
              }))
            }
            const awarddynamicphoschemeField = awardFieldsdynamicphoschemeFormArray.at(i) as FormGroup;
            awarddynamicphoschemeField.controls['v_SURVEY_NO'].setValue(apiValue_awarddynamicphoscheme_group.v_SURVEY_NO);
            awarddynamicphoschemeField.controls['v_TOTAL_EXTENT'].setValue(apiValue_awarddynamicphoscheme_group.v_TOTAL_EXTENT);
            awarddynamicphoschemeField.controls['v_VILLAGE'].setValue(apiValue_awarddynamicphoscheme_group.v_VILLAGE);
            awarddynamicphoschemeField.controls['mode'].setValue("edit");
            awarddynamicphoschemeField.controls['n_ID'].setValue(apiValue_awarddynamicphoscheme_group.n_ID);
            awarddynamicphoschemeField.controls['n_FILE_ID'].setValue(apiValue_awarddynamicphoscheme_group.n_FILE_ID);
            awarddynamicphoschemeField.controls['n_UNIQUE_ID'].setValue(apiValue_awarddynamicphoscheme_group.n_UNIQUE_ID);
          }

          const apiValue_awardOtherFiles = this.awardDeatils[i].awardOtherFileEntityValuesDetails;
          console.log(apiValue_awardOtherFiles);

          for (let i = 0; i < apiValue_awardOtherFiles.length; i++) {
            var filename = apiValue_awardOtherFiles[i].v_FILE_NAME;

            const extent = apiValue_awardOtherFiles[i].v_EXTENT;
            const legalProceeding = apiValue_awardOtherFiles[i].v_LEGAL_PROCEEDING;

            const filepath = apiValue_awardOtherFiles[i].v_FILE_PATH;
            const n_ID = apiValue_awardOtherFiles[i].n_ID;

            switch (filename) {
              case 'award_pho_courtcase_file':
                awardFormGroup.controls['court_v_extent'].setValue(extent);
                awardFormGroup.controls['court_v_legal_proceeding'].setValue(legalProceeding);
                this.court_file_PATH = filepath;
                this.court_file_PATH_ID = n_ID;
                break;
              case 'award_pho_road_file':
                awardFormGroup.controls['road_v_extent'].setValue(extent);
                awardFormGroup.controls['road_v_legal_proceeding'].setValue(legalProceeding);
                this.road_file_PATH = filepath;
                this.road_file_PATH_ID = n_ID;
                break;
              case 'award_pho_enchro_file':
                awardFormGroup.controls['enchro_v_extent'].setValue(extent);
                awardFormGroup.controls['enchro_v_legal_proceeding'].setValue(legalProceeding);
                this.enchro_file_PATH = filepath;
                this.enchro_file_PATH_ID = n_ID;
                break;
              case 'award_pho_scatt_file':
                awardFormGroup.controls['scatt_v_extent'].setValue(extent);
                awardFormGroup.controls['scatt_v_legal_proceeding'].setValue(legalProceeding);
                this.scatt_file_PATH = filepath;
                this.scatt_file_PATH_ID = n_ID;
                break;
              case 'award_pho_quash_file':
                awardFormGroup.controls['quash_v_extent'].setValue(extent);
                awardFormGroup.controls['quash_v_legal_proceeding'].setValue(legalProceeding);
                this.quash_file_PATH = filepath;
                this.quash_file_PATH_ID = n_ID;
                break;
              case 'award_pho_recon_file':
                awardFormGroup.controls['recon_v_extent'].setValue(extent);
                awardFormGroup.controls['recon_v_legal_proceeding'].setValue(legalProceeding);
                this.recon_file_PATH = filepath;
                this.recon_file_PATH_ID = n_ID;
                break;
              case 'award_pho_noc_file':
                awardFormGroup.controls['noc_v_extent'].setValue(extent);
                awardFormGroup.controls['noc_v_legal_proceeding'].setValue(legalProceeding);
                this.noc_file_PATH = filepath;
                this.noc_file_PATH_ID = n_ID;
                break;
              case 'award_pnho_courtcase_file':
                awardFormGroup.controls['pnho_court_v_extent'].setValue(extent);
                awardFormGroup.controls['pnho_court_v_legal_proceeding'].setValue(legalProceeding);
                this.pnho_court_file_PATH = filepath;
                this.pnho_court_file_PATH_ID = n_ID;
                break;
              case 'award_pnho_enchro_file':
                awardFormGroup.controls['pnho_enchro_v_extent'].setValue(extent);
                awardFormGroup.controls['pnho_enchro_v_legal_proceeding'].setValue(legalProceeding);
                this.pnho_enchro_file_PATH = filepath;
                this.pnho_enchro_file_PATH_ID = n_ID;
                break;
              case 'award_pnho_quash_file':
                awardFormGroup.controls['pnho_quash_v_extent'].setValue(extent);
                awardFormGroup.controls['pnho_quash_v_legal_proceeding'].setValue(legalProceeding);
                this.pnho_quash_file_PATH = filepath;
                this.pnho_quash_file_PATH_ID = n_ID;
                break;
              case 'award_pnho_encumbr_file':
                awardFormGroup.controls['pnho_encumbr_v_extent'].setValue(extent);
                awardFormGroup.controls['pnho_encumbr_v_legal_proceeding'].setValue(legalProceeding);
                this.pnho_encumbr_file_PATH = filepath;
                this.pnho_encumbr_file_PATH_ID = n_ID;
                break;
              default:
                // Handle any other cases or ignore them
                break;
            }
          }
        });

      }
    });
  }

  // getFormattedStringForDateInput(inputDate: string) {
  //   let resp = ''
  //   if (inputDate) {
  //     const splitArray = inputDate.toString().split('/');
  //     if (splitArray.length >= 3) {
  //       const date = splitArray[0];
  //       const month = splitArray[1];
  //       const year = splitArray[2];
  //       let date1 = new Date();
  //       date1.setDate(+date);
  //       date1.setMonth(+month);
  //       date1.setFullYear(+year);
  //       const formattedDate = formatDate(date1, 'MM/dd/yyyy', 'en-IN')
  //       resp = formattedDate;
  //     }
  //   }
  //   return resp;
  // }

  // getFormattedStringForDateInput(inputDate: string) {
  //   let resp = '';
  //   if (inputDate) {
  //     const splitArray = inputDate.toString().split('/');
  //     if (splitArray.length >= 3) {
  //       const date = splitArray[0];
  //       const month = splitArray[1];
  //       const year = splitArray[2];
  //       const formattedDate = `${year}-${month}-${date}`; // Assuming the date format is dd/mm/yyyy
  //       resp = this.datePipe.transform(formattedDate, 'yyyy-MM-dd');
  //     }
  //   }
  //   return resp;
  // }

  getFormattedStringForDateInput(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based.
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }


  addExpansionPanel4One() {
    this.addOwner4oneButtonDisable = true;
    const expansionPanel4One = this.formBuilder.group({
      file1: null,
      file2: null,
      v_FILE_1_FILENAME: [''],
      v_FILE_2_FILENAME: [''],
      v_GAZETTE_REF_NO: [''],
      v_FILE_1_FILEPATH: [''],
      v_FILE_2_FILEPATH: [''],

      // v_4_ONE_GO_REF_NO: [''],
      d_DATE_OF_4_ONE_GO: [''],


      // d_DATE_OF_GAZETTE_NOTIFICATION: [''],
      // d_DATE_OF_LOCALITY: [''],
      // v_REF_NO: [''],
      v_TOTAL_EXTENT: [''],
      dynamicValuesDetails: this.formBuilder.array([]),
      fourOneDynamicFileEntityDetails: this.formBuilder.array([]),
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],

    });
    this.expansionPanelsArray4.push(expansionPanel4One);
  }

  addExpansionPanelSixDD() {
    const expansionPanelSix = this.formBuilder.group({
      v_FILE_1_FILENAME: [''],
      v_FILE_2_FILENAME: [''],
      file1: null,
      file2: null,
      v_FILE_1_FILEPATH: [''],
      v_FILE_2_FILEPATH: [''],
      v_GAZETTE_REF_NO: [''],
      // v_6DD_GO_REF_NO: [''],
      d_DATE_OF_6DD_GO: [''],
      // d_DATE_OF_GAZETTE_NOTIFICATION: [''],
      // d_DATE_OF_LOCALITY: [''],
      // v_REF_NO: [''],
      v_TOTAL_EXTENT: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [null],
      dynamicValuesDetails: this.formBuilder.array([]),
      sixDdDynamicFileEntityValuesDetails: this.formBuilder.array([]),
      n_ID: [null]
    });
    this.expansionPanelsSixDD.push(expansionPanelSix);
  }

  addExpansionPanelAward() {
    const expansionPanelAward = this.formBuilder.group({
      v_FILE_NAME: [''],
      v_FILE_PATH: [''],
      file: null,
      v_AWARD_NO: [''],
      d_AWARD_DATE: [''],
      v_TOTAL_EXTENT: [''],
      n_TOTAL_AWARD_AMOUNT: [''],
      n_ID: [''],
      n_UNIQUE_ID: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      dynamicValuesDetails: this.formBuilder.array([]),
      awardDirectPaymentEntityValuesDetails: this.formBuilder.array([]),
      awardRevenuePaymentEntityValuesDetails: this.formBuilder.array([]),
      awardCourtDepositPaymentEntityValuesDetails: this.formBuilder.array([]),
      awardPossessionTakenOverEntityValuesDetails: this.formBuilder.array([]),
      awardPossessionExtentAvailableEntityValuesDetails: this.formBuilder.array([]),
      awardPossessionNotTakenOverEntityValuesDetails: this.formBuilder.array([]),
      v_PHO_TOTAL_EXTENT: [''],
      v_PNHO_TOTAL_EXTENT: [''],
      v_PHO_SCHEME_TOTAL_EXTENT: [''],
      court_v_extent: [''],
      court_v_legal_proceeding: [''],
      court_file: null,
      road_v_extent: [''],
      road_v_legal_proceeding: [''],
      road_file: null,
      enchro_v_extent: [''],
      enchro_v_legal_proceeding: [''],
      enchro_file: null,
      scatt_v_extent: [''],
      scatt_v_legal_proceeding: [''],
      scatt_file: null,
      quash_v_extent: [''],
      quash_v_legal_proceeding: [''],
      quash_file: null,
      recon_v_extent: [''],
      recon_v_legal_proceeding: [''],
      recon_file: null,
      noc_v_extent: [''],
      noc_v_legal_proceeding: [''],
      noc_file: null,
      pnho_court_v_extent: [''],
      pnho_court_v_legal_proceeding: [''],
      pnho_court_file: null,
      pnho_enchro_v_extent: [''],
      pnho_enchro_v_legal_proceeding: [''],
      pnho_enchro_file: null,
      pnho_quash_v_extent: [''],
      pnho_quash_v_legal_proceeding: [''],
      pnho_quash_file: null,
      pnho_encumbr_v_extent: [''],
      pnho_encumbr_v_legal_proceeding: [''],
      pnho_encumbr_file: null,

    });
    this.expansionPanelsAward.push(expansionPanelAward);

  }

  addExpansionPanelLeft() {
    const expansionPanelLeft = this.formBuilder.group({

      left_lps_4oneFields: this.formBuilder.array([]),
      left_4one_6ddFields: this.formBuilder.array([]),
      left_6dd_awardFields: this.formBuilder.array([]),

    });
    this.expansionPanelsLeft.push(expansionPanelLeft);
  }



  removeLastRepeatedField(type) {
    if (this.expansionPanelsArray.length > 0 && type === 'lps') {
      this.expansionPanelsArray.removeAt(this.expansionPanelsArray.length - 1);
    } else if (this.expansionPanelsArray4.length > 0 && type === '4(1)') {
      this.expansionPanelsArray4.removeAt(this.expansionPanelsArray4.length - 1);
    } else if (this.expansionPanelsSixDD.length > 0 && type === '6DD') {
      this.expansionPanelsSixDD.removeAt(this.expansionPanelsSixDD.length - 1);
    }
    else if (this.expansionPanelsAward.length > 0 && type === 'Award') {
      this.expansionPanelsAward.removeAt(this.expansionPanelsAward.length - 1);
    }
  }

  // 2nd tab LPS Tab
  addExpansionPanel() {
    const expansionPanel = this.formBuilder.group({
      dynamicValuesDetails: this.formBuilder.array([]),
      lpsVillageDetails: this.formBuilder.array([]),
      lpsFileDynamicValuesDetails: this.formBuilder.array([]),
      v_FILE_NAME: [''],
      v_FILE_PATH: [''],
      file: null,
      // v_REF_NO: [''],
      v_TOTAL_EXTENT: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [null],
      n_ID: [null]
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
    } else if (type === '4(1)') {
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
    } else if (type === '6DD') {
      const panelFormGroup = this.expansionPanelsSixDD.at(panelIndex) as FormGroup;
      if (file) {
        const prefix = type; // Specify your desired prefix here
        const suffix = panelIndex
        const fileNameWithPrefix = prefix + '_' + file.name + '_' + suffix;
        const prefixedFile = new File([file], fileNameWithPrefix, { type: file.type });
        panelFormGroup.get('file').setValue(prefixedFile);
      } else {
        panelFormGroup.get('file').setValue(null);
      }
    }

  }

  submit() {
    console.log(this.personalInfoFormGroup.value);
    console.log(this.LPSFormGroup.value)

    console.log(this.fourOneFormGroup.value)
    console.log(this.sixDDFormGroup.value)
  }
  removeExpansionPanel(index: number, type) {
    if (type === 'lps') {
      this.expansionPanelsArray.removeAt(index);
    } else if (type === '4(1)') {
      this.expansionPanelsArray4.removeAt(index)
    } else if (type === '6DD') {
      this.expansionPanelsSixDD.removeAt(index)
    } else if (type === 'Award') {
      this.expansionPanelsAward.removeAt(index)
    }
  }

  addFiles(expansionPanelIndex: number, type) {
    let expansionPanel;
    let filesArray;
    expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
    filesArray = expansionPanel.get('lpsFileDynamicValuesDetails') as FormArray;
    const repeatedField = this.formBuilder.group({
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      v_FILE_NAME: [''],
      file: null,
      n_FILE_ID: [null],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: [''],
      v_FILE_PATH: ['']
    });

    if (this.router.url.includes('edit')) {
      for (let i = 0; i < this.lpsTabDetails.length; i++) {
        const lps = this.lpsTabDetails[i];

        // Update the n_FILE_ID control's value based on the current fourOne.n_ID
        repeatedField.patchValue({
          n_FILE_ID: lps.n_ID
        });
      }
    }

    filesArray.push(repeatedField);
  }

  addRepeatedField(expansionPanelIndex: number, type) {
    let expansionPanel;
    let repeatedFieldsArray;
    const repeatedField = this.formBuilder.group({
      v_COLUMN_NAME: [''],
      v_VALUE_NAME: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_ID: [''],
      n_FILE_ID: [null],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      v_FILE_NAME: ['']
    });
    if (type === 'lps') {
      // expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      // repeatedFieldsArray = expansionPanel.get('dynamicValuesDetails') as FormArray;
      // if (this.router.url.includes('edit')) {
      //   for (let i = 0; i < this.lpsTabDetails.length; i++) {
      //     const lps = this.lpsTabDetails[i];

      //     // Update the n_FILE_ID control's value based on the current fourOne.n_ID
      //     repeatedField.patchValue({
      //       n_FILE_ID: lps.n_ID,
      //     });

      //     for (const dynamicValue of this.lpsTabDetails[i].dynamicValuesDetails) {
      //       repeatedField.patchValue({
      //         v_FILE_NAME: dynamicValue.v_FILE_NAME
      //       });
      //     }
      //   }

      // }
    } else if (type === '4(1)') {
      expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('dynamicValuesDetails') as FormArray;
      if (this.router.url.includes('edit')) {
        for (let i = 0; i < this.fourOneTabDeatils.length; i++) {
          const fourone = this.fourOneTabDeatils[i];

          // Update the n_FILE_ID control's value based on the current fourOne.n_ID
          repeatedField.patchValue({
            n_FILE_ID: fourone.n_ID
          });

          for (const dynamicValue of this.fourOneTabDeatils[i].dynamicValuesDetails) {
            repeatedField.patchValue({
              v_FILE_NAME: dynamicValue.v_FILE_NAME
            });
          }
        }
      }
    } else if (type === '6DD') {
      expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('dynamicValuesDetails') as FormArray;
      if (this.router.url.includes('edit')) {
        for (let i = 0; i < this.sixDDDeatils.length; i++) {
          const sixDD = this.sixDDDeatils[i];

          // Update the n_FILE_ID control's value based on the current fourOne.n_ID
          repeatedField.patchValue({
            n_FILE_ID: sixDD.n_ID
          });

          for (const dynamicValue of this.sixDDDeatils[i].dynamicValuesDetails) {
            repeatedField.patchValue({
              v_FILE_NAME: dynamicValue.v_FILE_NAME
            });
          }
        }
      }
    }
    else if (type === 'Award') {
      expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('dynamicValuesDetails') as FormArray;
      if (this.router.url.includes('edit')) {
        for (let i = 0; i < this.awardDeatils.length; i++) {
          const award = this.awardDeatils[i];

          // Update the n_FILE_ID control's value based on the current fourOne.n_ID
          repeatedField.patchValue({
            n_FILE_ID: award.n_ID
          });

          for (const dynamicValue of this.awardDeatils[i].dynamicValuesDetails) {
            repeatedField.patchValue({
              v_FILE_NAME: dynamicValue.v_FILE_NAME
            });
          }
        }
      }
    }

    repeatedFieldsArray.push(repeatedField);
  }

  addVillageLps(expansionPanelIndex: number) {
    let expansionPanel;
    let lpsVillageDetailsArray;
    {
      expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      lpsVillageDetailsArray = expansionPanel.get('lpsVillageDetails') as FormArray;
    }

    const villageField = this.formBuilder.group({
      v_NAME_OF_VILLAGE: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      v_SURVEY_NO: [''],
      v_EXTENT: [''],
      n_FILE_ID: [null],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
    });

    if (this.router.url.includes('edit')) {
      for (let i = 0; i < this.lpsTabDetails.length; i++) {
        const lps = this.lpsTabDetails[i];

        // Update the n_FILE_ID control's value based on the current fourOne.n_ID
        villageField.patchValue({
          n_FILE_ID: lps.n_ID
        });
      }
    }

    lpsVillageDetailsArray.push(villageField);
  }

  // addOwner4one(expansionPanelIndex: number) {
  //   const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
  //   const ownerFieldsArray = expansionPanel.get('fourOneDynamicFileEntityDetails') as FormArray;
  //   const ownerField = this.formBuilder.group({
  //     v_VILLAGE: [''],
  //     v_SURVEY_NO: [''],
  //     v_EXTENT_NO: [''],
  //     v_NAME_OF_OWNER: [''],
  //     v_EAST: [''],
  //     v_WEST: [''],
  //     v_NORTH: [''],
  //     v_SOUTH: [''],
  //     v_FILE_NAME: [''],
  //     file: null,
  //     mode: ['create'],
  //     n_UNIQUE_ID: [this.n_UNIQUE_ID],
  //     n_ID: [''],
  //   });

  //   ownerFieldsArray.push(ownerField);
  //   console.log("ownerField:", ownerField);
  // }

  addOwner4one(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
    const ownerFieldsArray = expansionPanel.get('fourOneDynamicFileEntityDetails') as FormArray;
    // Create the ownerField FormGroup once outside the loop
    const ownerField = this.formBuilder.group({
      v_VILLAGE: [''],
      v_SURVEY_NO: [''],
      v_EXTENT_NO: [''],
      v_NAME_OF_OWNER: [''],
      // v_EAST: [''],
      // v_WEST: [''],
      // v_NORTH: [''],
      // v_SOUTH: [''],
      v_FILE_NAME: [''],
      file: null,
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: [''],
      n_FILE_ID: [null] // Initialize with an empty value, which will be updated in the loop
    });


    if (this.router.url.includes('edit')) {
      const fourOne = this.fourOneTabDeatils[expansionPanelIndex];
      console.log(expansionPanelIndex)
      console.log(fourOne);

      // Update the n_FILE_ID control's value based on the current fourOne.n_ID
      ownerField.patchValue({
        n_FILE_ID: fourOne.n_ID
      });
    }

    ownerFieldsArray.push(ownerField);
    console.log("ownerField:", ownerField);
  }

  addOwner4oneButton(expansionPanelIndex: number) {
    this.addOwner4oneButtonDisable = false;
    const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
    const ownerFieldsArray = expansionPanel.get('fourOneDynamicFileEntityDetails') as FormArray;
    // Create the ownerField FormGroup once outside the loop
    const ownerField = this.formBuilder.group({
      v_VILLAGE: [''],
      v_SURVEY_NO: [''],
      v_EXTENT_NO: [''],
      v_NAME_OF_OWNER: [''],
      // v_EAST: [''],
      // v_WEST: [''],
      // v_NORTH: [''],
      // v_SOUTH: [''],
      v_FILE_NAME: [''],
      file: null,
      mode: ['create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: [''],
      n_FILE_ID: [null] // Initialize with an empty value, which will be updated in the loop
    });

    // if (this.router.url.includes('edit')) {
    //   for (let i = 0; i < this.fourOneTabDeatils.length; i++) {
    //     const fourOne = this.fourOneTabDeatils[i];
    //     console.log(i)
    //     console.log(fourOne);

    //     // Update the n_FILE_ID control's value based on the current fourOne.n_ID
    //     ownerField.patchValue({
    //       n_FILE_ID: null
    //     });
    //   }

    // }

    ownerFieldsArray.push(ownerField);
    console.log("ownerField:", ownerField);
  }



  addsixdd(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
    const sixddFieldsArray = expansionPanel.get('sixDdDynamicFileEntityValuesDetails') as FormArray;

    const sixddField = this.formBuilder.group({
      v_VILLAGE: [''],
      v_SURVEY_NO: [''],
      v_EXTENT: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_FILE_ID: [null],
      n_ID: [null]
    });

    if (this.router.url.includes('edit')) {
      for (let i = 0; i < this.sixDDDeatils.length; i++) {
        const sixDD = this.sixDDDeatils[i];

        // Update the n_FILE_ID control's value based on the current fourOne.n_ID
        sixddField.patchValue({
          n_FILE_ID: sixDD.n_ID
        });
      }
    }
    console.log("sixddField", sixddField);

    sixddFieldsArray.push(sixddField);
  }


  adddirectpay(expansionPanelIndex: number) {
    debugger
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const directpayFieldsArray = expansionPanel.get('awardDirectPaymentEntityValuesDetails') as FormArray;
    if (this.router.url.includes('edit')) {
      const award = this.awardDeatils[expansionPanelIndex];

      const directpayField = this.formBuilder.group({
        v_AMOUNT: [''],
        v_NOTIFIED_PERSON: [''],
        mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
        n_UNIQUE_ID: [this.n_UNIQUE_ID],
        n_ID: [''],
        n_FILE_ID: [award.n_ID]
      });
      directpayFieldsArray.push(directpayField);

    } else {
      const directpayField = this.formBuilder.group({
        v_AMOUNT: [''],
        v_NOTIFIED_PERSON: [''],
        mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
        n_UNIQUE_ID: [this.n_UNIQUE_ID],
        n_ID: [''],
        n_FILE_ID: [null]
      });
      directpayFieldsArray.push(directpayField);

    }


    // if (this.router.url.includes('edit')) {
    //   for (let i = 0; i < this.awardDeatils.length; i++) {
    //     const award = this.awardDeatils[i];

    //     // Update the n_FILE_ID control's value based on the current fourOne.n_ID
    //     directpayField.patchValue({
    //       n_FILE_ID: award.n_ID
    //     });
    //   }
    // }

  }

  addrevenuepay(expansionPanelIndex: number) {
    debugger
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const revenuepayFieldsArray = expansionPanel.get('awardRevenuePaymentEntityValuesDetails') as FormArray;
    if (this.router.url.includes('edit')) {
      const award = this.awardDeatils[expansionPanelIndex];
      const revenuepayField = this.formBuilder.group({
        v_AMOUNT: [''],
        v_NOTIFIED_PERSON: [''],
        mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
        n_UNIQUE_ID: [this.n_UNIQUE_ID],
        n_ID: [''],
        n_FILE_ID: [award.n_ID]
      });
      revenuepayFieldsArray.push(revenuepayField);

    } else {
      const revenuepayField = this.formBuilder.group({
        v_AMOUNT: [''],
        v_NOTIFIED_PERSON: [''],
        mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
        n_UNIQUE_ID: [this.n_UNIQUE_ID],
        n_ID: [''],
        n_FILE_ID: [null]
      });
      revenuepayFieldsArray.push(revenuepayField);

    }


    // if (this.router.url.includes('edit')) {
    //   for (let i = 0; i < this.awardDeatils.length; i++) {
    //     const award = this.awardDeatils[i];

    //     // Update the n_FILE_ID control's value based on the current fourOne.n_ID
    //     revenuepayField.patchValue({
    //       n_FILE_ID: award.n_ID
    //     });
    //   }
    // }

  }

  addcivilpay(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const civilpayFieldsArray = expansionPanel.get('awardCourtDepositPaymentEntityValuesDetails') as FormArray;
    if (this.router.url.includes('edit')) {
      const award = this.awardDeatils[expansionPanelIndex];
      const civilpayField = this.formBuilder.group({
        v_AMOUNT: [''],
        v_NOTIFIED_PERSON: [''],
        mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
        n_UNIQUE_ID: [this.n_UNIQUE_ID],
        n_ID: [''],
        n_FILE_ID: [award.n_ID]
      });
      civilpayFieldsArray.push(civilpayField);


    } else {
      const civilpayField = this.formBuilder.group({
        v_AMOUNT: [''],
        v_NOTIFIED_PERSON: [''],
        mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
        n_UNIQUE_ID: [this.n_UNIQUE_ID],
        n_ID: [''],
        n_FILE_ID: [null]
      });
      civilpayFieldsArray.push(civilpayField);

    }


    // if (this.router.url.includes('edit')) {
    //   for (let i = 0; i < this.awardDeatils.length; i++) {
    //     const award = this.awardDeatils[i];

    //     // Update the n_FILE_ID control's value based on the current fourOne.n_ID
    //     civilpayField.patchValue({
    //       n_FILE_ID: award.n_ID
    //     });
    //   }
    // }

    // civilpayFieldsArray.push(civilpayField);
  }

  addpho(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const phoFieldsArray = expansionPanel.get('awardPossessionTakenOverEntityValuesDetails') as FormArray;

    const phoField = this.formBuilder.group({
      v_VILLAGE: [''],
      v_SURVEY_NO: [''],
      v_TOTAL_EXTENT: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: [''],
      n_FILE_ID: [null]
    });

    if (this.router.url.includes('edit')) {
      for (let i = 0; i < this.awardDeatils.length; i++) {
        const award = this.awardDeatils[i];

        // Update the n_FILE_ID control's value based on the current fourOne.n_ID
        phoField.patchValue({
          n_FILE_ID: award.n_ID
        });
      }
    }

    phoFieldsArray.push(phoField);
  }

  addphoscheme(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const phoschemeFieldsArray = expansionPanel.get('awardPossessionExtentAvailableEntityValuesDetails') as FormArray;

    const phoschemeField = this.formBuilder.group({
      v_VILLAGE: [''],
      v_SURVEY_NO: [''],
      v_TOTAL_EXTENT: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: [''],
      n_FILE_ID: [null]
    });

    if (this.router.url.includes('edit')) {
      for (let i = 0; i < this.awardDeatils.length; i++) {
        const award = this.awardDeatils[i];

        // Update the n_FILE_ID control's value based on the current fourOne.n_ID
        phoschemeField.patchValue({
          n_FILE_ID: award.n_ID
        });
      }
    }

    phoschemeFieldsArray.push(phoschemeField);
  }

  addpnho(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const pnhoFieldsArray = expansionPanel.get('awardPossessionNotTakenOverEntityValuesDetails') as FormArray;

    const pnhoField = this.formBuilder.group({
      v_VILLAGE: [''],
      v_SURVEY_NO: [''],
      v_TOTAL_EXTENT: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: [''],
      n_FILE_ID: [null]
    });

    if (this.router.url.includes('edit')) {
      for (let i = 0; i < this.awardDeatils.length; i++) {
        const award = this.awardDeatils[i];

        // Update the n_FILE_ID control's value based on the current fourOne.n_ID
        pnhoField.patchValue({
          n_FILE_ID: award.n_ID
        });
      }
    }

    pnhoFieldsArray.push(pnhoField);
  }

  leftlpsand4one(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsLeft.at(expansionPanelIndex) as FormGroup;
    const left_lps_4oneFieldsArray = expansionPanel.get('left_lps_4oneFields') as FormArray;

    const left_lps_4oneField = this.formBuilder.group({
      v_SURVEY_NO: [''],
      v_EXTENT_NO: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: [''],
    });

    left_lps_4oneFieldsArray.push(left_lps_4oneField);
  }

  left4oneand6dd(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsLeft.at(expansionPanelIndex) as FormGroup;
    const left_4one_6ddFieldsArray = expansionPanel.get('left_4one_6ddFields') as FormArray;

    const left_4one_6ddField = this.formBuilder.group({
      v_SURVEY_NO: [''],
      v_EXTENT_NO: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: ['']
    });

    left_4one_6ddFieldsArray.push(left_4one_6ddField);
  }
  left6ddandaward(expansionPanelIndex: number) {
    const expansionPanel = this.expansionPanelsLeft.at(expansionPanelIndex) as FormGroup;
    const left_6dd_awardFieldsArray = expansionPanel.get('left_6dd_awardFields') as FormArray;

    const left_6dd_awardField = this.formBuilder.group({
      v_SURVEY_NO: [''],
      v_EXTENT_NO: [''],
      mode: [this.n_UNIQUE_ID ? 'edit' : 'create'],
      n_UNIQUE_ID: [this.n_UNIQUE_ID],
      n_ID: ['']
    });

    left_6dd_awardFieldsArray.push(left_6dd_awardField);
  }


  deletedLpsDynamicValues: any[] = [];
  deletedFourOneDynamicValues: any[] = [];
  deletedSixddDynamicValues: any[] = [];
  deletedAwardDynamicValues: any[] = [];
  deletedFourOneOwnerValues: any[] = [];

  removeFiles(expansionPanelIndex: number, repeatedFieldIndex: number, type, formArray?: FormArray, index?: number, formArrayName?: string) {
    let expansionPanel;
    let filesArray;
    if (type === 'lps') {
      expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      filesArray = expansionPanel.get('lpsFileDynamicValuesDetails') as FormArray;
      let deletedValues = (expansionPanel.get('lpsFileDynamicValuesDetails').at(repeatedFieldIndex) as FormArray).value;
      const deletedData = {
        deletedFormArrayString: formArrayName,
        deletedValue: deletedValues,
      };
      this.deletedFiles.push(deletedData);
    }

    filesArray.removeAt(repeatedFieldIndex);
  }

  removeRepeatedField(expansionPanelIndex: number, repeatedFieldIndex: number, type, formArray?: FormArray, index?: number, formArrayName?: string) {
    let expansionPanel;
    let repeatedFieldsArray;
    if (type === 'lps') {
      expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('dynamicValuesDetails') as FormArray;
      let deletedValues = (expansionPanel.get('dynamicValuesDetails').at(repeatedFieldIndex) as FormArray).value;
      const deletedData = {
        deletedFormArrayString: formArrayName,
        deletedValue: deletedValues,
      };
      this.deletedLpsDynamicValues.push(deletedData);
    } else if (type === '4(1)') {
      expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('dynamicValuesDetails') as FormArray;

      let deletedValues = (expansionPanel.get('dynamicValuesDetails').at(repeatedFieldIndex) as FormArray).value;


      const deletedData = {
        deletedFormArrayString: formArrayName,
        deletedValue: deletedValues,
      };
      console.log(deletedData)

      this.deletedFourOneDynamicValues.push(deletedData);

    } else if (type === '6DD') {
      expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('dynamicValuesDetails') as FormArray;

      let deletedValues = (expansionPanel.get('dynamicValuesDetails').at(repeatedFieldIndex) as FormArray).value;
      const deletedData = {
        deletedFormArrayString: formArrayName,
        deletedValue: deletedValues,
      };
      this.deletedSixddDynamicValues.push(deletedData);
    }
    else if (type === 'Award') {
      expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
      repeatedFieldsArray = expansionPanel.get('dynamicValuesDetails') as FormArray;
      let deletedValues = (expansionPanel.get('dynamicValuesDetails').at(repeatedFieldIndex) as FormArray).value;
      const deletedData = {
        deletedFormArrayString: formArrayName,
        deletedValue: deletedValues,
      };
      this.deletedAwardDynamicValues.push(deletedData);
    }

    repeatedFieldsArray.removeAt(repeatedFieldIndex);
  }

  deletedlpsVillageDetails: any[] = [];
  removeVillageLps(expansionPanelIndex: number, villageFieldIndex: number, formArray?: FormArray, index?: number, formArrayName?: string) {
    let expansionPanel;
    let lpsVillageDetailsArray;
    {
      expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      lpsVillageDetailsArray = expansionPanel.get('lpsVillageDetails') as FormArray;

      let deletedValues = (lpsVillageDetailsArray.at(villageFieldIndex) as FormControl).value;
      const deletedData = {
        deletedFormArrayString: formArrayName,
        deletedValue: deletedValues,
      };
      this.deletedlpsVillageDetails.push(deletedData);
    }

    lpsVillageDetailsArray.removeAt(villageFieldIndex);
  }

  // removeOwner4one(expansionPanelIndex: number, ownerFieldIndex: number, formArray?: FormArray, formArrayName?: string) {
  //   let expansionPanel;
  //   let ownerFieldsArray;

  //   // const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
  //   // const ownerFieldsArray = expansionPanel.get('fourOneDynamicFileEntityDetails') as FormArray;
  //   // let  deletedValues = (expansionPanel.get('fourOneDynamicFileEntityDetails').at(ownerFieldIndex) as FormArray).value;


  //   // const deletedData = {
  //   //   deletedFormArrayString: formArrayName,
  //   //   deletedValue:deletedValues,
  //   // };
  //   // this.deletedFourOneDynamicValues.push(deletedData);
  //   // ownerFieldsArray.removeAt(ownerFieldIndex);

  //   expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
  //   ownerFieldsArray = expansionPanel.get('fourOneDynamicFileEntityDetails') as FormArray;

  //   let deletedValues = (expansionPanel.get('fourOneDynamicFileEntityDetails').at(ownerFieldIndex) as FormArray).value;


  //   const deletedData = {
  //     deletedFormArrayString: formArrayName,
  //     deletedValue: deletedValues,
  //   };
  //   console.log(deletedData)
  //   this.deletedFourOneOwnerValues.push(deletedData);
  //   ownerFieldsArray.removeAt(ownerFieldIndex);
  // }

  removeOwner4one(expansionPanelIndex: number, ownerFieldIndex: number, formArray?: FormArray, formArrayName?: string) {
    let expansionPanel;
    let ownerFieldsArray;

    expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
    ownerFieldsArray = expansionPanel.get('fourOneDynamicFileEntityDetails') as FormArray;

    // Retrieve the deleted values
    let deletedValues = (expansionPanel.get('fourOneDynamicFileEntityDetails').at(ownerFieldIndex) as FormArray).value;

    // Change the mode to "delete" for the deleted data
    deletedValues.mode = 'delete';

    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: deletedValues,
    };

    console.log("deletedData", deletedData);

    // Remove the FormArray element at the specified ownerFieldIndex
    this.deletedFourOneOwnerValues.push(deletedData);
    ownerFieldsArray.removeAt(ownerFieldIndex);

  }


  deletedSixddFields: any[] = [];
  removesixdd(expansionPanelIndex: number, sixddFieldIndex: number, formArray?: FormArray, index?: number, formArrayName?: string) {
    const expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
    const sixddFieldsArray = expansionPanel.get('sixDdDynamicFileEntityValuesDetails') as FormArray;

    let deletedValues = (sixddFieldsArray.at(sixddFieldIndex) as FormControl).value;
    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: deletedValues,
    };
    this.deletedSixddFields.push(deletedData);

    sixddFieldsArray.removeAt(sixddFieldIndex);
  }

  deletedDirectpayFields: any[] = [];
  removedirectpay(expansionPanelIndex: number, directpayFieldIndex: number, formArray?: FormArray, index?: number, formArrayName?: string) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const directpayFieldsArray = expansionPanel.get('awardDirectPaymentEntityValuesDetails') as FormArray;

    let deletedValues = (directpayFieldsArray.at(directpayFieldIndex) as FormControl).value;
    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: deletedValues,
    };
    this.deletedDirectpayFields.push(deletedData);

    directpayFieldsArray.removeAt(directpayFieldIndex);
  }

  deletedRevenuepayFields: any[] = [];
  removerevenuepay(expansionPanelIndex: number, revenuepayFieldIndex: number, formArray?: FormArray, index?: number, formArrayName?: string) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const revenuepayFieldsArray = expansionPanel.get('awardRevenuePaymentEntityValuesDetails') as FormArray;
    let deletedValues = (revenuepayFieldsArray.at(revenuepayFieldIndex) as FormControl).value;
    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: deletedValues,
    };
    this.deletedRevenuepayFields.push(deletedData);
    revenuepayFieldsArray.removeAt(revenuepayFieldIndex);
  }


  deletedCivilpayFields: any[] = [];
  removecivilpay(expansionPanelIndex: number, civilpayFieldIndex: number, formArray?: FormArray, index?: number, formArrayName?: string) {


    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const civilpayFieldsArray = expansionPanel.get('awardCourtDepositPaymentEntityValuesDetails') as FormArray;
    let deletedValues = (civilpayFieldsArray.at(civilpayFieldIndex) as FormControl).value;
    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: deletedValues,
    };
    this.deletedCivilpayFields.push(deletedData);
    civilpayFieldsArray.removeAt(civilpayFieldIndex);
  }

  deletedPhoFields: any[] = [];
  removepho(expansionPanelIndex: number, phoFieldIndex: number, formArray?: FormArray, index?: number, formArrayName?: string) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const phoFieldsArray = expansionPanel.get('awardPossessionTakenOverEntityValuesDetails') as FormArray;

    let deletedValues = (phoFieldsArray.at(phoFieldIndex) as FormControl).value;
    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: deletedValues,
    };
    this.deletedPhoFields.push(deletedData);

    phoFieldsArray.removeAt(phoFieldIndex);
  }

  deletedPhoschemeFields: any[] = [];
  removephoscheme(expansionPanelIndex: number, phoschemeFieldIndex: number, formArray?: FormArray, index?: number, formArrayName?: string) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const phoschemeFieldsArray = expansionPanel.get('awardPossessionExtentAvailableEntityValuesDetails') as FormArray;

    let deletedValues = (phoschemeFieldsArray.at(phoschemeFieldIndex) as FormControl).value;
    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: deletedValues,
    };
    this.deletedPhoschemeFields.push(deletedData);

    phoschemeFieldsArray.removeAt(phoschemeFieldIndex);
  }

  deletedPnhoFields: any[] = [];
  removepnho(expansionPanelIndex: number, pnhoFieldIndex: number, formArray?: FormArray, index?: number, formArrayName?: string) {
    const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
    const pnhoFieldsArray = expansionPanel.get('awardPossessionNotTakenOverEntityValuesDetails') as FormArray;

    let deletedValues = (pnhoFieldsArray.at(pnhoFieldIndex) as FormControl).value;
    const deletedData = {
      deletedFormArrayString: formArrayName,
      deletedValue: deletedValues,
    };
    this.deletedPnhoFields.push(deletedData);

    pnhoFieldsArray.removeAt(pnhoFieldIndex);
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

  adds: any[] = [];




  removeSurvey(index: number) {
    this.adds.splice(index, 1);
  }

  adds2: any[] = [];

  addsurvey2() {
    const addsurvey2 = 'Add Survey Field2';
    this.adds2.push(addsurvey2);
  }

  removeSurvey2(index: number) {
    this.adds2.splice(index, 1);
  }




  // Lps form addition - end



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

  // Image And Video Upload

  onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log("Selected File", this.selectedFile);
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload(unique_code: string) {
    const formData = new FormData();
    if (this.allFiles) {

    }
    console.log('allFiles', this.allFiles)
    if (this.allFiles && this.allFiles.length > 0) {
      for (let img of this.allFiles) {
        console.log(img)
        formData.append('files', img);

        let uniqueCode = '';

        if (this.n_UNIQUE_ID) {
          uniqueCode = this.n_UNIQUE_ID.toString()
        } else {
          uniqueCode = unique_code;
        }
        formData.append('N_UNIQUE_ID', uniqueCode);
      }
    }

    // formData.append('files', this.allFiles)

    console.log(formData);
    console.log("uploaded image", this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    // uploadImageData.append('file', this.selectedFile, this.selectedFile.name);

    console.error("save Api image", uploadImageData)

    //Make a call to the Spring Boot Application to save the image
    this.commonService.apiPostImageCall(formData, 'uploadMultipleMedias')
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );

  }

  imageSource: any;
  videoSource: any;

  getImage() {

    const imageReqBody = {
      id: Number(3)
    }
    this.commonService.apiPostCall(imageReqBody, 'getMedia')
      .subscribe(
        res => {
          console.log("media response", res);

          const data = [res.data];

          let byteArray = atob(data[0].mediaData);
          let byteNumbers = new Array(byteArray.length);
          for (let i = 0; i < byteArray.length; i++) {
            byteNumbers[i] = byteArray.charCodeAt(i);
          }
          let byteArrayUint8 = new Uint8Array(byteNumbers);

          let blob = new Blob([byteArrayUint8], { type: 'application/octet-stream' });

          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            var base64String = reader.result as string;
            console.log('Base64 String - ', base64String);

            // Assign the base64String value to the class property
            this.imageSource = base64String;

            // You can now use the 'this.image' property in your Angular template
          };
        }
      );
  }


  // Upload Multiple media
  uploadMultipleMedia() {
    console.log("uploaded image", this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
    console.error("save Api image", uploadImageData)

    //Make a call to the Spring Boot Application to save the image
    this.commonService.apiPostImageCall(uploadImageData, 'uploadMultipleMedias')
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
  // Function to convert a file to Base64 encoded string
  async fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1]; // Get the content after "data:image/png;base64," or similar
        resolve(base64Content);
      };
      reader.onerror = () => {
        reject(new Error('File reading failed'));
      };
      reader.readAsDataURL(file);
    });
  }

  // File upload LPS
  async onFileSelectedlps(event: Event, expansionPanelIndex: number, controlName: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      try {
        const base64String = await this.fileToBase64(file);
        const expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;

        // Update the respective properties in the form
        expansionPanel.get(controlName)?.setValue(base64String);
        if (controlName === 'file') {
          const originalFileName = file.name;
          const fileExtension = originalFileName.split('.').pop();
          const fileName = `lps_file.${fileExtension}`;

          expansionPanel.get('v_FILE_NAME')?.setValue(fileName);
        }
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    }
    else {
      // No file selected, set the respective properties to null
      const expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      expansionPanel.get(controlName)?.setValue(null);
      if (controlName === 'file1') {
        expansionPanel.get('v_FILE_1_FILENAME')?.setValue('fourone_file_1');
      }
    }
  }

  async onLpsFileSelected(event: Event, expansionPanelIndex: number, fileIndex: number,) {
    console.log(event)
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      try {
        const base64String = await this.fileToBase64(file);
        const expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
        const lpsFieldsArray = expansionPanel.get('lpsFileDynamicValuesDetails') as FormArray;
        const lpsField = lpsFieldsArray.at(fileIndex) as FormGroup;

        // Set the filename for the owner file (lps_1_file, lps_2_file, etc.)
        const originalFileName = file.name;
        const fileExtension = originalFileName.split('.').pop(); // Get the file extension
        const fileName = `lps_${fileIndex + 1}_file.${fileExtension}`;

        // Update the respective properties in the form
        lpsField.get('file')?.setValue(base64String);
        lpsField.get('v_FILE_NAME')?.setValue(fileName);
      } catch (error) {
        console.error('Error converting owner file to Base64:', error);
      }
    }
    else {
      console.log('else')
      const expansionPanel = this.expansionPanelsArray.at(expansionPanelIndex) as FormGroup;
      const lpsFieldsArray = expansionPanel.get('lpsFileDynamicValuesDetails') as FormArray;
      const lpsField = lpsFieldsArray.at(fileIndex) as FormGroup;

      lpsField.get('file')?.setValue(null);
      lpsField.get('v_FILE_NAME')?.setValue('lps_file_1');
    }
  }

  async awsFileSelected(event: Event, expansionPanelIndex: number, controlName: string, tab: string, fileType: string) {
    this.isLoader = true;

    console.log('num', Math.floor(Math.random() * 90000) + 10000);
    // const myId = uuid.v4();
    const myId = Math.floor(Math.random() * 90000) + 10000;


    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const originalFileName = file.name;
      const fileExtension = originalFileName.split('.').pop();
      var fileName: any;
      if (tab == "fourOne") {
        if (fileType == "file1") {
          fileName = `fourone_file_1${myId}.${fileExtension}`;
        } else {
          fileName = `fourone_file_2${myId}.${fileExtension}`;
        }
      } else {
        if (fileType == "file1") {
          fileName = `sixdd_file_1${myId}.${fileExtension}`;
        } else {
          fileName = `sixdd_file_2${myId}.${fileExtension}`;
        }
      }

      // const s3Direct = async (file: File, fileName: string) => {
      try {
        const s3 = new AWS.S3({
          accessKeyId: this.aws_SecretKey.accessKeyId,
          secretAccessKey: this.aws_SecretKey.secretKey,
          region: this.aws_SecretKey.region
        });

        // const generatedFilename = this.generateFilename();
        const params = {
          Bucket: this.aws_SecretKey.bucketName,
          Key: fileName,
          Body: file
        };

        return new Promise((resolve, reject) => {
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              console.error('Error uploading file:', err);
              reject(err);
              this.isLoader = false;
            } else {
              console.log('File uploaded successfully. File location:', data.Location);
              // const fileuri = "http://tnhb-noc-docs.s3-website.ap-south-1.amazonaws.com/" + fileName;
              const fileuri = "https://tnhb-land-docs.s3.amazonaws.com/" + fileName;


              console.log('fileuri', fileuri);
              // const filesdata = {
              //   filename: fileName,
              //   // appid: response.id,
              //   filepath: fileuri,
              //   // date: formattedDate
              // };
              if (tab == "fourOne") {
                const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;

                if (fileType == "file1") {
                  // fileName = `fourone_file_1.${fileExtension}`;

                  expansionPanel.get(controlName)?.setValue(fileName);
                  expansionPanel.get('v_FILE_1_FILEPATH')?.setValue(fileuri);
                } else {
                  // fileName = `fourone_file_1.${fileExtension}`;

                  expansionPanel.get(controlName)?.setValue(fileName);
                  expansionPanel.get('v_FILE_2_FILEPATH')?.setValue(fileuri);
                }



              } else {
                const expansionPanelSixDD = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;

                if (fileType == "file1") {
                  // fileName = `sixdd_file_1.${fileExtension}`;

                  expansionPanelSixDD.get(controlName)?.setValue(fileName);
                  expansionPanelSixDD.get('v_FILE_1_FILEPATH')?.setValue(fileuri);

                } else {
                  // fileName = `sixdd_file_2.${fileExtension}`;

                  expansionPanelSixDD.get(controlName)?.setValue(fileName);
                  expansionPanelSixDD.get('v_FILE_2_FILEPATH')?.setValue(fileuri);
                }

              }
              this.isLoader = false;


              // Add file data to database
              // this.customerService.sendS3Data(filesdata).subscribe(
              //   (response: any) => {
              //     console.log(response);
              //     resolve(response);
              //   },
              //   (error: any) => {
              //     console.error("ERROR : ", error);
              //     reject(error);
              //   }
              // );

            }
          });
        });
      } catch (error) {
        // console.error(Error uploading ${fileName}:, error);
        throw error;
      }
    } else {
      this.isLoader = false;
    }
    // }

  }
  async awsFileSelectedAwardFile(event: Event, expansionPanelIndex: number, controlName: string, tab: string, fileType: string) {

    // this.isLoader = true;

    console.log('num', Math.floor(Math.random() * 90000) + 10000);
    // const myId = uuid.v4();
    const myId = Math.floor(Math.random() * 90000) + 10000;


    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const originalFileName = file.name;
      const fileExtension = originalFileName.split('.').pop();
      var fileName: any;
      fileName = `award_file${myId}.${fileExtension}`;



      // const s3Direct = async (file: File, fileName: string) => {
      try {
        const s3 = new AWS.S3({
          accessKeyId: this.aws_SecretKey.accessKeyId,
          secretAccessKey: this.aws_SecretKey.secretKey,
          region: this.aws_SecretKey.region
        });

        // const generatedFilename = this.generateFilename();
        const params = {
          Bucket: this.aws_SecretKey.bucketName,
          Key: fileName,
          Body: file
        };

        return new Promise((resolve, reject) => {
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              console.error('Error uploading file:', err);
              // this.isLoader = false;

              reject(err);
            } else {
              console.log('File uploaded successfully. File location:', data.Location);
              // const fileuri = "http://tnhb-noc-docs.s3-website.ap-south-1.amazonaws.com/" + fileName;
              const fileuri = "https://tnhb-land-docs.s3.amazonaws.com/" + fileName;


              console.log('fileuri', fileuri);
              // const filesdata = {
              //   filename: fileName,
              //   // appid: response.id,
              //   filepath: fileuri,
              //   // date: formattedDate
              // };
              const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;

              expansionPanel.get(controlName)?.setValue(fileName);
              expansionPanel.get('v_FILE_PATH')?.setValue(fileuri);
            }
          });
          // this.isLoader = false;

        });
      } catch (error) {
        // console.error(Error uploading ${fileName}:, error);
        // this.isLoader = false;

        throw error;
      }
    } else {
      // this.isLoader = false;

    }
    // }
  }
  async awsFileSelectedAwardMultipleFile(event: Event, expansionPanelIndex: number, controlName: string, tab: string, fileType: string) {

    // this.isLoader = true;

    console.log('num', Math.floor(Math.random() * 90000) + 10000);
    // const myId = uuid.v4();
    const myId = Math.floor(Math.random() * 90000) + 10000;


    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const originalFileName = file.name;
      const fileExtension = originalFileName.split('.').pop();
      var fileName: any;

      if (controlName === 'court_file') {
        console.log(controlName)
        this.court_file_STRINGName = `court_file${myId}.${fileExtension}`;
        fileName = `court_file${myId}.${fileExtension}`;
        console.log(this.court_file_STRING)
      }

      if (controlName === 'road_file') {
        this.road_file_STRINGName = `road_file${myId}.${fileExtension}`;
        fileName = `road_file${myId}.${fileExtension}`;
      }
      if (controlName === 'enchro_file') {
        this.enchro_file_STRINGName = `enchro_file${myId}.${fileExtension}`;
        fileName = `enchro_file${myId}.${fileExtension}`;

      }
      if (controlName === 'scatt_file') {
        this.scatt_file_STRINGName = `scatt_file${myId}.${fileExtension}`;
        fileName = `scatt_file${myId}.${fileExtension}`;
      }
      if (controlName === 'quash_file') {
        this.quash_file_STRINGName = `quash_file${myId}.${fileExtension}`;
        fileName = `quash_file${myId}.${fileExtension}`
      }

      if (controlName === 'recon_file') {
        this.recon_file_STRINGName = `recon_file${myId}.${fileExtension}`
        fileName = `recon_file${myId}.${fileExtension}`

      }

      if (controlName === 'noc_file') {
        this.noc_file_STRINGName = `noc_file${myId}.${fileExtension}`
        fileName = `noc_file${myId}.${fileExtension}`

      }
      if (controlName === 'pnho_court_file') {
        this.pnho_court_file_STRINGName = `pnho_court_file${myId}.${fileExtension}`
        fileName = `pnho_court_file${myId}.${fileExtension}`

      }
      if (controlName === 'pnho_enchro_file') {
        this.pnho_enchro_file_STRINGName = `pnho_enchro_file${myId}.${fileExtension}`
        fileName = `pnho_enchro_file${myId}.${fileExtension}`

      }
      if (controlName === 'pnho_quash_file') {
        this.pnho_quash_file_STRINGName = `pnho_quash_file${myId}.${fileExtension}`
        fileName = `pnho_quash_file${myId}.${fileExtension}`

      }
      if (controlName === 'pnho_encumbr_file') {
        this.pnho_encumbr_file_STRINGName = `pnho_encumbr_file${myId}.${fileExtension}`
        fileName = `pnho_encumbr_file${myId}.${fileExtension}`

      }



      // const s3Direct = async (file: File, fileName: string) => {
      try {
        const s3 = new AWS.S3({
          accessKeyId: this.aws_SecretKey.accessKeyId,
          secretAccessKey: this.aws_SecretKey.secretKey,
          region: this.aws_SecretKey.region
        });

        // const generatedFilename = this.generateFilename();
        const params = {
          Bucket: this.aws_SecretKey.bucketName,
          Key: fileName,
          Body: file
        };

        return new Promise((resolve, reject) => {
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              console.error('Error uploading file:', err);
              // this.isLoader = false;

              reject(err);
            } else {
              console.log('File uploaded successfully. File location:', data.Location);
              // const fileuri = "http://tnhb-noc-docs.s3-website.ap-south-1.amazonaws.com/" + fileName;
              const fileuri = "https://tnhb-land-docs.s3.amazonaws.com/" + fileName;


              console.log('fileuri', fileuri);
              // const filesdata = {
              //   filename: fileName,
              //   // appid: response.id,
              //   filepath: fileuri,
              //   // date: formattedDate
              // };


              if (controlName === 'court_file') {
                console.log(controlName)
                this.court_file_STRING = fileuri;
                console.log(this.court_file_STRING)
              }

              if (controlName === 'road_file') {
                this.road_file_STRING = fileuri;
              }
              if (controlName === 'enchro_file') {
                this.enchro_file_STRING = fileuri;

              }
              if (controlName === 'scatt_file') {
                this.scatt_file_STRING = fileuri;
              }
              if (controlName === 'quash_file') {
                this.quash_file_STRING = fileuri;
              }

              if (controlName === 'recon_file') {
                this.recon_file_STRING = fileuri


              }

              if (controlName === 'noc_file') {
                this.noc_file_STRING = fileuri

              }
              if (controlName === 'pnho_court_file') {
                this.pnho_court_file_STRING = fileuri

              }
              if (controlName === 'pnho_enchro_file') {
                this.pnho_enchro_file_STRING = fileuri

              }
              if (controlName === 'pnho_quash_file') {
                this.pnho_quash_file_STRING = fileuri

              }
              if (controlName === 'pnho_encumbr_file') {
                this.pnho_encumbr_file_STRING = fileuri

              }
              this.isLoader = false;

            }
          });
        });
      } catch (error) {
        // console.error(Error uploading ${fileName}:, error);
        // this.isLoader = false;

        throw error;
      }
    } else {
      // this.isLoader = false;

    }
    // }
  }
  // File upload FourOne 4(1)
  async onFileSelected(event: Event, expansionPanelIndex: number, controlName: string) {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      try {
        const base64String = await this.fileToBase64(file);

        const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;

        // Update the respective properties in the form
        expansionPanel.get(controlName)?.setValue(base64String);
        if (controlName === 'file1') {
          const originalFileName = file.name;
          const fileExtension = originalFileName.split('.').pop();
          const fileName = `fourone_file_1.${fileExtension}`;
          expansionPanel.get('v_FILE_1_FILENAME')?.setValue(fileName);
          console.log('filename1', expansionPanel.get('v_FILE_1_FILENAME')?.value);

        } else if (controlName === 'file2') {
          const originalFileName = file.name;
          const fileExtension = originalFileName.split('.').pop();
          const fileName = `fourone_file_2.${fileExtension}`;
          expansionPanel.get('v_FILE_2_FILENAME')?.setValue(fileName);
        }
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    }
    else {
      // No file selected, set the respective properties to null
      const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
      expansionPanel.get(controlName)?.setValue(null);
      if (controlName === 'file1') {
        expansionPanel.get('v_FILE_1_FILENAME')?.setValue('fourone_file_1');
      }
      else if (controlName === 'file2') {
        expansionPanel.get('v_FILE_2_FILENAME')?.setValue('fourone_file_2');
      }
    }
  }

  async onOwnerFileSelected(event: Event, expansionPanelIndex: number, ownerIndex: number) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      try {
        const base64String = await this.fileToBase64(file);
        const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
        const ownerFieldsArray = expansionPanel.get('fourOneDynamicFileEntityDetails') as FormArray;
        const ownerField = ownerFieldsArray.at(ownerIndex) as FormGroup;

        // Set the filename for the owner file (fmd_1_file, fmd_2_file, etc.)
        const originalFileName = file.name;
        const fileExtension = originalFileName.split('.').pop();
        const fileName = `fmd_${ownerIndex + 1}_file.${fileExtension}`;

        // Update the respective properties in the form
        ownerField.get('file')?.setValue(base64String);
        ownerField.get('v_FILE_NAME')?.setValue(fileName);
      } catch (error) {
        console.error('Error converting owner file to Base64:', error);
      }
    }

    else {
      // No file selected, set the respective properties to null
      const expansionPanel = this.expansionPanelsArray4.at(expansionPanelIndex) as FormGroup;
      const ownerFieldsArray = expansionPanel.get('fourOneDynamicFileEntityDetails') as FormArray;
      const ownerField = ownerFieldsArray.at(ownerIndex) as FormGroup;
      ownerField.get('file')?.setValue(null);
      ownerField.get('v_FILE_NAME')?.setValue('fmd_file');
    }
  }


  //File Upload Sixdd
  async onFileSelectedsixdd(event: Event, expansionPanelIndex: number, controlName: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      try {
        const base64String = await this.fileToBase64(file);

        const expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;

        // Update the respective properties in the form
        expansionPanel.get(controlName)?.setValue(base64String);
        if (controlName === 'file1') {
          const originalFileName = file.name;
          const fileExtension = originalFileName.split('.').pop();
          const fileName = `sixdd_file_1.${fileExtension}`;

          expansionPanel.get('v_FILE_1_FILENAME')?.setValue(fileName);
        } else if (controlName === 'file2') {
          const originalFileName = file.name;
          const fileExtension = originalFileName.split('.').pop();
          const fileName = `sixdd_file_2.${fileExtension}`;

          expansionPanel.get('v_FILE_2_FILENAME')?.setValue(fileName);
        }
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    }
    else {
      // No file selected, set the respective properties to null
      const expansionPanel = this.expansionPanelsSixDD.at(expansionPanelIndex) as FormGroup;
      expansionPanel.get(controlName)?.setValue(null);
      if (controlName === 'file1') {
        expansionPanel.get('v_FILE_1_FILENAME')?.setValue('sixdd_file_1');
      }
      else if (controlName === 'file2') {
        expansionPanel.get('v_FILE_2_FILENAME')?.setValue('sixdd_file_2');
      }
    }
  }

  //File Upload Award
  async onFileSelectedaward(event: Event, expansionPanelIndex: number, controlName: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      try {
        const base64String = await this.fileToBase64(file);

        const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;

        // Update the respective properties in the form
        expansionPanel.get(controlName)?.setValue(base64String);
        if (controlName === 'file') {
          const originalFileName = file.name;
          const fileExtension = originalFileName.split('.').pop();
          const fileName = `award_file.${fileExtension}`;

          expansionPanel.get('v_FILE_NAME')?.setValue(fileName);
        }
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    }
    else {
      const expansionPanel = this.expansionPanelsAward.at(expansionPanelIndex) as FormGroup;
      expansionPanel.get(controlName)?.setValue(null);
      if (controlName === 'file') {
        expansionPanel.get('v_FILE_NAME')?.setValue('award_file');
      }
    }

  }


  async onFileSelectedawarddynamic(event: Event, expansionPanelIndex: number, controlName: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      try {
        const base64String = await this.fileToBase64(file);

        if (controlName === 'court_file') {
          console.log(controlName)
          this.court_file_STRING = base64String
          console.log(this.court_file_STRING)
        }

        if (controlName === 'road_file') {
          this.road_file_STRING = base64String
        }
        if (controlName === 'enchro_file') {
          this.enchro_file_STRING = base64String
        }
        if (controlName === 'scatt_file') {
          this.scatt_file_STRING = base64String
        }
        if (controlName === 'quash_file') {
          this.quash_file_STRING = base64String
        }

        if (controlName === 'recon_file') {
          this.recon_file_STRING = base64String
        }

        if (controlName === 'noc_file') {
          this.noc_file_STRING = base64String
        }
        if (controlName === 'pnho_court_file') {
          this.pnho_court_file_STRING = base64String
        }
        if (controlName === 'pnho_enchro_file') {
          this.pnho_enchro_file_STRING = base64String
        }
        if (controlName === 'pnho_quash_file') {
          this.pnho_quash_file_STRING = base64String
        }
        if (controlName === 'pnho_encumbr_file') {
          this.pnho_encumbr_file_STRING = base64String
        }

      }
      catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    }
    else {
      if (controlName === 'court_file') {
        console.log(controlName)
        this.court_file_STRING = null
        console.log(this.court_file_STRING)
      }

      if (controlName === 'road_file') {
        this.road_file_STRING = null
      }
      if (controlName === 'enchro_file') {
        this.enchro_file_STRING = null
      }
      if (controlName === 'scatt_file') {
        this.scatt_file_STRING = null
      }
      if (controlName === 'quash_file') {
        this.quash_file_STRING = null
      }

      if (controlName === 'recon_file') {
        this.recon_file_STRING = null
      }

      if (controlName === 'noc_file') {
        this.noc_file_STRING = null
      }
      if (controlName === 'pnho_court_file') {
        this.pnho_court_file_STRING = null
      }
      if (controlName === 'pnho_enchro_file') {
        this.pnho_enchro_file_STRING = null
      }
      if (controlName === 'pnho_quash_file') {
        this.pnho_quash_file_STRING = null
      }
      if (controlName === 'pnho_encumbr_file') {
        this.pnho_encumbr_file_STRING = null
      }

    }
  }




  saveApi() {
    debugger
    // LandDetails save Data
    const firstTabApiPost: LandDigitDataEntity = this.personalInfoFormGroup.value;
    if (this.view === true) {
      firstTabApiPost.n_UNIQUE_ID = null;

    } else if (this.edit === true) {
      firstTabApiPost.n_UNIQUE_ID = this.n_UNIQUE_ID;

    };
    if (this.firstTabMode === 'create') {
      firstTabApiPost.mode = 'create';
      firstTabApiPost.n_UNIQUE_ID = null;
    } else if (this.firstTabMode === 'edit') {
      firstTabApiPost.mode = 'edit';
    }
    let unique_code = null;
    if (this.view === true || this.edit === true) {
      unique_code = this.n_UNIQUE_ID
    }
    else {
      unique_code = null;
    }

    // LPS Save Data
    let lpsTabDetails = this.LPSFormGroup.value;
    let firstTablps = lpsTabDetails.expansionPanels;

    let deletedLpsDynamicValues = this.deletedLpsDynamicValues;
    for (let i = 0; i < firstTablps.length; i++) {
      for (let j = 0; j < deletedLpsDynamicValues.length; j++) {
        let x = deletedLpsDynamicValues[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTablps[i].dynamicValuesDetails[i] = deletedValueObj;
        console.log(firstTablps[i].dynamicValuesDetails);
      }
    }

    let deletedlpsVillageDetails = this.deletedlpsVillageDetails;
    for (let i = 0; i < firstTablps.length; i++) {
      for (let j = 0; j < deletedlpsVillageDetails.length; j++) {
        let x = deletedlpsVillageDetails[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTablps[i].lpsVillageDetails[i] = deletedValueObj;
        console.log(firstTablps[i].lpsVillageDetails);
      }
    }



    // 4One
    let fouroneTabDetails = this.fourOneFormGroup.value;
    let firstTabFouOne = fouroneTabDetails.expansionPanels4;

    // if (!this.view && !this.edit) {
    //   firstTabFouOne.forEach((panelData) => {
    //     panelData.d_DATE_OF_4_ONE_GO = this.datePipe.transform(panelData.d_DATE_OF_4_ONE_GO, 'dd-MM-yyyy');
    //     panelData.d_DATE_OF_GAZETTE_NOTIFICATION = this.datePipe.transform(panelData.d_DATE_OF_GAZETTE_NOTIFICATION, 'dd-MM-yyyy');
    //     panelData.d_DATE_OF_LOCALITY = this.datePipe.transform(panelData.d_DATE_OF_LOCALITY, 'dd-MM-yyyy');
    //   });
    // }

    let deletedFourOneDynamicValues = this.deletedFourOneDynamicValues;
    for (let i = 0; i < firstTabFouOne.length; i++) {
      for (let j = 0; j < deletedFourOneDynamicValues.length; j++) {
        let x = deletedFourOneDynamicValues[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete'; // Set the mode to 'delete'
        firstTabFouOne[i].dynamicValuesDetails[i] = deletedValueObj;
        console.log(firstTabFouOne[i].dynamicValuesDetails);
      }
    }

    let deletedFourOneOwnerValues = this.deletedFourOneOwnerValues;
    for (let i = 0; i < firstTabFouOne.length; i++) {
      for (let j = 0; j < deletedFourOneOwnerValues.length; j++) {
        let x = deletedFourOneOwnerValues[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete'; // Set the mode to 'delete'
        firstTabFouOne[i].fourOneDynamicFileEntityDetails[i] = deletedValueObj;
        console.log(firstTabFouOne[i].fourOneDynamicFileEntityDetails);
      }
    }

    // SixDD
    let sixddTabDetails = this.sixDDFormGroup.value;

    let firstTabSixdd = sixddTabDetails.expansionPanelsSix;
    console.log("sixddTabDetails to Api", firstTabSixdd);

    // if (!this.view && !this.edit) {
    //   firstTabSixdd.forEach((panelData) => {
    //     panelData.d_DATE_OF_6DD_GO = this.datePipe.transform(panelData.d_DATE_OF_6DD_GO, 'dd-MM-yyyy');
    //     panelData.d_DATE_OF_GAZETTE_NOTIFICATION = this.datePipe.transform(panelData.d_DATE_OF_GAZETTE_NOTIFICATION, 'dd-MM-yyyy');
    //     panelData.d_DATE_OF_LOCALITY = this.datePipe.transform(panelData.d_DATE_OF_LOCALITY, 'dd-MM-yyyy');
    //   });
    // }

    let deletedSixddDynamicValues = this.deletedSixddDynamicValues;
    for (let i = 0; i < firstTabSixdd.length; i++) {
      for (let j = 0; j < deletedSixddDynamicValues.length; j++) {
        let x = deletedSixddDynamicValues[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabSixdd[i].dynamicValuesDetails[i] = deletedValueObj;
        console.log(firstTabSixdd[i].dynamicValuesDetails);
      }
    }


    let deletedSixddFields = this.deletedSixddFields;
    for (let i = 0; i < firstTabSixdd.length; i++) {
      for (let j = 0; j < deletedSixddFields.length; j++) {
        let x = deletedSixddFields[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabSixdd[i].sixDdDynamicFileEntityValuesDetails[i] = deletedValueObj;
        console.log(firstTabSixdd[i].sixDdDynamicFileEntityValuesDetails);
      }
    }

    // Award
    let awardTabDetails = this.awardInfoFormGroup.value;
    console.log("awardTabDetails", awardTabDetails);
    let firstTabAward = awardTabDetails.expansionPanelsAward;
    console.log("awardTabDetails to Api", firstTabAward);

    if (!this.view && !this.edit) {
      firstTabAward.forEach((panelData) => {
        panelData.d_AWARD_DATE = this.datePipe.transform(panelData.d_AWARD_DATE, 'dd-MM-yyyy');
      });
    }


    let deletedAwardDynamicValues = this.deletedAwardDynamicValues;
    for (let i = 0; i < firstTabAward.length; i++) {
      for (let j = 0; j < deletedAwardDynamicValues.length; j++) {
        let x = deletedAwardDynamicValues[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabAward[i].dynamicValuesDetails[i] = deletedValueObj;
        console.log(firstTabAward[i].dynamicValuesDetails);
      }
    }

    let deletedDirectpayFields = this.deletedDirectpayFields;
    for (let i = 0; i < firstTabAward.length; i++) {
      for (let j = 0; j < deletedDirectpayFields.length; j++) {
        let x = deletedDirectpayFields[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabAward[i].awardDirectPaymentEntityValuesDetails[i] = deletedValueObj;
        console.log(firstTabAward[i].awardDirectPaymentEntityValuesDetails);
      }
    }

    let deletedRevenuepayFields = this.deletedRevenuepayFields;
    for (let i = 0; i < firstTabAward.length; i++) {
      for (let j = 0; j < deletedRevenuepayFields.length; j++) {
        let x = deletedRevenuepayFields[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabAward[i].awardRevenuePaymentEntityValuesDetails[i] = deletedValueObj;
        console.log(firstTabAward[i].awardRevenuePaymentEntityValuesDetails);
      }
    }

    let deletedCivilpayFields = this.deletedCivilpayFields;
    for (let i = 0; i < firstTabAward.length; i++) {
      for (let j = 0; j < deletedCivilpayFields.length; j++) {
        let x = deletedCivilpayFields[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabAward[i].awardCourtDepositPaymentEntityValuesDetails[i] = deletedValueObj;
        console.log(firstTabAward[i].awardCourtDepositPaymentEntityValuesDetails);
      }
    }

    let deletedPhoFields = this.deletedPhoFields;
    for (let i = 0; i < firstTabAward.length; i++) {
      for (let j = 0; j < deletedPhoFields.length; j++) {
        let x = deletedPhoFields[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabAward[i].awardPossessionTakenOverEntityValuesDetails[i] = deletedValueObj;
        console.log(firstTabAward[i].awardPossessionTakenOverEntityValuesDetails);
      }
    }


    let deletedPhoschemeFields = this.deletedPhoschemeFields;
    for (let i = 0; i < firstTabAward.length; i++) {
      for (let j = 0; j < deletedPhoschemeFields.length; j++) {
        let x = deletedPhoschemeFields[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabAward[i].awardPossessionExtentAvailableEntityValuesDetails[i] = deletedValueObj;
        console.log(firstTabAward[i].awardPossessionExtentAvailableEntityValuesDetails);
      }
    }

    let deletedPnhoFields = this.deletedPnhoFields;
    for (let i = 0; i < firstTabAward.length; i++) {
      for (let j = 0; j < deletedPnhoFields.length; j++) {
        let x = deletedPnhoFields[j];
        let deletedValueObj = x.deletedValue;
        deletedValueObj.mode = 'delete';
        firstTabAward[i].awardPossessionNotTakenOverEntityValuesDetails[i] = deletedValueObj;
        console.log(firstTabAward[i].awardPossessionNotTakenOverEntityValuesDetails);
      }
    }

    for (let i = 0; i < firstTabAward.length; i++) {
      const awardOtherFileEntityValuesDetails = [
        {
          v_FILE_NAME: "award_pho_courtcase_file",
          v_FILE_PATH: this.court_file_STRING ? this.court_file_STRING : '',
          v_EXTENT: firstTabAward[i].court_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].court_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.court_file_PATH_ID : '',
          // file: this.court_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },
        {
          v_FILE_NAME: "award_pho_road_file",
          v_FILE_PATH: this.road_file_STRING ? this.road_file_STRING : '',
          v_EXTENT: firstTabAward[i].road_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].road_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.road_file_PATH_ID : '',
          // file: this.road_file_STRING,
          file: '',
          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },

        {
          v_FILE_NAME: "award_pho_enchro_file",
          v_FILE_PATH: this.enchro_file_STRING ? this.enchro_file_STRING : '',
          v_EXTENT: firstTabAward[i].enchro_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].enchro_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.enchro_file_PATH_ID : '',
          // file: this.enchro_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },
        {
          v_FILE_NAME: "award_pho_scatt_file",
          v_FILE_PATH: this.scatt_file_STRING ? this.scatt_file_STRING : '',
          v_EXTENT: firstTabAward[i].scatt_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].scatt_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.scatt_file_PATH_ID : '',
          // file: this.scatt_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },

        {
          v_FILE_NAME: "award_pho_quash_file",
          v_FILE_PATH: this.quash_file_STRING ? this.quash_file_STRING : '',
          v_EXTENT: firstTabAward[i].quash_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].quash_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.quash_file_PATH_ID : '',
          // file: this.quash_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },
        {
          v_FILE_NAME: "award_pho_recon_file",
          v_FILE_PATH: this.recon_file_STRING ? this.recon_file_STRING : '',
          v_EXTENT: firstTabAward[i].recon_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].recon_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.recon_file_PATH_ID : '',
          // file: this.recon_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },
        {
          v_FILE_NAME: "award_pho_noc_file",
          v_FILE_PATH: this.noc_file_STRING ? this.noc_file_STRING : '',
          v_EXTENT: firstTabAward[i].noc_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].noc_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.noc_file_PATH_ID : '',
          // file: this.noc_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },

        {
          v_FILE_NAME: "award_pnho_courtcase_file",
          v_FILE_PATH: this.pnho_court_file_STRING ? this.pnho_court_file_STRING : '',
          v_EXTENT: firstTabAward[i].pnho_court_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].pnho_court_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.pnho_court_file_PATH_ID : '',
          // file: this.pnho_court_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },

        {
          v_FILE_NAME: "award_pnho_enchro_file",
          v_FILE_PATH: this.pnho_enchro_file_STRING ? this.pnho_enchro_file_STRING : '',
          v_EXTENT: firstTabAward[i].pnho_enchro_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].pnho_enchro_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.pnho_enchro_file_PATH_ID : '',
          // file: this.pnho_enchro_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },

        {
          v_FILE_NAME: "award_pnho_quash_file",
          v_FILE_PATH: this.pnho_quash_file_STRING ? this.pnho_quash_file_STRING : '',
          v_EXTENT: firstTabAward[i].pnho_quash_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].pnho_quash_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.pnho_quash_file_PATH_ID : '',
          // file: this.pnho_quash_file_STRING,
          file: '',

          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },

        {
          v_FILE_NAME: "award_pnho_encumbr_file",
          v_FILE_PATH: this.pnho_encumbr_file_STRING ? this.pnho_encumbr_file_STRING : '',
          v_EXTENT: firstTabAward[i].pnho_encumbr_v_extent,
          v_LEGAL_PROCEEDING: firstTabAward[i].pnho_encumbr_v_legal_proceeding,
          mode: this.n_UNIQUE_ID ? 'edit' : 'create',
          n_UNIQUE_ID: this.n_UNIQUE_ID,
          n_ID: this.n_UNIQUE_ID ? this.pnho_encumbr_file_PATH_ID : '',
          // file: this.pnho_encumbr_file_STRING,
          file: '',
          n_FILE_ID: this.n_UNIQUE_ID ? firstTabAward[i].n_ID : ''
        },

      ];
      console.log("awardotherfileentity", awardOtherFileEntityValuesDetails)


      // Remove the individual fields from firstTabAward

      delete firstTabAward[i].court_file;
      delete firstTabAward[i].court_v_extent;
      delete firstTabAward[i].court_v_legal_proceeding;
      delete firstTabAward[i].road_file;
      delete firstTabAward[i].road_v_extent;
      delete firstTabAward[i].road_v_legal_proceeding;
      delete firstTabAward[i].enchro_file;
      delete firstTabAward[i].enchro_v_extent;
      delete firstTabAward[i].enchro_v_legal_proceeding;
      delete firstTabAward[i].scatt_file;
      delete firstTabAward[i].scatt_v_extent;
      delete firstTabAward[i].scatt_v_legal_proceeding;
      delete firstTabAward[i].quash_file;
      delete firstTabAward[i].quash_v_extent;
      delete firstTabAward[i].quash_v_legal_proceeding;
      delete firstTabAward[i].recon_file;
      delete firstTabAward[i].recon_v_extent;
      delete firstTabAward[i].recon_v_legal_proceeding;
      delete firstTabAward[i].noc_file;
      delete firstTabAward[i].noc_v_extent;
      delete firstTabAward[i].noc_v_legal_proceeding;
      delete firstTabAward[i].pnho_court_file;
      delete firstTabAward[i].pnho_court_v_extent;
      delete firstTabAward[i].pnho_court_v_legal_proceeding;
      delete firstTabAward[i].pnho_enchro_file;
      delete firstTabAward[i].pnho_enchro_v_extent;
      delete firstTabAward[i].pnho_enchro_v_legal_proceeding;
      delete firstTabAward[i].pnho_quash_file;
      delete firstTabAward[i].pnho_quash_v_extent;
      delete firstTabAward[i].pnho_quash_v_legal_proceeding;
      delete firstTabAward[i].pnho_encumbr_file;
      delete firstTabAward[i].pnho_encumbr_v_extent;
      delete firstTabAward[i].pnho_encumbr_v_legal_proceeding;
      firstTabAward[i].awardOtherFileEntityValuesDetails = awardOtherFileEntityValuesDetails;

    }


    console.log("FirstTabAward", firstTabAward)

    // Leftover

    const leftoverTabDetails = {
      leftOverLPS4OneEntity: this.panelOneForm.value.leftOverLPS4OneEntity,
      left4One6DDEntity: this.panelTwoForm.value.left4One6DDEntity,
      left6DDAwardEntity: this.panelThreeForm.value.left6DDAwardEntity,
    };

    console.log("leftoverTabDetails:", leftoverTabDetails);

    // const saveApiCreateBody = {
    //   "landDigitDataEntity": {
    //     "mode": "edit",
    //     "n_UNIQUE_ID": unique_code,
    //     "v_NAME_OF_SCHEME": "Trichy Test Scheme Sambath",
    //     "v_NAME_OF_DISTRICT": "Karur",
    //     "v_NAME_OF_CIRCLE": "Trichy",
    //     "v_NAME_OF_DIVISION": "Trichy",
    //     "v_NAME_OF_GEO_TAGGING": "NA"
    //   },
    //   "lpsTabDetails": [
    //     {
    //       "mode": "create",
    //       "lpsVillageDetails": [
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "1.07",
    //           "v_SURVEY_NO": "1399/1",
    //           "v_NAME_OF_VILLAGE": "Senapiratti"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.56",
    //           "v_SURVEY_NO": "1399/2",
    //           "v_NAME_OF_VILLAGE": "Senapiratti"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.56",
    //           "v_SURVEY_NO": "1399/3",
    //           "v_NAME_OF_VILLAGE": "Senapiratti"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.35",
    //           "v_SURVEY_NO": "1400/1",
    //           "v_NAME_OF_VILLAGE": "Senapiratti"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.51",
    //           "v_SURVEY_NO": "1400/2",
    //           "v_NAME_OF_VILLAGE": "Senapiratti"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.3",
    //           "v_SURVEY_NO": "1400/3",
    //           "v_NAME_OF_VILLAGE": "Senapiratti"
    //         }
    //       ],
    //       "lpsFileDynamicValuesDetails": [
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "lps_1_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A"
    //         }
    //       ],
    //       "dynamicValuesDetails": [
    //         {
    //           "mode": "create",
    //           "v_COLUMN_NAME": "Special GO No",
    //           "v_VALUE_NAME": "12345",
    //           "v_FILE_NAME": "lps_1_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null
    //         }
    //       ],
    //       // "v_REF_NO": "LPS Ref No.327  dated  28.11.1981",
    //       "v_FILE_NAME": "lps_1_file",
    //       "n_UNIQUE_ID": null,
    //       "v_TOTAL_EXTENT": "3.35",
    //       "v_FILE_PATH": "NA"
    //     }
    //   ],
    //   "fouroneTabDetails": [
    //     {
    //       "mode": "create",
    //       "fourOneDynamicFileEntityDetails": [
    //         {
    //           "V_NAME_OF_VILLAGE": 'perur',
    //           "v_EXTENT_NO": "1.07",
    //           "mode": "create",
    //           // "v_NORTH": "NA",
    //           "v_NAME_OF_OWNER": "NA",
    //           // "v_EAST": "NA",
    //           // "v_SOUTH": "NA",
    //           // "v_WEST": "NA",
    //           "v_FILE_NAME": "fmd_1_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_SURVEY_NO": "1399/1"
    //         },
    //         {
    //           "v_EXTENT_NO": "0.56",
    //           "mode": "create",
    //           // "v_NORTH": "NA",
    //           "v_NAME_OF_OWNER": "NA",
    //           // "v_EAST": "NA",
    //           // "v_SOUTH": "NA",
    //           // "v_WEST": "NA",
    //           "v_FILE_NAME": "fmd_1_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_SURVEY_NO": "1399/2"
    //         },
    //         {
    //           "v_EXTENT_NO": "0.56",
    //           "mode": "create",
    //           // "v_NORTH": "NA",
    //           "v_NAME_OF_OWNER": "NA",
    //           // "v_EAST": "NA",
    //           // "v_SOUTH": "NA",
    //           // "v_WEST": "NA",
    //           "v_FILE_NAME": "fmd_1_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_SURVEY_NO": "1399/3"
    //         }
    //       ],
    //       "dynamicValuesDetails": [
    //         {
    //           "mode": "create",
    //           "v_COLUMN_NAME": "pdfno",
    //           "v_VALUE_NAME": "907",
    //           "v_FILE_NAME": "4_one_1_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null
    //         }
    //       ],
    //       // "v_REF_NO": "NA",
    //       "n_UNIQUE_ID": null,
    //       "v_TOTAL_EXTENT": "3",
    //       "v_FILE_1_FILENAME": "4_one_1_file",
    //       "v_GAZETTE_REF_NO": "GAZ-103",
    //       // "d_DATE_OF_GAZETTE_NOTIFICATION": "23/11/1983",
    //       // "d_DATE_OF_LOCALITY": "NA",
    //       "v_FILE_1_FILEPATH": "N/A",
    //       "v_FILE_2_FILEPATH": "N/A",
    //       "v_FILE_2_FILENAME": "N/A",
    //       // "v_4_ONE_GO_REF_NO": "RF-103",
    //       "d_DATE_OF_4_ONE_GO": "23/11/1982"
    //     }
    //   ],
    //   "sixddTabDetails": [
    //     {
    //       "mode": "create",
    //       "sixDdDynamicFileEntityValuesDetails": [
    //         {
    //           "mode": "create",
    //           "v_NAME_OF_OWNER": null,
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "1.07",
    //           "v_SURVEY_NO": "1399/1"
    //         },
    //         {
    //           "mode": "create",
    //           "v_NAME_OF_OWNER": null,
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.56",
    //           "v_SURVEY_NO": "1399/2"
    //         },
    //         {
    //           "mode": "create",
    //           "v_NAME_OF_OWNER": null,
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.56",
    //           "v_SURVEY_NO": "1399/3"
    //         },
    //         {
    //           "mode": "create",
    //           "v_NAME_OF_OWNER": null,
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.35",
    //           "v_SURVEY_NO": "1400/1"
    //         },
    //         {
    //           "mode": "create",
    //           "v_NAME_OF_OWNER": null,
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.51",
    //           "v_SURVEY_NO": "1400/2"
    //         },
    //         {
    //           "mode": "create",
    //           "v_NAME_OF_OWNER": null,
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_EXTENT": "0.3",
    //           "v_SURVEY_NO": "1400/3"
    //         }
    //       ],
    //       "dynamicValuesDetails": [
    //         {
    //           "mode": "create",
    //           "v_COLUMN_NAME": "pdf56",
    //           "v_VALUE_NAME": "67",
    //           "v_FILE_NAME": "6dd_1_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null
    //         }
    //       ],
    //       // "v_REF_NO": "NA",
    //       "n_UNIQUE_ID": null,
    //       "v_TOTAL_EXTENT": "3",
    //       "v_FILE_1_FILENAME": "6dd_1_file",
    //       "d_DATE_OF_6DD_GO": "29/05/1984",
    //       "v_GAZETTE_REF_NO": "NA",
    //       // "d_DATE_OF_GAZETTE_NOTIFICATION": "NA",
    //       // "d_DATE_OF_LOCALITY": "NA",
    //       "v_FILE_1_FILEPATH": "N/A",
    //       "v_FILE_2_FILEPATH": "N/A",
    //       "v_FILE_2_FILENAME": "N/A",
    //       // "v_6DD_GO_REF_NO": "RF-40"
    //     }
    //   ],
    //   "awardTabDetails": [
    //     {
    //       "mode": "create",
    //       "awardOtherFileEntityValuesDetails": [
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pho_courtcase_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "N/A",
    //           "v_LEGAL_PROCEEDING": "N/A"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pnho_courtcase_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "N/A",
    //           "v_LEGAL_PROCEEDING": "N/A"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pho_road_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "98",
    //           "v_LEGAL_PROCEEDING": "O.S"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pho_enchro_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "N/A",
    //           "v_LEGAL_PROCEEDING": "W.A"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pho_scatt_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "0",
    //           "v_LEGAL_PROCEEDING": "O.S"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pho_quash_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "N/A",
    //           "v_LEGAL_PROCEEDING": "TRY"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pho_recon_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "0",
    //           "v_LEGAL_PROCEEDING": "o.s"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pho_noc_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "n/a",
    //           "v_LEGAL_PROCEEDING": "W.A"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pnho_encumbr_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "N/A",
    //           "v_LEGAL_PROCEEDING": "O.S"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pnho_quash_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "0",
    //           "v_LEGAL_PROCEEDING": "W.A"
    //         },
    //         {
    //           "mode": "create",
    //           "v_FILE_NAME": "award_pnho_enchro_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_FILE_PATH": "N/A",
    //           "v_EXTENT": "N/A",
    //           "v_LEGAL_PROCEEDING": "O.S"
    //         }
    //       ],
    //       "dynamicValuesDetails": [
    //         {
    //           "mode": "create",
    //           "v_COLUMN_NAME": "pdfnumber",
    //           "v_VALUE_NAME": "89",
    //           "v_FILE_NAME": "award_1_file",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null
    //         }
    //       ],
    //       "awardDirectPaymentEntityValuesDetails": [
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_AMOUNT": "0",
    //           "v_NOTIFIED_PERSON": "N/A"
    //         }
    //       ],
    //       "awardRevenuePaymentEntityValuesDetails": [
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_AMOUNT": "N/A",
    //           "v_NOTIFIED_PERSON": "N/A"
    //         }
    //       ],
    //       "awardCourtDepositPaymentEntityValuesDetails": [
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_AMOUNT": "33207.83",
    //           "v_NOTIFIED_PERSON": "NA"
    //         }
    //       ],
    //       "AwardPossessionTakenOverEntityValuesDetails": [
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_TOTAL_EXTENT": "1.07",
    //           "v_SURVEY_NO": "1399/1"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_TOTAL_EXTENT": "0.56",
    //           "v_SURVEY_NO": "1399/2"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_TOTAL_EXTENT": "0.56",
    //           "v_SURVEY_NO": "1399/3"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_TOTAL_EXTENT": "0.35",
    //           "v_SURVEY_NO": "1400/1"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_TOTAL_EXTENT": "0.51",
    //           "v_SURVEY_NO": "1400/2"
    //         },
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_TOTAL_EXTENT": "0.3",
    //           "v_SURVEY_NO": "1400/3"
    //         }
    //       ],
    //       "awardPossessionNotTakenOverEntityValuesDetails": [
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_TOTAL_EXTENT": "0",
    //           "v_SURVEY_NO": "N/A"
    //         }
    //       ],
    //       "awardPossessionExtentAvailableEntityValuesDetails": [
    //         {
    //           "mode": "create",
    //           "n_FILE_ID": 2,
    //           "n_UNIQUE_ID": null,
    //           "v_TOTAL_EXTENT": "N/A",
    //           "v_SURVEY_NO": "N/A"
    //         }
    //       ],
    //       "v_FILE_NAME": "award_1_file",
    //       "n_UNIQUE_ID": null,
    //       "v_TOTAL_EXTENT": "3.35",
    //       "v_PNHO_TOTAL_EXTENT": "N/A",
    //       "v_PHO_SCHEME_TOTAL_EXTENT": "3.35",
    //       "v_PHO_TOTAL_EXTENT": "3.35",
    //       "v_AWARD_NO": "01/86",
    //       "d_AWARD_DATE": "06/06/1986",
    //       "v_FILE_PATH": "N/A",
    //       "n_TOTAL_AWARD_AMOUNT": 33207.83
    //     }
    //   ],
    //   "leftoverTabDetails": {
    //     "leftOverLPS4OneEntity": [
    //       {
    //         "primarykey": null,
    //         "mode": "edit",
    //         "left4One6DDEntityDetails": null,
    //         "left6DDAwardRepoEntityDetails": null,
    //         "n_UNIQUE_ID": unique_code,
    //         "v_EXTENT": "Karthick",
    //         "v_SURVEY_NO": "First left over modified"
    //       }
    //     ],
    //     "left6DDAwardEntity": [
    //       {
    //         "mode": "edit",
    //         "n_UNIQUE_ID": unique_code,
    //         "v_EXTENT": "6dd Award",
    //         "v_SURVEY_NO": "N/A",
    //         "primarykey": null
    //       }
    //     ],
    //     "left4One6DDEntity": [
    //       {
    //         "mode": "edit",
    //         "n_UNIQUE_ID": unique_code,
    //         "v_EXTENT": "seq check",
    //         "v_SURVEY_NO": "N/A",
    //         "primarykey": null
    //       }
    //     ]
    //   }
    // }
    // let apiDataFor4one = {
    //   "primaryKey": 2,
    //   "mode": null,
    //   "fourOneDynamicFileEntityDetails": [
    //     {
    //       "v_EXTENT_NO": null,
    //       "mode": null,
    //       "v_FILE_NAME": "fmd_1_file",
    //       "n_ID": 17,
    //       "n_UNIQUE_ID": 1001,
    //       "n_FILE_ID": 2,
    //       "v_FILE_PATH": "N/A",
    //       "v_SURVEY_NO": "1399/1",
    //       // "v_EAST": "NA",
    //       // "v_NORTH": "NA",
    //       // "v_WEST": "NA",
    //       // "v_SOUTH": "NA",
    //       "v_NAME_OF_OWNER": "NA"
    //     }
    //   ],
    //   "dynamicValuesDetails": [],
    //   "v_GAZETTE_REF_NO": "NA",
    //   "v_FILE_1_FILEPATH": "N/A",
    //   // "d_DATE_OF_LOCALITY": "NA",
    //   "v_FILE_2_FILEPATH": "N/A",
    //   "v_FILE_1_FILENAME": "4_one_1_file",
    //   // "d_DATE_OF_GAZETTE_NOTIFICATION": "NA",
    //   "d_DATE_OF_4_ONE_GO": "23/11/1982",
    //   // "v_4_ONE_GO_REF_NO": "RF-103",
    //   "v_FILE_2_FILENAME": "N/A",
    //   "n_UNIQUE_ID": 1001,
    //   "v_TOTAL_EXTENT": "3",
    //   // "v_REF_NO": "NA"
    // }

    const saveApiBody: SaveLandApiModel = {
      landDigitDataEntity: firstTabApiPost,
      // lpsTabDetails: firstTablps,
      fouroneTabDetails: firstTabFouOne,
      sixddTabDetails: firstTabSixdd,
      awardTabDetails: firstTabAward,
      leftoverTabDetails: leftoverTabDetails
    }

    console.log("saveApiBody", saveApiBody);

    this.commonService.apiPostCall(saveApiBody, 'saveUpdateLandData').subscribe(
      (saveResponse) => {
        console.log("Save Response", saveResponse);
        // if (saveResponse.message) {
        if (saveResponse && saveResponse.status == 1) {

          const uniqueCode = saveResponse.message;
          // this.onUpload(uniqueCode);
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: 'Land details updated successfully',
          });
          this.back();
        }

      },
      (error) => {
        console.error(error);
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Error in creating land data',
        });
        this.back();
      }
    );
  }

  getdivision() {
    const requestBody = {
      types: this.accesslevel1,
      values: this.group_name
    };

    // this.http.post<any[]>('http://localhost:5000/GetData', requestBody).subscribe(
    this.http.post<any[]>('http://localhost:5000/GetData', requestBody).subscribe(

      (response) => {
        console.log("get division response ", response);
        const mappedResponse = response.map(item => ({
          circle: item.v_NAME_OF_CIRCLE,
          division: item.v_NAME_OF_DIVISION,
          district: item.v_NAME_OF_DISTRICT
        }));

        const uniqueCircles = [...new Set(mappedResponse.map(item => item.circle))];
        const uniqueDivisions = [...new Set(mappedResponse.map(item => item.division))];
        const uniqueDistricts = [...new Set(mappedResponse.map(item => item.district))];

        this.circleSelectList = [...uniqueCircles].filter(Boolean);
        this.divisionSelectList = [...uniqueDivisions].filter(Boolean);
        // this.districtSelectList = [...uniqueDistricts].filter(Boolean);
        console.log(this.divisionSelectList, this.districtSelectList, this.circleSelectList);
      },
      (error) => {
        console.error('Error fetching data from API:', error);
      }
    );
  }
  numberValidate(evt) {

    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /[0-9]/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) {
        theEvent.preventDefault();
      }
    }

    // console.log('evt', evt.target.value);


  }
  numberValidateWithDecimal(evt) {

    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /[0-9.]/;
    // const regex = /\d*\.?\d?/g;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) {
        theEvent.preventDefault();
      }
    }

    // console.log('evt', evt.target.value);


  }
  removeFile(index, tab, file, controlName) {

    if (tab == "fourOne") {
      const expansionPanel = this.expansionPanelsArray4.at(index) as FormGroup;

      if (file == "file1") {
        expansionPanel.get(controlName)?.setValue(null);
        expansionPanel.get('file1')?.setValue(null);
        expansionPanel.get('v_FILE_1_FILEPATH')?.setValue(null);



      } else {
        expansionPanel.get(controlName)?.setValue(null);
        expansionPanel.get('file2')?.setValue(null);
        expansionPanel.get('v_FILE_2_FILEPATH')?.setValue(null);

      }



    } else {
      const expansionPanelSixDD = this.expansionPanelsSixDD.at(index) as FormGroup;

      if (file == "file1") {
        expansionPanelSixDD.get(controlName)?.setValue(null);
        expansionPanelSixDD.get('file1')?.setValue(null);
        expansionPanelSixDD.get('v_FILE_1_FILEPATH')?.setValue(null);



      } else {
        expansionPanelSixDD.get(controlName)?.setValue(null);
        expansionPanelSixDD.get('file2')?.setValue(null);
        expansionPanelSixDD.get('v_FILE_2_FILEPATH')?.setValue(null);

      }

    }


  }
  removeFileAward(index, controlName) {
    debugger
    const expansionPanel = this.expansionPanelsAward.at(index) as FormGroup;

    expansionPanel.get(controlName)?.setValue('');
    expansionPanel.get('v_FILE_PATH')?.setValue('');

    // expansionPanel.get(controlName)?.setValue(null);
    //     expansionPanel.get('file2')?.setValue(null);
    //     expansionPanel.get('v_FILE_2_FILEPATH')?.setValue(null);


  }

  // delete(index, tab, file, controlName): void {
  //   const dialog = this.dialog.open(ConfirmDialogComponent, {
  //     width: '400px',
  //     data: {
  //       from: "delete",
  //     }
  //   });
  //   dialog.afterClosed().subscribe(data => {
  //     if (data) {
  //       console.log('...data', data);
  //       this.removeFile(index, tab, file, controlName);
  //       // const delLoad = {
  //       //   "id": Number(id)
  //       // }
  //       // this.commonService.apiPostCall(delLoad, 'deleteV2LandData').subscribe(response => {
  //       //   // if (response.message.includes('Successfully')) {
  //       //   this.snackbar.openFromComponent(SnackbarComponent, {
  //       //     data: 'Data deleted successfully',
  //       //   });
  //       //   // this.getLandCount();
  //       //   // }
  //       // })

  //     }
  //   })
  // }


}

