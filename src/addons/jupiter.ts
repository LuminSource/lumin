import { PublicKey } from "@solana/web3.js";
import { subHours } from "date-fns";

/**
 * Wrapper class for interatcting with the public Jupiter API
 */
export default class JupiterAPI {
  static async getCandleSticks(mint: PublicKey, timeframe: number = 6) {
    const timeTo = new Date();
    const timeFrom = subHours(timeTo, timeframe);

    const request = await fetch(
      `https://fe-api.jup.ag/api/v1/charts/${mint}?quote_address=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&type=5m&time_from=${Math.abs(timeFrom.getTime() / 1000)}&time_to=${Math.abs(timeTo.getTime() / 1000)}`,
    );

    if (!request.ok)
      throw new LuminGenericError(
        `Request to Jupiter Public API Failed - ${request.status}`,
      );

    const json = (await request.json()).bars as Array<{
      o: number;
      h: number;
      l: number;
      c: number;
      v: number;
      t: number;
    }>;

    return json;
  }
}
