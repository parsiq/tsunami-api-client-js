import {OpCode} from "../enum/op-code";
import {HistoricalLog} from "./historical-log";

export interface HistoricalEventBase extends HistoricalLog {
    topic_0?: string;
    topic_1?: string;
    topic_2?: string;
    topic_3?: string;
    log_data?: string;
}

export interface HistoricalEvent extends HistoricalEventBase {
    op_code: OpCode;
}
