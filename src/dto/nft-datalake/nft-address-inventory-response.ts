import { GenericNftRangeResponse } from './nft-range-response';
import { NftAddressInventoryItem } from './nft-address-inventory-item';

export interface AddressInventoryResponse extends GenericNftRangeResponse {
  items: readonly NftAddressInventoryItem[];
}
