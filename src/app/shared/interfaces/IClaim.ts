export interface Beneficiary {
  correlative: number;
  rut: number;
  dv: string;
  name: string;
  relacion: string;
}

export interface Broker {
  rut: number;
  dv: string;
  name: string;
}

export interface Contractor {
  rut: number;
  dv: string;
  name: string;
}

export interface Insured {
  rut: number;
  dv: string;
  name: string;
}

export interface ClaimType {
  code?: any;
  name?: any;
}

export interface Plan {
  code: number;
  name: string;
  claimType: ClaimType;
}

export interface Policy {
  renewalIdtrassa: number;
  policyNumber: number;
}

export interface IClaim {
  beneficiary: Beneficiary;
  broker: Broker;
  claimChannel: string;
  claimUser?: any;
  claimedAmount: number;
  claimsStatus: string;
  comments: string;
  companyRut: number;
  contractor: Contractor;
  correlative: number;
  endValidityDate: Date;
  fechaPago: string;
  insured: Insured;
  issueDate: Date;
  paidAmount: number;
  paymentDate: Date;
  plan: Plan;
  policy: Policy;
  remittanceId: string;
  requestNumber: number;
  requestStatus: string;
  settlementDate: Date;
  startValidityDate: Date;
}

export interface IClaims {
  claims: IClaim[];
  httpCode: number;
  httpMessage: string;
  internal_id: string;
  moreInformation: string;
  pagination: {
    numberOfPages: number;
    numberOfRecords: number;
    pageNumber: number;
    recordsPerPage: number;
  };
  userFriendlyError: string | null;
}