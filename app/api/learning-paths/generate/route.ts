import { createClient } from "@/lib/supabase/server"
import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const learningPathSchema = z.object({
  title: z.string().describe("A clear, concise title for the learning path"),
  description: z.string().describe("A brief description of what the learner will achieve"),
  difficulty_level: z.enum(["beginner", "intermediate", "advanced"]),
  estimated_duration: z.string().describe("Estimated time to complete (e.g., '3 months', '6 weeks')"),
  topics: z.array(z.string()).describe("Key topics covered in this learning path"),
  milestones: z
    .array(
      z.object({
        title: z.string().describe("Milestone title"),
        description: z.string().describe("What the learner will accomplish"),
        resources: z.array(z.string()).describe("Recommended learning resources"),
      }),
    )
    .describe("5-8 structured milestones for the learning journey"),
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { goal, currentLevel, timeCommitment, specificTopics } = await req.json()

    // Generate learning path using AI
    const { object: generatedPath } = await generateObject({
      model: "openai/gpt-5",
      schema: learningPathSchema,
      prompt: `Create a personalized learning path for someone who wants to: ${goal}

Current skill level: ${currentLevel}
Time commitment: ${timeCommitment}
${specificTopics ? `Specific topics of interest: ${specificTopics}` : ""}

Generate a comprehensive learning path with:
- A clear title and description
- Appropriate difficulty level
- Realistic time estimate
- 5-8 progressive milestones
- Specific, actionable resources for each milestone

Make it practical, achievable, and tailored to their goals.`,
    })

    // Save to database
    const { data: savedPath, error } = await supabase
      .from("learning_paths")
      .insert({
        user_id: user.id,
        title: generatedPath.title,
        description: generatedPath.description,
        difficulty_level: generatedPath.difficulty_level,
        estimated_duration: generatedPath.estimated_duration,
        topics: generatedPath.topics,
        milestones: generatedPath.milestones,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return Response.json({ error: "Failed to save learning path" }, { status: 500 })
    }

    return Response.json({ pathId: savedPath.id })
  } catch (error) {
    console.error("Error generating learning path:", error)
    return Response.json({ error: "Failed to generate learning path" }, { status: 500 })
  }
}
