import { TsunamiBlock } from '../dto/tsunami-block';
import { TsunamiEvent } from '../dto/tsunami-event';
import { TsunamiCall } from '../dto/tsunami-call';
import { GetTsunamiEventQuery } from '../dto/get-tsunami-event-query';
import { GetTsunamiCallQuery } from '../dto/get-tsunami-call-query';
import { TsunamiDataQueryBoundaries } from '../dto/tsunami-data-query-boundaries';
import { TsunamiTransaction, TsunamiTransactionWithLogs } from '../dto';
import { GetTsunamiTransfersQuery } from '../dto/get-tsunami-transfers-query';
import { TsunamiTransfer } from '../dto/tsunami-transfer';
import { GetWalletTransactionsQuery } from '../dto/get-wallet-transactions-query';

export interface TsunamiClient {
  getBlockByHash(blockHash: string): Promise<TsunamiBlock>;
  getBlocks(startBlockNumber: number, endBlockNumber: number): AsyncGenerator<TsunamiBlock, void, undefined>;
  getBlocksByTimestamp(
    startBlockTimestamp: number,
    endBlockTimestamp: number,
  ): AsyncGenerator<TsunamiBlock, void, undefined>;
  getLatestBlock(): Promise<TsunamiBlock>;
  getEventsBatch(
    criteria: GetTsunamiEventQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiEvent[], void, undefined>;
  getEvents(
    criteria: GetTsunamiEventQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiEvent, void, undefined>;
  getCalls(
    criteria: GetTsunamiCallQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiCall, void, undefined>;
  getTransaction(transactionHash: string): Promise<TsunamiTransaction>;
  getTransactionWithLogs(transactionHash: string): Promise<TsunamiTransaction>;
  getTransfers(
    address: string,
    criteria: GetTsunamiTransfersQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiTransfer, void, undefined>;
  getContractTransfers(
    contract: string,
    criteria: GetTsunamiTransfersQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiTransfer, void, undefined>;
  getWalletTransactions(
    address: string,
    criteria: GetWalletTransactionsQuery & { include_logs?: false },
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiTransaction, void, undefined>;
  getWalletTransactions(
    address: string,
    criteria: GetWalletTransactionsQuery & { include_logs: true },
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiTransactionWithLogs, void, undefined>;
}
