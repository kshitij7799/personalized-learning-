import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { MilestoneCheckbox } from "@/components/milestone-checkbox"

export default async function PathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch learning path
  const { data: path } = await supabase.from("learning_paths").select("*").eq("id", id).eq("user_id", user.id).single()

  if (!path) {
    redirect("/dashboard")
  }

  // Fetch progress
  const { data: progress } = await supabase.from("user_progress").select("*").eq("learning_path_id", id)

  const milestones = (path.milestones as any[]) || []
  const completedCount = progress?.filter((p) => p.completed).length || 0
  const progressPercentage = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0

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
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="container py-8 max-w-5xl">
        {/* Path Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{path.title}</h1>
              <p className="text-xl text-muted-foreground">{path.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Badge variant="secondary" className="capitalize">
              {path.difficulty_level}
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{path.estimated_duration}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold">{progressPercentage}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {completedCount} of {milestones.length} milestones completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Topics */}
        {path.topics && (path.topics as string[]).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Topics Covered</h2>
            <div className="flex flex-wrap gap-2">
              {(path.topics as string[]).map((topic, index) => (
                <Badge key={index} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Learning Milestones</h2>
          <div className="space-y-4">
            {milestones.map((milestone, index) => {
              const milestoneProgress = progress?.find((p) => p.milestone_index === index)
              const isCompleted = milestoneProgress?.completed || false

              return (
                <Card key={index} className={isCompleted ? "border-green-200 bg-green-50/50" : ""}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <MilestoneCheckbox
                        pathId={path.id}
                        milestoneIndex={index}
                        initialChecked={isCompleted}
                        progressId={milestoneProgress?.id}
                      />
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <span>Milestone {index + 1}</span>
                          {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                        </CardTitle>
                        <CardDescription className="mt-2">{milestone.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{milestone.description}</p>
                    {milestone.resources && milestone.resources.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {milestone.resources.map((resource: string, idx: number) => (
                            <li key={idx}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
