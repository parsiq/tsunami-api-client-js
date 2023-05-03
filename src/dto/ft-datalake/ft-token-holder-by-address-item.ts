import { FtBasicTokenInfoItem } from './ft-basic-token-info-item';
import { FtBasicHolderItem } from './ft-basic-holder-item';
import { FtUsdPriceInfo } from './ft-usd-price-info';

export interface FtTokenHolderByAddressItem extends FtBasicHolderItem {
  token: FtBasicTokenInfoItem;
  token_usd_price: FtUsdPriceInfo | null;
}
