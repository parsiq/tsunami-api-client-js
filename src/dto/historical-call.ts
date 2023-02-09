import {HistoricalEventBelongingToCall} from "./historical-event-belonging-to-call";
import {HistoricalLog} from "./historical-log";

export interface HistoricalCallBase extends HistoricalLog {
    output_data?: string;
    value?: string;
    sender: string;
}

export interface HistoricalCall extends HistoricalCallBase {
    sig_hash: string;
    input_data: string;
    events?: readonly HistoricalEventBelongingToCall[];
}
