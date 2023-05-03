export interface NftTokenMetadata {
  token_uri?: string;
  content?: string | any;
  is_json?: boolean;
}

export interface NftCollectionMetadata {
  total_supply?: string;
  symbol?: string;
  name?: string;
  address: string;
  standard: string;
}
