import {BlockHashRangeQuery} from "./block-hash-range-query";

export interface HistoricalDataQueryBoundaries extends BlockHashRangeQuery {
    offset?: string;
    limit?: number;
}
