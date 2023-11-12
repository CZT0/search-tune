import { storage } from "@/lib/storage"
import OpenAI from "openai"

const aiDescription = `
  As an advanced AI, your task is to distill complex user queries into 1-3 highly efficient Google search keywords, without using quotes. Analyze the query to grasp its central theme and boil it down to the most relevant and precise keywords or phrases. Consider what search terms are most likely to be associated with the user's question.
  Focus exclusively on producing a small set of search terms, ideally between one to three, that directly relate to the user's query. These keywords should be presented as standalone terms, not enclosed in quotes. Avoid broad interpretations or detailed responses. Your goal is to capture the essence of the inquiry and translate it into the clearest, most relevant, and concise search terms possible, considering potential keywords that users might use to find information on similar topics.
`

export async function request_openai(content: string) {
  try {
    const language = await storage.get("language")
    const search = `
        User Query: ${content}  Use ${language} as Response:`
    const openai = new OpenAI({
      apiKey: await storage.get("apiKey"),
      baseURL: await storage.get("baseUrl"),
      dangerouslyAllowBrowser: true
    })
    const stream = await openai.chat.completions.create({
      messages: [
        { role: "system", content: aiDescription },
        { role: "user", content: search }
      ],
      model: await storage.get("model"),
      stream: true
    })
    return stream
  } catch (error) {
    console.error("Error in request_openai:", error)
  }
}
