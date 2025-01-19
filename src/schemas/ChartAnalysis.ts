import { z } from "zod";

const ChartAnalysis = z.object({
  risk: z.number(),
  volatility: z.number(),
  description: z.string(),
});

export default ChartAnalysis;
