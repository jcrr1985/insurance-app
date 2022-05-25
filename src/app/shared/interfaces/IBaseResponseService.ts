export interface IBaseResponseService {
  httpCode: number;
  httpMessage: string;
  internal_id: string;
  userFriendlyError: string;
  moreInformation: string;
}
