"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, ExternalLink, Heart, Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface Resource {
  id: string
  title: string
  description: string
  resource_type: string
  url: string
  tags: string[]
  difficulty_level: string
  is_favorite: boolean
}

interface LibraryContentProps {
  initialResources: Resource[]
}

export function LibraryContent({ initialResources }: LibraryContentProps) {
  const router = useRouter()
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    resource_type: "article",
    url: "",
    tags: "",
    difficulty_level: "beginner",
  })

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/library/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newResource,
          tags: newResource.tags.split(",").map((tag) => tag.trim()),
        }),
      })

      if (!response.ok) throw new Error("Failed to add resource")

      setIsDialogOpen(false)
      setNewResource({
        title: "",
        description: "",
        resource_type: "article",
        url: "",
        tags: "",
        difficulty_level: "beginner",
      })
      router.refresh()
    } catch (error) {
      console.error("Error adding resource:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleFavorite = async (resourceId: string, currentFavorite: boolean) => {
    try {
      const response = await fetch("/api/library/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId,
          isFavorite: !currentFavorite,
        }),
      })

      if (!response.ok) throw new Error("Failed to update favorite")

      setResources(resources.map((r) => (r.id === resourceId ? { ...r, is_favorite: !currentFavorite } : r)))
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  // Filter resources
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || resource.resource_type === filterType
    const matchesDifficulty = filterDifficulty === "all" || resource.difficulty_level === filterDifficulty

    return matchesSearch && matchesType && matchesDifficulty
  })

  const resourceTypeIcons: Record<string, React.ReactNode> = {
    article: <BookOpen className="h-5 w-5" />,
    video: <BookOpen className="h-5 w-5" />,
    course: <BookOpen className="h-5 w-5" />,
    book: <BookOpen className="h-5 w-5" />,
    tutorial: <BookOpen className="h-5 w-5" />,
    documentation: <BookOpen className="h-5 w-5" />,
  }

  return (
    <>
      {/* Filters and Search */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="book">Book</SelectItem>
              <SelectItem value="tutorial">Tutorial</SelectItem>
              <SelectItem value="documentation">Documentation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-5 w-5" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>Add a learning resource to your library</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddResource} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="resource_type">Type</Label>
                  <Select
                    value={newResource.resource_type}
                    onValueChange={(value) => setNewResource({ ...newResource, resource_type: value })}
                  >
                    <SelectTrigger id="resource_type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="course">Course</SelectItem>
                      <SelectItem value="book">Book</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty_level">Difficulty</Label>
                  <Select
                    value={newResource.difficulty_level}
                    onValueChange={(value) => setNewResource({ ...newResource, difficulty_level: value })}
                  >
                    <SelectTrigger id="difficulty_level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newResource.tags}
                  onChange={(e) => setNewResource({ ...newResource, tags: e.target.value })}
                  placeholder="javascript, react, tutorial"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Resource"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {resourceTypeIcons[resource.resource_type]}
                    <Badge variant="secondary" className="capitalize">
                      {resource.resource_type}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFavorite(resource.id, resource.is_favorite)}
                    className="h-8 w-8 p-0"
                  >
                    {resource.is_favorite ? (
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    ) : (
                      <Heart className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="capitalize">
                    {resource.difficulty_level}
                  </Badge>
                  {resource.tags && resource.tags.length > 0 && (
                    <>
                      {resource.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 2 && <Badge variant="secondary">+{resource.tags.length - 2}</Badge>}
                    </>
                  )}
                </div>
                {resource.url && (
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                      <ExternalLink className="h-4 w-4" />
                      Open Resource
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              {searchQuery || filterType !== "all" || filterDifficulty !== "all"
                ? "Try adjusting your filters or search query"
                : "Start building your library by adding learning resources"}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
