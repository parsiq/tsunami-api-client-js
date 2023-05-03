import { NftCollectionMetadata, NftTokenMetadata } from './nft-metadata';
import { NftTransferMetadata } from './nft-transfer-metadata';
import { NftSalePriceData } from './nft-sale-price-data';

export interface NftAddressInventoryHistoryItem {
  id: string;
  token_id: string;
  collection: NftCollectionMetadata;
  metadata: NftTokenMetadata | null;
  transfer: NftTransferMetadata;
  sale_price: NftSalePriceData | null;
}
