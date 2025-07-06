import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "coachwise",
  name: "Coachwise",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
