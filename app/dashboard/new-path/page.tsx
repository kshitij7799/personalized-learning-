"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function NewPathPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    goal: "",
    currentLevel: "beginner",
    timeCommitment: "",
    specificTopics: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/learning-paths/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate learning path")
      }

      const { pathId } = await response.json()
      router.push(`/dashboard/paths/${pathId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

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

      <main className="container py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Your Learning Path</h1>
          <p className="text-xl text-muted-foreground">
            Tell us about your goals and let AI create a personalized learning journey
          </p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Path Details
            </CardTitle>
            <CardDescription>Provide information about what you want to learn</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal">What do you want to learn?</Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., I want to become a full-stack web developer and build modern web applications"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentLevel">Current Skill Level</Label>
                <Select
                  value={formData.currentLevel}
                  onValueChange={(value) => setFormData({ ...formData, currentLevel: value })}
                >
                  <SelectTrigger id="currentLevel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
                    <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                    <SelectItem value="advanced">Advanced - Looking to master</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeCommitment">Time Commitment</Label>
                <Input
                  id="timeCommitment"
                  placeholder="e.g., 10 hours per week"
                  value={formData.timeCommitment}
                  onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specificTopics">Specific Topics (Optional)</Label>
                <Textarea
                  id="specificTopics"
                  placeholder="e.g., React, Node.js, databases, deployment"
                  value={formData.specificTopics}
                  onChange={(e) => setFormData({ ...formData, specificTopics: e.target.value })}
                  rows={3}
                  className="resize-none"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" size="lg" className="w-full gap-2" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Your Path...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Learning Path
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
