import { BlockHashRangeQuery } from './block-hash-range-query';

export interface TsunamiDataQueryBoundaries extends BlockHashRangeQuery {
  offset?: string;
  limit?: number;
}
