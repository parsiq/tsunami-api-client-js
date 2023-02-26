import { AssetType } from '../enum/asset-type';
import { TsunamiLog } from './tsunami-log';

export interface TsunamiTransfer extends TsunamiLog {
  sender: string;

  recipient: string;

  value: string | string[] | null;

  token_id: string | string[] | null;

  asset_type: AssetType;
}
