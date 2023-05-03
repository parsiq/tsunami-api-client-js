import { NftHistoryItem } from './nft-history-item';
import { GenericNftRangeResponse } from './nft-range-response';

export interface NftHistoryResponse extends GenericNftRangeResponse {
  items: NftHistoryItem[];
}
