import {BasicHistoricalDataQueryCriteria} from "./basic-historical-data-query-criteria";

export interface GetHistoricalCallQueryCriteria extends BasicHistoricalDataQueryCriteria {
    sender?: string;
    sig_hash?: string[];
}
