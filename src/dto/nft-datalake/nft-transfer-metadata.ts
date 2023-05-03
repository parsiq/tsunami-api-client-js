interface BasicNftTransferMetadata {
  block_number: number;
  block_timestamp: number;
  tx_hash: string;
}

export interface NftTransferMetadata extends BasicNftTransferMetadata {
  from: string;
  to: string;
  origin: string;
}

export interface NftInventoryTransferMetadata extends BasicNftTransferMetadata {
  sender: string;
}

export interface NftCollectionTransferMetadata extends BasicNftTransferMetadata {
  owner: string;
}
