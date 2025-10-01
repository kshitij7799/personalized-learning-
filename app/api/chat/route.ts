import { createClient } from "@/lib/supabase/server"
import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { messages }: { messages: UIMessage[] } = await req.json()

    // Fetch user's learning paths for context
    const { data: learningPaths } = await supabase
      .from("learning_paths")
      .select("title, description, topics")
      .eq("user_id", user.id)
      .limit(5)

    // Build context about user's learning
    let userContext = ""
    if (learningPaths && learningPaths.length > 0) {
      userContext = `\n\nUser's current learning paths:\n${learningPaths
        .map((path) => `- ${path.title}: ${path.description}`)
        .join("\n")}`
    }

    const systemPrompt = `You are a helpful AI learning assistant for LearnPath AI, a personalized learning platform. Your role is to:

1. Help users understand concepts and topics they're learning
2. Provide clear, concise explanations suitable for their level
3. Suggest learning strategies and resources
4. Motivate and encourage learners
5. Answer questions about their learning paths

Be friendly, supportive, and educational. Keep responses concise but informative.${userContext}`

    const prompt = convertToModelMessages([
      {
        id: "system",
        role: "system",
        parts: [{ type: "text", text: systemPrompt }],
      },
      ...messages,
    ])

    const result = streamText({
      model: "openai/gpt-5",
      messages: prompt,
      abortSignal: req.signal,
      temperature: 0.7,
      maxOutputTokens: 1000,
    })

    return result.toUIMessageStreamResponse({
      onFinish: async ({ isAborted }) => {
        if (isAborted) {
          console.log("[v0] Chat aborted")
        }
      },
      consumeSseStream: consumeStream,
    })
  } catch (error) {
    console.error("[v0] Error in chat route:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
