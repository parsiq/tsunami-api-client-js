import { TransferDirection } from '../enum/transfer-direction';
import { AssetType } from '../enum/asset-type';

export interface GetTsunamiTransfersQuery {
  asset_type: AssetType[];

  direction?: TransferDirection;

  counterparty?: string;
}
