export interface Root {
  landDigitDataEntity: LandDigitDataEntity
  lpsTabDetails: LpsTabDetail[]
  fourOneTabDeatils: FourOneTabDeatil[]
  sixDdTabDeatils: SixDdTabDeatil[]
  awardTabDeatils: AwardTabDeatil[]
  leftoverTabDeatils: LeftoverTabDeatil[]
}

export interface LandDigitDataEntity {
  mode: string | null
  n_ID: number
  v_NAME_OF_DIVISION: string
  v_NAME_OF_DISTRICT: string
  v_NAME_OF_CIRCLE: string
  v_NAME_OF_GEO_TAGGING: string
  v_NAME_OF_SCHEME: string
  n_UNIQUE_ID: number
}

export interface LpsTabDetail {
  n_FILE_ID: any;
  mode: string;
  lpsVillageDetails: LpsVillageDetail[]
  lpsFileDynamicValuesDetails: LpsFileDynamicValuesDetail[]
  dynamicValuesDetails: DynamicValuesDetail[]
  n_ID: number
  n_UNIQUE_ID: number
  v_TOTAL_EXTENT: string
  v_FILE_PATH: string
  v_FILE_NAME: string
  v_REF_NO: string
}

export interface LpsVillageDetail {
  n_ID: number
  v_NAME_OF_VILLAGE: string
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_EXTENT: string
  v_SURVEY_NO: string
}

export interface LpsFileDynamicValuesDetail {
  n_ID: number
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_FILE_PATH: string
  v_FILE_NAME: string
}

export interface DynamicValuesDetail {
  v_FILE_NAME: any
  v_VILLAGE: any
  n_ID: number;
  n_FILE_ID: number;
  n_UNIQUE_ID: number;
  v_COLUMN_NAME: string;
  v_VALUE_NAME: string;
  mode: string
}

export interface LandDigitMediaModel {
  id: number
  fileName: string
  fileType: string
  mediaData: string
  n_UNIQUE_ID: number
}

export interface FourOneTabDeatil {
  fourOneDynamicFileEntityDetails: FourOneDynamicFileEntityDetail[]
  dynamicValuesDetails: DynamicValuesDetail[]
  n_ID: number
  mode: string
  d_DATE_OF_4_ONE_GO: string
  v_FILE_1_FILENAME: string
  v_FILE_1_FILEPATH: string
  d_DATE_OF_LOCALITY: string
  v_FILE_2_FILEPATH: string
  d_DATE_OF_GAZETTE_NOTIFICATION: string
  v_FILE_2_FILENAME: string
  v_4_ONE_GO_REF_NO: string
  v_GAZETTE_REF_NO: string
  n_UNIQUE_ID: number
  v_TOTAL_EXTENT: string
  v_REF_NO: string
}

export interface FourOneDynamicFileEntityDetail {
  n_ID: number
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_FILE_PATH: string
  v_FILE_NAME: string
  v_SURVEY_NO: string
  v_SOUTH: string
  v_WEST: string
  v_NAME_OF_OWNER: string
  v_NORTH: string
  v_EAST: string;
  v_EXTENT_NO: string;
  v_VILLAGE: string;
}

export interface SixDdTabDeatil {
  sixDdDynamicFileEntityValuesDetails: SixDdDynamicFileEntityValuesDetail[]
  dynamicValuesDetails: DynamicValuesDetail[]
  n_ID: number
  v_FILE_1_FILENAME: string
  v_FILE_1_FILEPATH: string
  d_DATE_OF_LOCALITY: string
  v_FILE_2_FILEPATH: string
  d_DATE_OF_GAZETTE_NOTIFICATION: string
  v_FILE_2_FILENAME: string
  v_GAZETTE_REF_NO: string
  d_DATE_OF_6DD_GO: string
  n_UNIQUE_ID: number
  v_TOTAL_EXTENT: string
  v_REF_NO: string
  v_6DD_GO_REF_NO: string
}

export interface SixDdDynamicFileEntityValuesDetail {
  v_VILLAGE: any
  n_ID: number
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_EXTENT: any
  v_SURVEY_NO: string
  v_NAME_OF_OWNER: string
}


export interface AwardTabDeatil {
  awardOtherFileEntityValuesDetails: AwardOtherFileEntityValuesDetail[]
  dynamicValuesDetails: DynamicValuesDetail4[]
  awardDirectPaymentEntityValuesDetails: AwardDirectPaymentEntityValuesDetail[]
  awardRevenuePaymentEntityValuesDetails: AwardRevenuePaymentEntityValuesDetail[]
  awardCourtDepositPaymentEntityValuesDetails: AwardCourtDepositPaymentEntityValuesDetail[]
  awardPossessionTakenOverEntityValuesDetails: AwardPossessionTakenOverEntityValuesDetails[]
  awardPossessionNotTakenOverEntityValuesDetails: AwardPossessionNotTakenOverEntityValuesDetail[]
  awardPossessionExtentAvailableEntityValuesDetails: AwardPossessionExtentAvailableEntityValuesDetail[]
  awardUtilisedLhoSelectedExtentList: []
  awardutilisedlnhoselectedextentlist: []
  awardnotUtilisedLhoSelectedExtentList: []
  n_ID: number
  v_PHO_SCHEME_TOTAL_EXTENT: string
  v_PHO_TOTAL_EXTENT: string
  v_PNHO_TOTAL_EXTENT: string
  n_TOTAL_AWARD_AMOUNT: number
  n_UNIQUE_ID: number
  v_TOTAL_EXTENT: string
  v_FILE_PATH: string
  v_AWARD_NO: string
  v_FILE_NAME: string
  d_AWARD_DATE: string
  v_LHO_EXTENT_ACRES: string
  v_LHO_FILE_NAME: string
  v_LHO_FILE_PATH: string
  v_LNHO_EXTENT_ACRES: string
  lhoExtent1: string
  utilisedExtent: string
  futureDevExtent: string
  notUtilisedLhoExtentList: string
  lnhoExtent1: string;
  lnhoUtilisedExtent: string;
}

export interface AwardOtherFileEntityValuesDetail {
  n_ID: number
  v_LEGAL_PROCEEDING: string
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_FILE_PATH: string
  v_FILE_NAME: string
  v_EXTENT: string
}

export interface DynamicValuesDetail4 {
  v_FILE_NAME: string
  n_ID: number
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_COLUMN_NAME: string
  v_VALUE_NAME: string;
}

export interface AwardDirectPaymentEntityValuesDetail {

  n_ID: number
  v_NOTIFIED_PERSON: string
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_AMOUNT: number
  v_FILE_PATH: string
  v_FILE_NAME: string
}

export interface AwardRevenuePaymentEntityValuesDetail {
  n_ID: number
  v_NOTIFIED_PERSON: string
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_AMOUNT: number
  v_FILE_PATH: string
  v_FILE_NAME: string
}

export interface AwardCourtDepositPaymentEntityValuesDetail {
  n_ID: number
  v_NOTIFIED_PERSON: string
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_AMOUNT: number
  v_FILE_PATH: string
  v_FILE_NAME: string
}

export interface AwardPossessionTakenOverEntityValuesDetails {
  n_ID: number
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_TOTAL_EXTENT: string
  v_SURVEY_NO: string
  v_VILLAGE: string;
}

export interface AwardPossessionNotTakenOverEntityValuesDetail {
  n_ID: number
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_TOTAL_EXTENT: string
  v_SURVEY_NO: string
  v_VILLAGE: string;
}

export interface AwardPossessionExtentAvailableEntityValuesDetail {
  n_ID: number
  n_FILE_ID: number
  n_UNIQUE_ID: number
  v_TOTAL_EXTENT: string
  v_SURVEY_NO: string
  v_VILLAGE: string;
}

export interface LeftoverTabDeatil {
  left4One6DDEntityDetails: Left4One6DdentityDetail[]
  left6DDAwardRepoEntityDetails: Left6DdawardRepoEntityDetail[]
  n_ID: number
  n_UNIQUE_ID: number
  v_EXTENT: string
  v_SURVEY_NO: string
}

export interface Left4One6DdentityDetail {
  n_ID: number
  n_UNIQUE_ID: number
  v_EXTENT: string
  v_SURVEY_NO: string
}

export interface Left6DdawardRepoEntityDetail {
  n_ID: number
  n_UNIQUE_ID: number
  v_EXTENT: string
  v_SURVEY_NO: string
}
