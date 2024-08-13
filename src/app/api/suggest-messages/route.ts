import { OpenAI } from 'openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const apiKey = process.env.OPEN_AI_KEY;
//   try {
//     const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal and sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's your hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const result = await streamText({
//       model:openai('gpt-4-turbo', { apiKey }),
//       prompt,
//       maxTokens:400,
      
      
//     });

//     return result.toAIStreamResponse();
//   } catch (error) {
//     console.error("open api error", error);
//     throw error;
//   }

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // Pass the API key here
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal and sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's your hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
    });

    return new Response(result.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API error", error);
    throw error;
  }

}
