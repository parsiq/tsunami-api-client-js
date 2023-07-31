interface GetContractCreateDestructByOrigin {
  origin: string;
}

interface GetContractCreateDestructByCaller {
  caller: string;
}

interface GetContractCreateDestructByContract {
  contract: string[];
}

export type GetContractCreateDestructQueryBase =
  | GetContractCreateDestructByCaller
  | GetContractCreateDestructByOrigin
  | GetContractCreateDestructByContract;
