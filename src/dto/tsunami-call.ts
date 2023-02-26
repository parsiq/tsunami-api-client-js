import { TsunamiEventBelongingToCall } from './tsunami-event-belonging-to-call';
import { TsunamiLog } from './tsunami-log';

export interface TsunamiCallBase extends TsunamiLog {
  output_data?: string;
  value?: string;
  sender: string;
}

export interface TsunamiCall extends TsunamiCallBase {
  sig_hash: string;
  input_data: string;
  events?: readonly TsunamiEventBelongingToCall[];
}
