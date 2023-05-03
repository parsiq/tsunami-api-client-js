import { FtTokenHolderByAddressItem } from './ft-token-holder-by-address-item';
import { GenericFtRangeResponse } from './ft-range-response';

export interface FtTokenHolderByAddressResponse extends GenericFtRangeResponse {
  items: readonly FtTokenHolderByAddressItem[];
  native_balance_raw: string | null;
  native_balance_calculated: string | null;
}
