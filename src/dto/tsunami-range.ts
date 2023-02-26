export interface TsunamiRange {
  has_more: boolean;
  start_block: number;
  end_block: number;
  next_offset: string | null;
}
