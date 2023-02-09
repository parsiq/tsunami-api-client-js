import {LATEST_TAG} from "../constants";

export interface BlockRangeQuery {
    block_number_start?: number;
    block_number_end?: number | typeof LATEST_TAG;
    timestamp_start?: number;
    timestamp_end?: number;
}
