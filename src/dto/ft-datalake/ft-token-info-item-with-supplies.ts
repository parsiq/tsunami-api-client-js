import { FtBasicTokenInfoItem } from './ft-basic-token-info-item';

export interface FtTokenInfoItemWithSupplies extends FtBasicTokenInfoItem {
  total_supply_raw: string | null;
  total_supply_calculated: string | null;
}
