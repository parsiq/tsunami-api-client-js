import { BasicTsunamiDataQuery } from './basic-tsunami-data-query';
import { OpCode } from '../enum/op-code';

export interface GetTsunamiEventQuery extends BasicTsunamiDataQuery {
  topic_0?: string[];
  topic_1?: string[];
  topic_2?: string[];
  topic_3?: string[];
  op_code?: OpCode;
}
