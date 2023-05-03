import { NftCollectionMetadata } from './nft-metadata';
import { GenericNftRangeResponse } from './nft-range-response';
import { NftCollectionTokenHolder } from './nft-collection-token-holder';

export interface NftCollectionHoldersResponse extends GenericNftRangeResponse {
  collection: NftCollectionMetadata;
  items: NftCollectionTokenHolder[];
}
