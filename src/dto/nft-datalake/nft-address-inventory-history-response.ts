import { NftAddressInventoryHistoryItem } from './nft-address-inventory-history-item';
import { GenericNftRangeResponse } from './nft-range-response';

export interface NftAddressInventoryHistoryResponse extends GenericNftRangeResponse {
  items: readonly NftAddressInventoryHistoryItem[];
}
