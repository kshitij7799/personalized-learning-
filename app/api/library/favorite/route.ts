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

    const { resourceId, isFavorite } = await req.json()

    const { error } = await supabase
      .from("library_resources")
      .update({ is_favorite: isFavorite })
      .eq("id", resourceId)
      .eq("user_id", user.id)

    if (error) {
      console.error("Error updating favorite:", error)
      return Response.json({ error: "Failed to update favorite" }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error in favorite route:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
