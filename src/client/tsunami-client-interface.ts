import {HistoricalBlock} from "../dto/historical-block";
import {HistoricalTransaction} from "../dto/historical-transaction";
import {HistoricalEvent} from "../dto/historical-event";
import {HistoricalCall} from "../dto/historical-call";
import {GetHistoricalEventQueryCriteria} from "../dto/get-historical-event-query-criteria";
import {GetHistoricalCallQueryCriteria} from "../dto/get-historical-call-query-criteria";
import {HistoricalDataQueryBoundaries} from "../dto/historical-data-query-boundaries";

export interface ITsunamiClient {
    getBlocks(start: number, end: number): AsyncGenerator<HistoricalBlock, void, undefined>;
    getLatestBlock(): Promise<HistoricalBlock>;
    getTransactionOptionally(hash: string): Promise<HistoricalTransaction | null>;
    getTransactionWithLogs(hash: string): Promise<HistoricalTransaction>;
    getEventsBatch(
        criteria: GetHistoricalEventQueryCriteria,
        boundaries: HistoricalDataQueryBoundaries,
    ): AsyncGenerator<HistoricalEvent[], void, undefined>;
    getEvents(
        criteria: GetHistoricalEventQueryCriteria,
        boundaries: HistoricalDataQueryBoundaries,
    ): AsyncGenerator<HistoricalEvent, void, undefined>;
    getCalls(
        criteria: GetHistoricalCallQueryCriteria,
        boundaries: HistoricalDataQueryBoundaries,
    ): AsyncGenerator<HistoricalCall, void, undefined>;
    queryTsunami<T extends HistoricalEvent | HistoricalCall | HistoricalBlock = any>(
        endpoint: string,
        criteria: GetHistoricalEventQueryCriteria | Record<string, any>,
        boundaries: HistoricalDataQueryBoundaries,
    ): AsyncGenerator<T[]>;
}
