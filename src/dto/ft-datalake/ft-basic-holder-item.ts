export interface FtBasicHolderItem {
  id: string;
  seen_at_block_number: number;
  value_raw: string;
  value_calculated: string;
  usd_value_raw: string | null;
  usd_value_calculated: string | null;
}
