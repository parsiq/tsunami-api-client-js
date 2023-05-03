import { NftTokenMetadata } from './nft-metadata';
import { NftSalePriceData } from './nft-sale-price-data';
import { NftCollectionTransferMetadata } from './nft-transfer-metadata';

export interface NftCollectionTokenHolder {
  id: string;
  token_id: string;
  transfer: NftCollectionTransferMetadata;
  metadata: NftTokenMetadata | null;
  sale_price: NftSalePriceData | null;
}
