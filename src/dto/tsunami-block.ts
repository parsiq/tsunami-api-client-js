import { TsunamiBlockHeader } from './tsunami-block-header';

export interface TsunamiBlock {
  hash: string;

  parent_hash: string;

  header: TsunamiBlockHeader;

  number: number;
  timestamp?: number;

  ghost: boolean;
}
