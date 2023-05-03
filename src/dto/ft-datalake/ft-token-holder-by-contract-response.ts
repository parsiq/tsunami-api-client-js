import { GenericFtRangeResponse } from './ft-range-response';
import { FtTokenHolderByContractItem } from './ft-token-holder-by-contract-item';
import { FtTokenInfoItemWithSupplies } from './ft-token-info-item-with-supplies';

export interface FtTokenHolderByContractResponse extends GenericFtRangeResponse {
  token: FtTokenInfoItemWithSupplies | null;
  items: readonly FtTokenHolderByContractItem[];
}
