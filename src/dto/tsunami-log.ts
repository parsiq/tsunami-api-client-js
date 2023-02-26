export interface TsunamiLog {
  id: string;
  tx_hash: string;
  block_hash: string;
  block_number?: number;
  timestamp?: number;
  origin: string;
  contract: string;
}
