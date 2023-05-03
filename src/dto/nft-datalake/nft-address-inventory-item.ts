import { NftCollectionMetadata, NftTokenMetadata } from './nft-metadata';
import { NftInventoryTransferMetadata } from './nft-transfer-metadata';
import { NftSalePriceData } from './nft-sale-price-data';

export interface NftAddressInventoryItem {
  id: string;
  collection: NftCollectionMetadata;
  token_id: string;
  transfer: NftInventoryTransferMetadata;
  metadata: NftTokenMetadata | null;
  sale_price: NftSalePriceData | null;
}
