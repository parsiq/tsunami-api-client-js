import { BlockRangeQuery } from './block-range-query';

export interface BlockHashRangeQuery extends BlockRangeQuery {
  block_hash?: string;
}
