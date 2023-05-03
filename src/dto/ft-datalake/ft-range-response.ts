interface FtRangeResponse {
  has_more: boolean | null;
  next_offset: string | null;
}

export interface GenericFtRangeResponse {
  range: FtRangeResponse;
}
