import { PublicKey } from "@solana/web3.js";

export const KNOWN_CEX_WALLETS: Array<{
  name: string;
  short: string;
  public: PublicKey;
}> = [
  {
    name: "Binance 1",
    short: "Binance",
    public: new PublicKey("2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S"),
  },
  {
    name: "Binance 2",
    short: "Binance",
    public: new PublicKey("5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9"),
  },
  {
    name: "Binance 3",
    short: "Binance",
    public: new PublicKey("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"),
  },
  {
    name: "MEXC 1",
    short: "MEXC",
    public: new PublicKey("ASTyfSima4LLAdDgoFGkgqoKowG1LZFDr9fAQrg7iaJZ"),
  },
  {
    name: "MEXC 2",
    short: "MEXC",
    public: new PublicKey("5PAhQiYdLBd6SVdjzBQDxUAEFyDdF5ExNPQfcscnPRj5"),
  },
  {
    name: "Coinbase 1",
    short: "Coinbase",
    public: new PublicKey("H8sMJSCQxfKiFTCfDR3DUMLPwcRbM61LGFJ8N4dK3WjS"),
  },
  {
    name: "Coinbase 2",
    short: "Coinbase",
    public: new PublicKey("GJRs4FwHtemZ5ZE9x3FNvJ8TMwitKTh21yxdRPqn7npE"),
  },
  {
    name: "Coinbase 3",
    short: "Coinbase",
    public: new PublicKey("2AQdpHJ2JpcEgPiATUXjQxA8QmafFegfQwSLWSprPicm"),
  },
  {
    name: "Crypto.com 1",
    short: "Crypto.com",
    public: new PublicKey("6FEVkH17P9y8Q9aCkDdPcMDjvj7SVxrTETaYEm8f51Jy"),
  },
  {
    name: "Crypto.com 2",
    short: "Crypto.com",
    public: new PublicKey("AobVSwdW9BbpMdJvTqeCN4hPAmh4rHm7vwLnQ5ATSyrS"),
  },
  {
    name: "ChangeNOW",
    short: "ChangeNOW",
    public: new PublicKey("G2YxRa6wt1qePMwfJzdXZG62ej4qaTC7YURzuh2Lwd3t"),
  },
  {
    name: "OKX 1",
    short: "OKX",
    public: new PublicKey("5VCwKtCXgCJ6kit5FybXjvriW3xELsFDhYrPSqtJNmcD"),
  },
  {
    name: "OKX 2",
    short: "OKX",
    public: new PublicKey("9un5wqE3q4oCjyrDkwsdD48KteCJitQX5978Vh7KKxHo"),
  },
  {
    name: "Bybit",
    short: "Bybit",
    public: new PublicKey("AC5RDfQFmDS1deWZos921JfqscXdByf8BKHs5ACWjtW2"),
  },
  {
    name: "Kucoin",
    short: "Kucoin",
    public: new PublicKey("BmFdpraQhkiDQE6SnfG5omcA1VwzqfXrwtNYBwWTymy6"),
  },
  {
    name: "Gate.io",
    short: "Gate.io",
    public: new PublicKey("u6PJ8DtQuPFnfmwHbGFULQ4u4EgjDiyYKjVEsynXq2w"),
  },
  {
    name: "Bitget Exchange",
    short: "Bitget",
    public: new PublicKey("A77HErqtfN1hLLpvZ9pCtu66FEtM8BveoaKbbMoZ4RiR"),
  },
  {
    name: "Kraken",
    short: "Kraken",
    public: new PublicKey("FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5"),
  },
  {
    name: "Wintermute 1",
    short: "Wintermute",
    public: new PublicKey("7sMiW38oLg5q9SKNoyPaH2Ee1VhpGdMCDrC4Lo4uLBBE"),
  },
  {
    name: "Wintermute 2",
    short: "Wintermute",
    public: new PublicKey("4FDKx3S3k9eD7HeAhjQxHeYNLXHtreCD1GTUWktiYUvR"),
  },
  {
    name: "Wintermute 3",
    short: "Wintermute",
    public: new PublicKey("5sTQ5ih7xtctBhMXHr3f1aWdaXazWrWfoehqWdqWnTFP"),
  },
];

export const AI_CHART_PROMPT = `
                    You are an AI assistant tasked to analyze chart candle sticks.

                    You will be provided JSON Chart Data

                    The chart will be within 6 hours time frame, each candle stick represent 5 minutes

                    # Your task include
                    - Analyze the risk based on chart, float value beetwen 0 - low risk, to 1 - high risk.
                    - Price & Chart volatility, float value beetwen 0 being lowest and 1 highest.
                    - Short description up to 256 characters about the chart and potential risks, if such exist
                `;
