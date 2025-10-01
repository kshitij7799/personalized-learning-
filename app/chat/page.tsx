"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Loader2, Send, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = inputRef.current
    if (!input || !input.value.trim()) return

    sendMessage({ text: input.value })
    input.value = ""
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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

      {/* Chat Container */}
      <div className="flex-1 container max-w-4xl py-8 flex flex-col">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">AI Learning Assistant</h1>
          <p className="text-xl text-muted-foreground">Ask me anything about your learning journey</p>
        </div>

        {/* Messages */}
        <Card className="flex-1 flex flex-col border-none shadow-xl overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
                  <Sparkles className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  I can help you understand concepts, suggest resources, or answer questions about your learning path.
                </p>
                <div className="grid gap-3 w-full max-w-md">
                  <Button
                    variant="outline"
                    className="justify-start text-left h-auto py-3 px-4 bg-transparent"
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.value = "What should I learn first in web development?"
                        inputRef.current.focus()
                      }
                    }}
                  >
                    What should I learn first in web development?
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start text-left h-auto py-3 px-4 bg-transparent"
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.value = "Explain the concept of APIs in simple terms"
                        inputRef.current.focus()
                      }
                    }}
                  >
                    Explain the concept of APIs in simple terms
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start text-left h-auto py-3 px-4 bg-transparent"
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.value = "How can I stay motivated while learning?"
                        inputRef.current.focus()
                      }
                    }}
                  >
                    How can I stay motivated while learning?
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "bg-muted"
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <p key={index} className="whitespace-pre-wrap leading-relaxed">
                              {part.text}
                            </p>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                ))}
                {status === "in_progress" && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t p-4 bg-background">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={status === "in_progress"}
              />
              <Button type="submit" size="lg" disabled={status === "in_progress"} className="gap-2">
                {status === "in_progress" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send
                  </>
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
