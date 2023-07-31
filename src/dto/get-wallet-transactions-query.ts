import { TransferDirection } from '../enum/transfer-direction';

export interface GetWalletTransactionsQuery {
  include_logs?: boolean;

  direction?: TransferDirection;

  counterparty?: string;
}
