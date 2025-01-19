Lumin Library

Lumin is an open-source library designed to enhance other projects, particularly those involving AI bots, blockchain interaction, and data analysis. It provides various utility functions and integrations to help developers build advanced features like blockchain transactions, AI-based data analysis, and more.

Features

- Blockchain Integration: Includes various functions for interacting with Solana blockchain, like checking wallet age, verifying coin listings, and analyzing token data.
- AI-powered Features: Leverage OpenAI's GPT models to analyze charts, interpret data, and provide insights.
- Centralized Exchange Integration: Checks token listings across multiple centralized exchanges (CEX).
- Advanced Error Handling: Includes custom error classes for better exception handling and debugging.

Table of Contents

- Installation
- Usage
- API Documentation
  - Lumin Class
  - Functions
- Error Handling
- Contributing
- License

Usage

### Initialization

To use Lumin, you need to initialize it with an RPC URL (for Solana) and an OpenAI API key.

```ts
import Lumin from "lumin";

const lumin = new Lumin({
  rpcUrl: "https://api.mainnet-beta.solana.com", // Solana RPC URL
  openAIKey: "your-openai-api-key", // OpenAI API Key
});
```

### Example Functions

#### 1. Get Public Listings for a Coin

This function checks for the presence of a coin on known centralized exchanges (CEX) using its mint address.

```ts
import { PublicKey } from "@solana/web3.js";

const mint = new PublicKey("your-coin-mint-address");
const cexWallets = await lumin.getPublicListings(mint);

console.log(cexWallets);
```

#### 2. Get Wallet Age

This function checks the creation date of a Solana wallet by looking at the first transaction made by the wallet.

```ts
const walletAddress = new PublicKey("wallet-address-to-check");
const walletAge = await lumin.getWalletAge(walletAddress);

console.log(`Wallet created at: ${new Date(walletAge * 1000)}`);
```

#### 3. Analyze Coin Chart with AI

Use AI to analyze a coin's chart for volatility and potential risks.

```ts
const mint = new PublicKey("your-coin-mint-address");
const analysis = await lumin.analyzeChart(mint);

console.log(analysis.risk, analysis.volatility, analysis.description);
```

#### 4. Check if Dexscreener Listing is Paid

Checks if the listing for a token on Dexscreener is paid and updated.

```ts
const mint = new PublicKey("your-coin-mint-address");
const isPaid = await lumin.isDexPaid(mint);

console.log(`Is Dexscreener listing paid? ${isPaid}`);
```

# API Documentation

### Lumin Class

#### Constructor

`new Lumin(settings: LuminConstructor)`

Parameters:

- `rpcUrl`: The RPC URL for Solana (e.g. 'https://api.mainnet-beta.solana.com')
- `openAIKey`: The OpenAI API Key to access GPT models.

Throws:

- `LuminGenericError`: If the rpcUrl or openAIKey is missing.

### Functions

#### getPublicListings(mint: PublicKey)

Checks if a token is listed on any known centralized exchanges (CEX).

Parameters:

mint: The mint address of the coin.

Returns:

An array of CEX wallet information (if the coin is listed).

#### getWalletAge(account: PublicKey)

Returns the creation timestamp of a wallet.

Parameters:

account: The public key of the wallet.

Throws:

- `LuminNoTransactions`: If the wallet has no transactions.

#### analyzeChart(mint: PublicKey)

Uses OpenAI's GPT model to analyze a token's price chart for volatility and risks.

Parameters:

mint: The mint address of the token.

Returns:

AI-generated analysis of the token chart.

Throws:

- `LuminGenericError`: If no candle sticks are provided.
- `LuminAIError`: If AI could not generate a response.

#### isDexPaid(mint: PublicKey)

Checks if a coin's listing on Dexscreener is paid and approved.

Parameters:

mint: The mint address of the coin.

Returns:

true if the listing is paid and approved, false otherwise.

### Error Handling

Lumin includes custom error classes to help with debugging and handling common issues:

- `LuminGenericError`: For general errors (e.g. missing configuration).
- `LuminAIError`: For errors related to AI-generated responses.
- `LuminNoTransactions`: When there are no transactions available for a wallet.

Contributing

If you'd like to contribute to Lumin, feel free to fork the repository and create a pull request with your improvements, bug fixes, or new features. We welcome contributions from developers of all skill levels!

License

Lumin is licensed under the ISC License. See LICENSE for more details.
