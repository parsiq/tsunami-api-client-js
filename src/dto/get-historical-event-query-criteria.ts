import {BasicHistoricalDataQueryCriteria} from "./basic-historical-data-query-criteria";
import {OpCode} from "../enum/op-code";

export interface GetHistoricalEventQueryCriteria extends BasicHistoricalDataQueryCriteria {
    topic_0?: string[];
    topic_1?: string[];
    topic_2?: string[];
    topic_3?: string[];
    op_code?: OpCode;
}
