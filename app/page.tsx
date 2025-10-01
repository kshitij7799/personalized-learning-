import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Brain, MessageSquare, Sparkles, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LearnPath AI
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-in-up mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                <Sparkles className="h-4 w-4" />
                AI-Powered Learning
              </span>
            </div>
            <h1 className="animate-fade-in-up mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-6xl lg:text-7xl">
              Your Personalized Path to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mastery
              </span>
            </h1>
            <p className="animate-fade-in-up mb-8 text-xl text-muted-foreground text-balance md:text-2xl">
              Transform your learning journey with AI-generated paths tailored to your goals, pace, and style. Learn
              smarter, not harder.
            </p>
            <div className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Learning Free
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-200 opacity-20 blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-indigo-200 opacity-20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Powerful features designed to accelerate your learning journey
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Paths</h3>
                <p className="text-muted-foreground">
                  AI analyzes your goals and creates custom learning paths with milestones tailored to your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Learning Assistant</h3>
                <p className="text-muted-foreground">
                  Get instant answers, explanations, and guidance from your personal AI tutor available 24/7.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Resource Library</h3>
                <p className="text-muted-foreground">
                  Curate and organize your learning materials in one place with smart tagging and search.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your advancement with detailed analytics and celebrate milestones along the way.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Brain className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Adaptive Learning</h3>
                <p className="text-muted-foreground">
                  The system adapts to your pace and learning style, ensuring optimal knowledge retention.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                  <Sparkles className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
                <p className="text-muted-foreground">
                  Discover new topics and resources based on your interests and learning patterns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">How It Works</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Get started in minutes and transform your learning experience
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Set Your Goals</h3>
              <p className="text-muted-foreground">
                Tell us what you want to learn and your current skill level. Our AI will understand your objectives.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Get Your Path</h3>
              <p className="text-muted-foreground">
                Receive a personalized learning path with structured milestones and curated resources.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Learn & Grow</h3>
              <p className="text-muted-foreground">
                Follow your path, track progress, and get help from your AI assistant whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6 text-balance md:text-5xl">Ready to Transform Your Learning?</h2>
            <p className="text-xl mb-8 text-blue-100 text-balance">
              Join thousands of learners who are achieving their goals with personalized AI-powered learning paths.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Your Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="font-bold">LearnPath AI</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 LearnPath AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
