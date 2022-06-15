export interface Beneficiary {
  correlative: number;
  rut: number;
  dv: string;
  name: string;
  relacion: string;
}

export interface ClaimType {
  code?: any;
  name?: any;
}

export interface IClaim {
  beneficiary: Beneficiary;
  claimedAmount: number;
  claimsStatus: string;
  comments: string; // necesario?
  issueDate: Date;
  paidAmount: number;
  paymentDate: Date;
  claimType: ClaimType;
  remittanceId: string;
  requestNumber: number;
  requestStatus: string;
  settlementDate: Date;
}

export interface IClaims {
  claims: IClaim[];
  httpCode: number;
  httpMessage: string;
  internal_id: string;
  moreInformation: string;
  pagination: Pagination;
  userFriendlyError: string | null;
}

export interface Pagination {
  numberOfPages: number;
  numberOfRecords: number;
  pageNumber: number;
  recordsPerPage: number;
}
