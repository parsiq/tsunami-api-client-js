import { OpCode } from '../enum/op-code';
import { TsunamiLog } from './tsunami-log';

export interface TsunamiEventBase extends TsunamiLog {
  topic_0?: string;
  topic_1?: string;
  topic_2?: string;
  topic_3?: string;
  log_data?: string;
}

export interface TsunamiEvent extends TsunamiEventBase {
  op_code: OpCode;
}
