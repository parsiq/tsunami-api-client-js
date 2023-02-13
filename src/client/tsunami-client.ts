import {ITsunamiClient} from "./tsunami-client-interface";
import {HistoricalBlock} from "../dto/historical-block";
import {HttpClient} from "./http-client";
import {HistoricalTransaction} from "../dto/historical-transaction";
import {GetHistoricalEventQueryCriteria} from "../dto/get-historical-event-query-criteria";
import {HistoricalDataQueryBoundaries} from "../dto/historical-data-query-boundaries";
import {HistoricalEvent} from "../dto/historical-event";
import {HistoricalCall} from "../dto/historical-call";
import {TransactionLog} from "../dto/transaction-log";
import {GetHistoricalCallQueryCriteria} from "../dto/get-historical-call-query-criteria";
import {HttpStatusCode} from "axios";
import {HistoricalRange} from "../dto/historical-range";
import {convertForRequest} from "./convertor";

const MALFORMED_RESPONSE_MESSAGE = 'Malformed Tsunami response';
const REQUEST_FAILED_MESSAGE = 'Tsunami request failed';

export class TsunamiApiClient extends HttpClient implements ITsunamiClient {
    constructor(baseUrl: string, apiKey: string) {
        super(baseUrl, apiKey);
    }

    public async getBlockByHash(blockHash: string): Promise<HistoricalBlock> {
        try {
            const response = await this.instance.get<HistoricalBlock>(`/blocks/${blockHash}`);
            if (!response?.data) {
                throw new Error('Malformed Tsunami response');
            }

            return response.data;
        } catch (err) {
            if (err.isAxiosError && err.response?.status === HttpStatusCode.NotFound) {
                throw new Error('Block not found');
            }
            throw new Error('Tsunami request failed');
        }
    }

    public async *getBlocks(start: number, end: number) {
        const iterator = this.queryTsunami<HistoricalBlock>(
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

    public async getLatestBlock(): Promise<HistoricalBlock> {
        try {
            const response = await this.instance.get<HistoricalBlock>('/blocks/latest');
            if (!response?.data) {
                throw new Error(MALFORMED_RESPONSE_MESSAGE);
            }
            return response.data;
        } catch (err) {
            throw new Error(REQUEST_FAILED_MESSAGE);
        }
    }

    public async getTransactionOptionally(hash: string): Promise<HistoricalTransaction | null> {
        try {
            const response = await this.instance.get<HistoricalTransaction>(`/txs/${hash}`, {
                validateStatus: status => (status >= 200 && status < 300) || status === HttpStatusCode.NotFound,
            });
            if (!response?.data) {
                throw new Error(MALFORMED_RESPONSE_MESSAGE);
            }

            return response.status === HttpStatusCode.NotFound ? null : response.data;
        } catch (err) {
            throw new Error(REQUEST_FAILED_MESSAGE);
        }
    }

    public async *getEventsBatch(criteria: GetHistoricalEventQueryCriteria, boundaries: HistoricalDataQueryBoundaries) {
        yield* this.queryTsunami<HistoricalEvent>(
            '/events',
            criteria,
            boundaries,
        );
    }

    public async *getEvents(criteria: GetHistoricalEventQueryCriteria, boundaries: HistoricalDataQueryBoundaries) {
        const stream = this.getEventsBatch(criteria, boundaries);

        for await (const events of stream) {
            yield* events;
        }
    }

    public async *getCalls(criteria: GetHistoricalCallQueryCriteria, boundaries: HistoricalDataQueryBoundaries) {
        const stream = this.queryTsunami<HistoricalCall>(
            '/calls',
            criteria,
            boundaries,
        );

        for await (const calls of stream) {
            yield* calls;
        }
    }

    public async getTransactionWithLogs(txHash: string) {
        const response = await this.instance
            .get<HistoricalTransaction & { logs: TransactionLog[] }>(`txs/${txHash}/logs`)
            .catch(err => {
                throw new Error(REQUEST_FAILED_MESSAGE);
            });

        if (!response?.data) {
            throw new Error(MALFORMED_RESPONSE_MESSAGE);
        }

        return response.data;
    }

    public async *queryTsunami<T extends HistoricalEvent | HistoricalCall | HistoricalBlock = any>(
        endpoint: string,
        criteria: GetHistoricalEventQueryCriteria | Record<string, any>,
        boundaries: HistoricalDataQueryBoundaries,
    ): AsyncGenerator<T[]> {
        let offset: string | undefined;
        let hasMore;
        do {
            const params = {
                ...boundaries,
                ...convertForRequest(criteria),
                ...(offset ? { offset } : {}),
                limit: Math.min(boundaries?.limit ?? 1000, 1000),
            };

            const response = await this.instance
                .get<{ range: HistoricalRange; items: T[] }>(endpoint, {
                    params,
                })
                .catch(err => {
                    throw new Error(REQUEST_FAILED_MESSAGE);
                });

            if (!response?.data?.items) {
                throw new Error(MALFORMED_RESPONSE_MESSAGE);
            }

            yield response.data.items;

            hasMore = response.data.range.has_more;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            offset = response.data.range.next_offset!;
        } while (hasMore);
    }
}
