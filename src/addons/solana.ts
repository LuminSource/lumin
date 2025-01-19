import { Connection, PublicKey } from "@solana/web3.js";

export default class SolanaAddons {
  static async getAllTransactions(
    address: PublicKey,
    connection: Connection,
    maxPages: number = 15,
  ) {
    let allTransactions = [];
    let fetchedTransactions;
    let lastSignature = null;
    let loops = 0;
    do {
      // Prevent from infinite looping if a very active account was provided (ex. Raydium Authority, Pump.fun Program)
      if (loops >= maxPages) break;
      fetchedTransactions = await connection.getSignaturesForAddress(address, {
        ...(lastSignature && { before: lastSignature }),
        limit: 1000,
      });
      allTransactions.push(...fetchedTransactions);
      lastSignature =
        fetchedTransactions.length > 0
          ? fetchedTransactions[fetchedTransactions.length - 1].signature
          : null;
      loops++;
    } while (fetchedTransactions.length === 1000);
    return allTransactions;
  }
}
