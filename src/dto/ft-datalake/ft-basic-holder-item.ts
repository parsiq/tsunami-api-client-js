export interface FtBasicHolderItem {
  id: string;
  seen_at_block_number: number;
  value_raw: string;
  value_calculated: string;
  estimated_usd_value: string | null;
}
