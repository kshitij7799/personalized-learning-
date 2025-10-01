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

    const { title, description, resource_type, url, tags, difficulty_level } = await req.json()

    const { data, error } = await supabase
      .from("library_resources")
      .insert({
        user_id: user.id,
        title,
        description,
        resource_type,
        url,
        tags,
        difficulty_level,
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding resource:", error)
      return Response.json({ error: "Failed to add resource" }, { status: 500 })
    }

    return Response.json({ resource: data })
  } catch (error) {
    console.error("Error in add resource route:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
