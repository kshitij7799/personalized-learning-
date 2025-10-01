import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { pathId, milestoneIndex, completed, progressId } = await req.json()

    if (progressId) {
      // Update existing progress
      const { error } = await supabase
        .from("user_progress")
        .update({
          completed,
          completed_at: completed ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", progressId)

      if (error) {
        console.error("Error updating progress:", error)
        return Response.json({ error: "Failed to update progress" }, { status: 500 })
      }
    } else {
      // Create new progress entry
      const { error } = await supabase.from("user_progress").insert({
        user_id: user.id,
        learning_path_id: pathId,
        milestone_index: milestoneIndex,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      })

      if (error) {
        console.error("Error creating progress:", error)
        return Response.json({ error: "Failed to create progress" }, { status: 500 })
      }
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error in progress update:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
