export interface ISessions {
  session?: {
    amount: number;
    validate: boolean;
  };
  httpCode: number;
  httpMessage: string;
  internal_id: string;
  userFriendlyError: string | null;
  moreInformation: string;
}
