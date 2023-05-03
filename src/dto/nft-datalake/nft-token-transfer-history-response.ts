import { GenericNftRangeResponse } from './nft-range-response';
import { NftCollectionMetadata, NftTokenMetadata } from './nft-metadata';
import { NftTokenTransferItem } from './nft-token-transfer-item';

export interface NftTokenTransferHistoryResponse extends GenericNftRangeResponse {
  token_id: string;
  collection: NftCollectionMetadata;
  metadata: NftTokenMetadata | null;
  items: NftTokenTransferItem[];
}
