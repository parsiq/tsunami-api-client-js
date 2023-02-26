export class TsunamiBlockHeader {
  nonce: number;
  gas_used: number;
  mix_hash: string;
  gas_limit: number;
  difficulty: number;
  extra_data: string;
  logs_bloom: string;
  state_root: string;
  sha3_uncles: string;
  receipts_root: string;
  total_difficulty: string;
  transactions_root: string;
}
