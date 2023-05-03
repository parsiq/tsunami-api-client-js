# PARSIQ Tsunami API JS client

Easy access PARSIQ Tsunami API using this JS client.

## Getting Started

Install via npm:

```
$ npm i @parsiq/tsunami-client
```

Setup credentials and select chain to query:

```typescript
import { ChainId, TsunamiApiClient } from '@parsiq/tsunami-client';

const tsunami = new TsunamiApiClient(process.env.TSUNAMI_API_KEY, ChainId.ETH_MAINNET);
```

Don't forget to pass `TSUNAMI_API_KEY` environment variable to your script.

## Usage 

Run requests to Tsunami API:

```typescript
console.log((await tsunami.getLatestBlock()).number);
```

Fetch events:

```typescript
for await (const event of tsunami.getEvents(
  { contract: ['0x1e2fbe6be9eb39fc894d38be976111f332172d83'] },
  { block_number_start: 0, block_number_end: 'latest' },
)) {
  console.log(event);
}
```

Switch to other chain:

```typescript
tsunami.setChain(ChainId.AVALANCHE_MAINNET);
console.log((await tsunami.getLatestBlock()).number);
```

## More documentation

Documentation and examples are available at https://docs.parsiq.net/ 