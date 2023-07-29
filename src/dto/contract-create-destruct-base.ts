import { OpCode } from '../enum/op-code';

export interface ContractCreateDestructBase {
  id: string;
  contract: string;
  caller: string;
  tx_hash: string;
  block_hash: string;
  data: object | null;
  origin: string;
  block_number: number;
  timestamp: number;
  value: string;
  op_code: OpCode;
}
