interface NftRangeResponse {
  has_more: boolean | null;
  next_offset: string | null;
}

export interface GenericNftRangeResponse {
  range: NftRangeResponse;
}
