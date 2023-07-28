import { TsunamiClient } from './tsunami-client-interface';
import {
  GetTsunamiCallQuery,
  GetTsunamiEventQuery,
  TsunamiBlock,
  TsunamiCall,
  TsunamiDataQueryBoundaries,
  TsunamiEvent,
  TsunamiRange,
  TsunamiTransaction,
  TsunamiTransfer,
  TsunamiTransactionWithLogs,
} from '../dto';
import { HttpClient } from './http-client';
import { AxiosRequestConfig, HttpStatusCode, isAxiosError } from 'axios';
import { convertForRequest } from './convertor';
import { IAxiosRetryConfig } from 'axios-retry';
import { ChainId } from '../enum/chain-id';
import { GetTsunamiTransfersQuery } from '../dto/get-tsunami-transfers-query';
import { GetWalletTransactionsQuery } from '../dto/get-wallet-transactions-query';
import { TsunamiError } from './tsunami-error';

const MALFORMED_RESPONSE_MESSAGE = 'Malformed Tsunami response';
const REQUEST_FAILED_MESSAGE = 'Tsunami request failed';

const baseUrl = (chain: ChainId) => {
  if (!Object.values(ChainId).includes(chain)) {
    throw new Error('Invalid chain provided');
  }
  return `https://api.parsiq.net/tsunami/${chain}/v1/`;
};

export class TsunamiApiClient extends HttpClient implements TsunamiClient {
  constructor(
    apiKey: string,
    chain: ChainId,
    config: { axiosConfig?: AxiosRequestConfig; retryConfig?: IAxiosRetryConfig } = {
      axiosConfig: {},
      retryConfig: {},
    },
  ) {
    const { axiosConfig = {}, retryConfig = {} } = config;
    super(baseUrl(chain), apiKey, axiosConfig, retryConfig);
  }

  public setChain(chain: ChainId) {
    this.instance.defaults.baseURL = baseUrl(chain);
  }

  public async getBlockByNumber(blockNumber: number) {
    const block = this.getBlocks(blockNumber, blockNumber);

    return (await block.next()).value as TsunamiBlock;
  }

  public async getBlockByHash(blockHash: string): Promise<TsunamiBlock> {
    try {
      const response = await this.instance.get<TsunamiBlock>(`/blocks/${blockHash}`);
      if (!response?.data) {
        throw new Error(MALFORMED_RESPONSE_MESSAGE);
      }

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HttpStatusCode.NotFound) {
          throw new TsunamiError(
            'Block not found',
            error.response?.status ?? null,
            error.response?.data?.error ?? null,
          );
        }
        throw new TsunamiError(
          error.response?.data?.message ?? REQUEST_FAILED_MESSAGE,
          error.response?.status ?? null,
          error.response?.data?.error ?? null,
          error.cause ?? null,
        );
      }
      throw new TsunamiError(REQUEST_FAILED_MESSAGE, null, null, error);
    }
  }

  async *getBlocksByTimestamp(
    startBlockTimestamp: number,
    endBlockTimestamp: number,
  ): AsyncGenerator<TsunamiBlock, void, undefined> {
    const iterator = this.queryTsunami<TsunamiBlock>(
      '/blocks',
      {},
      {
        timestamp_start: startBlockTimestamp,
        timestamp_end: endBlockTimestamp,
      },
    );
    for await (const blocks of iterator) {
      yield* blocks;
    }
  }

  public async *getBlocks(start: number, end: number) {
    const iterator = this.queryTsunami<TsunamiBlock>(
      '/blocks',
      {},
      {
        block_number_start: start,
        block_number_end: end,
      },
    );
    for await (const blocks of iterator) {
      yield* blocks;
    }
  }

  public async getLatestBlock(): Promise<TsunamiBlock> {
    try {
      const response = await this.instance.get<TsunamiBlock>('/blocks/latest');
      if (!response?.data) {
        throw new Error(MALFORMED_RESPONSE_MESSAGE);
      }
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new TsunamiError(
          error.response?.data?.message ?? REQUEST_FAILED_MESSAGE,
          error.response?.status ?? null,
          error.response?.data?.error ?? null,
          error.cause ?? null,
        );
      }
      throw new TsunamiError(REQUEST_FAILED_MESSAGE, null, null, error);
    }
  }

  public async *getEventsBatch(criteria: GetTsunamiEventQuery, boundaries: TsunamiDataQueryBoundaries) {
    yield* this.queryTsunami<TsunamiEvent>('/events', criteria, boundaries);
  }

  public async *getEvents(criteria: GetTsunamiEventQuery, boundaries: TsunamiDataQueryBoundaries) {
    const stream = this.getEventsBatch(criteria, boundaries);

    for await (const events of stream) {
      yield* events;
    }
  }

  public async *getCalls(criteria: GetTsunamiCallQuery, boundaries: TsunamiDataQueryBoundaries) {
    const stream = this.queryTsunami<TsunamiCall>('/calls', criteria, boundaries);

    for await (const calls of stream) {
      yield* calls;
    }
  }

  async getTransaction(transactionHash: string): Promise<TsunamiTransaction> {
    try {
      const response = await this.instance.get<TsunamiTransaction>(`/txs/${transactionHash}`);
      if (!response?.data) {
        throw new Error(MALFORMED_RESPONSE_MESSAGE);
      }

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HttpStatusCode.NotFound) {
          throw new TsunamiError(
            'Transaction not found',
            error.response?.status ?? null,
            error.response?.data?.error ?? null,
          );
        }
        throw new TsunamiError(
          error.response?.data?.message ?? REQUEST_FAILED_MESSAGE,
          error.response?.status ?? null,
          error.response?.data?.error ?? null,
          error.cause ?? null,
        );
      }
      throw new TsunamiError(REQUEST_FAILED_MESSAGE, null, null, error);
    }
  }

  async getTransactionWithLogs(transactionHash: string): Promise<TsunamiTransactionWithLogs> {
    try {
      const response = await this.instance.get<TsunamiTransaction>(`/txs/${transactionHash}/logs`);
      if (!response?.data) {
        throw new Error(MALFORMED_RESPONSE_MESSAGE);
      }

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HttpStatusCode.NotFound) {
          throw new TsunamiError(
            'Transaction not found',
            error.response?.status ?? null,
            error.response?.data?.error ?? null,
          );
        }
        throw new TsunamiError(
          error.response?.data?.message ?? REQUEST_FAILED_MESSAGE,
          error.response?.status ?? null,
          error.response?.data?.error ?? null,
          error.cause ?? null,
        );
      }
      throw new TsunamiError(REQUEST_FAILED_MESSAGE, null, null, error);
    }
  }

  async *getContractTransfers(
    contract: string,
    criteria: GetTsunamiTransfersQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiTransfer, void, undefined> {
    const stream = this.queryTsunami<TsunamiTransfer>(`/contract/${contract}/transfers`, criteria, boundaries);

    for await (const transfers of stream) {
      yield* transfers;
    }
  }

  async *getTransfers(
    address: string,
    criteria: GetTsunamiTransfersQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiTransfer, void, undefined> {
    const stream = this.queryTsunami<TsunamiTransfer>(`/address/${address}/transfers`, criteria, boundaries);

    for await (const transfers of stream) {
      yield* transfers;
    }
  }

  async *getWalletTransactions(
    address: string,
    criteria: GetWalletTransactionsQuery,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<TsunamiTransaction | TsunamiTransactionWithLogs, void, undefined> {
    const stream = this.queryTsunami<TsunamiTransaction>(`/address/${address}/txs`, criteria, boundaries);

    for await (const transactions of stream) {
      yield* transactions;
    }
  }

  protected async *queryTsunami<
    Item extends TsunamiEvent | TsunamiCall | TsunamiBlock | TsunamiTransfer | TsunamiTransaction = any,
  >(
    endpoint: string,
    criteria: GetTsunamiEventQuery | Record<string, any>,
    boundaries: TsunamiDataQueryBoundaries,
  ): AsyncGenerator<Item[]> {
    let offset: string | undefined;
    let hasMore;
    const hardLimit = boundaries.limit ?? Infinity;
    let fetched = 0;
    do {
      const params = {
        ...boundaries,
        ...convertForRequest(criteria),
        ...(offset ? { offset } : {}),
        limit: Math.min(boundaries.batchSize ?? 1000, boundaries.limit ?? 1000, 1000),
      };

      const response = await this.doRequest<Item>(endpoint, params);

      if (response.data.items.length > hardLimit - fetched) {
        yield response.data.items.splice(0, hardLimit - fetched);
        return;
      }

      yield response.data.items;
      fetched += response.data.items.length;

      hasMore = response.data.range.has_more;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      offset = response.data.range.next_offset!;
    } while (hasMore && fetched < hardLimit);
  }

  protected async doRequest<
    Item extends TsunamiEvent | TsunamiCall | TsunamiBlock | TsunamiTransfer | TsunamiTransaction = any,
  >(endpoint: string, params: Record<string, string | number>) {
    const response = await this.instance
      .get<{ range: TsunamiRange; items: Item[] }>(endpoint, {
        params,
      })
      .catch(error => {
        if (isAxiosError(error)) {
          throw new TsunamiError(
            error.response?.data?.message ?? REQUEST_FAILED_MESSAGE,
            error.response?.status ?? null,
            error.response?.data?.error ?? null,
            error.cause ?? null,
          );
        }
        throw new TsunamiError(REQUEST_FAILED_MESSAGE, null, null, error);
      });

    if (!response?.data?.items) {
      throw new TsunamiError(MALFORMED_RESPONSE_MESSAGE, null, null);
    }

    return response;
  }
}
