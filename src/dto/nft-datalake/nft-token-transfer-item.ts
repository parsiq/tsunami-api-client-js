import { NftTransferMetadata } from './nft-transfer-metadata';
import { NftSalePriceData } from './nft-sale-price-data';

export interface NftTokenTransferItem {
  id: string;
  transfer: NftTransferMetadata;
  sale_price: NftSalePriceData | null;
}
