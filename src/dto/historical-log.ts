export interface HistoricalLog {
    id: string;
    tx_hash: string;
    block_hash: string;
    block_number?: number;
    timestamp?: number;
    origin: string;
    contract: string;
}
