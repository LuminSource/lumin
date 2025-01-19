import { ConfirmedSignatureInfo, Connection, PublicKey } from "@solana/web3.js";
import OpenAI from "openai";
import { AI_CHART_PROMPT, KNOWN_CEX_WALLETS } from "./config";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import SolanaAddons from "./addons/solana";
import JupiterAPI from "./addons/jupiter";
import { zodResponseFormat } from "openai/helpers/zod";
import ChartAnalysis from "./schemas/ChartAnalysis";

type LuminConstructor = {
  rpcUrl: string;
  openAIKey: string;
};

/**
 * Initializes a new class of Lumin Library
 * @throws {LuminGenericError}
 */
export default class Lumin {
  private settings: LuminConstructor;
  private connection: Connection;
  private openai: OpenAI;

  constructor(settings: LuminConstructor) {
    if (!settings.openAIKey || !settings.rpcUrl)
      throw new LuminGenericError(
        "RPC URL or OpenAI Key have not been provided!",
      );

    this.settings = settings;
    this.connection = new Connection(settings.rpcUrl, "confirmed");
    this.openai = new OpenAI({ apiKey: settings.openAIKey });
  }

  /**
   * Checks coin for listings on Centralized Exchanges
   * @param mint The coin to check
   */
  async getPublicListings(mint: PublicKey) {
    const cexWallets: Array<{
      name: string;
      short: string;
      public: PublicKey;
    }> = [];

    for (const account of KNOWN_CEX_WALLETS) {
      const tokenAccount = getAssociatedTokenAddressSync(mint, account.public);

      try {
        const accountInfo = await this.connection.getAccountInfo(tokenAccount);

        if (!accountInfo) continue;
      } catch {
        continue;
      }

      const transactionHistory = await this.connection.getSignaturesForAddress(
        account.public,
        { limit: 25 },
      );

      if (transactionHistory && transactionHistory.length) {
        let txs: ConfirmedSignatureInfo[] = [];

        for (let i = 0; i < 5; i++) {
          const randomTx =
            transactionHistory[
              Math.floor(Math.random() * transactionHistory.length)
            ];

          if (!randomTx) continue;

          if (txs.find((x) => x?.signature === randomTx?.signature)) continue;

          txs.push(randomTx);
        }

        for await (const tx of txs) {
          const parsedTransaction = await this.connection.getParsedTransaction(
            tx.signature,
            { maxSupportedTransactionVersion: 0 },
          );

          if (!parsedTransaction) continue;

          const signers =
            parsedTransaction.transaction.message.accountKeys.filter(
              (x) => x.signer,
            );

          if (
            signers.some((y) =>
              KNOWN_CEX_WALLETS.some(
                (x) => x.public.toBase58() === y.pubkey.toBase58(),
              ),
            )
          ) {
            cexWallets.push(account);
            break;
          } else {
            continue;
          }
        }
      }
    }

    return cexWallets;
  }

  /**
   * Gets age at which wallet was created
   * @param account The account to check
   * @throws {LuminNoTransactions}
   */
  async getWalletAge(account: PublicKey) {
    const allTransactions = await SolanaAddons.getAllTransactions(
      account,
      this.connection,
      15,
    );

    if (!allTransactions) throw new LuminNoTransactions();

    let firstTx = allTransactions?.reverse()[0]?.slot;

    if (!firstTx) throw new LuminNoTransactions();

    const timestampOfFirstTransactions =
      await this.connection.getBlockTime(firstTx);

    return timestampOfFirstTransactions;
  }

  /**
   * Analyze chart of a coin for volatility and potential risk using AI
   * @param mint The coin to check
   */
  async analyzeChart(mint: PublicKey) {
    const candleSticks = await JupiterAPI.getCandleSticks(mint);

    if (!candleSticks)
      throw new LuminGenericError("No candle sticks were provided");

    const complete = await this.openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      response_format: zodResponseFormat(ChartAnalysis, "analysis"),
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: AI_CHART_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify(candleSticks),
        },
      ],
    });

    if (!complete || !complete.choices)
      throw new LuminAIError(`AI Could not complete - ${complete}`);

    const parsed = complete.choices[0].message.parsed;

    if (!parsed)
      throw new LuminAIError("ChatGPT did not provide parsed response");

    return parsed;
  }

  /**
   * Checks if dexscreener Enchanced Token Info have been updated & paid
   * @param mint The coin to check
   */
  async isDexPaid(mint: PublicKey) {
    const request = await fetch(
      `https://api.dexscreener.com/orders/v1/solana/${mint}`,
    );

    if (!request.ok)
      throw new LuminGenericError(
        `Could not fetch dexscreener api - ${request.statusText}`,
      );

    const json = await request.json();

    let isPaid = false;

    if (json) {
      for (const update of json) {
        if (update.type === "tokenProfile") {
          if (update.status === "approved") {
            isPaid = true;
            break;
          } else continue;
        }
      }
    }

    return isPaid;
  }
}
