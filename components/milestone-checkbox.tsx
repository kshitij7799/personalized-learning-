"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

interface MilestoneCheckboxProps {
  pathId: string
  milestoneIndex: number
  initialChecked: boolean
  progressId?: string
}

export function MilestoneCheckbox({ pathId, milestoneIndex, initialChecked, progressId }: MilestoneCheckboxProps) {
  const [checked, setChecked] = useState(initialChecked)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleChange = async (newChecked: boolean) => {
    setIsUpdating(true)
    setChecked(newChecked)

    try {
      const response = await fetch("/api/progress/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pathId,
          milestoneIndex,
          completed: newChecked,
          progressId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update progress")
      }

      router.refresh()
    } catch (error) {
      console.error("Error updating progress:", error)
      setChecked(!newChecked)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={handleChange}
      disabled={isUpdating}
      className="mt-1 h-6 w-6"
      aria-label={`Mark milestone ${milestoneIndex + 1} as ${checked ? "incomplete" : "complete"}`}
    />
  )
}
