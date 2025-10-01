import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import Link from "next/link"
import { LibraryContent } from "@/components/library-content"

export default async function LibraryPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's library resources
  const { data: resources } = await supabase
    .from("library_resources")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LearnPath AI
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/library">
              <Button variant="ghost">Library</Button>
            </Link>
            <Link href="/chat">
              <Button variant="ghost">AI Assistant</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Resource Library</h1>
            <p className="text-xl text-muted-foreground">Organize and access all your learning materials</p>
          </div>
        </div>

        <LibraryContent initialResources={resources || []} />
      </main>
    </div>
  )
}
