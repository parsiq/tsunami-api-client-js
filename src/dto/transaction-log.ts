import { OpCode } from '../enum/op-code';

export interface TransactionLog {
  id: string;
  contract: string;
  topic_0?: string;
  topic_1?: string;
  topic_2?: string;
  topic_3?: string;
  log_data?: string;
  sig_hash?: string;
  input_data?: string;
  output_data?: string;
  value?: string;
  sender?: string;
  caller?: string;
  origin?: string;
  op_code: OpCode;
}
