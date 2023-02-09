import {TransactionLog} from "./transaction-log";

export interface HistoricalTransaction {
    hash: string;
    block_hash?: string;
    block_number?: number;
    block_timestamp?: number;
    index?: number;
    gas_range?: number[];
    data?: object;
    logs?: readonly TransactionLog[];
}
