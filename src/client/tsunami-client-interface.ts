import {
  GetContractCreateQuery,
  GetContractSelfDestructsQuery,
  GetTsunamiCallQuery,
  GetTsunamiEventQuery,
  TsunamiBlock,
  TsunamiCall,
  TsunamiContractCreate,
  TsunamiContractSelfDestruct,
  TsunamiDataQueryBoundaries,
  TsunamiEvent,
  TsunamiTransaction,
  TsunamiTransactionWithLogs,
  TsunamiTransfer,
} from '../dto';
import { GetTsunamiTransfersQuery } from '../dto/get-tsunami-transfers-query';
import { GetWalletTransactionsQuery } from '../dto/get-wallet-transactions-query';

export interface TsunamiClient {
  getBlockByHash(blockHash: string): Promise<TsunamiBlock>;
  getBlockByNumber(blockNumber: number): Promise<TsunamiBlock>;
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
  getContractSelfDestructs(
    criteria: GetContractSelfDestructsQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiContractSelfDestruct, void, undefined>;
  getContractCreates(
    criteria: GetContractCreateQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiContractCreate, void, undefined>;
}
