import {HistoricalBlockHeader} from "./historical-block-header";

export interface HistoricalBlock {
    hash: string;

    parent_hash: string;

    header: HistoricalBlockHeader;

    number: number;
    timestamp?: number;

    ghost: boolean;
}
