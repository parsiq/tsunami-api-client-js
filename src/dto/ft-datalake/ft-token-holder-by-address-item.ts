import { FtBasicTokenInfoItem } from './ft-basic-token-info-item';
import { FtBasicHolderItem } from './ft-basic-holder-item';

export interface FtTokenHolderByAddressItem extends FtBasicHolderItem {
  token: FtBasicTokenInfoItem;
}
