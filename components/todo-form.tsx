"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Priority } from "@/hooks/use-todos"

type Props = {
  onSubmit: (data: { title: string; notes?: string; priority: Priority; dueDate?: string }) => void
}

export function TodoForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [dueDate, setDueDate] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title, notes, priority, dueDate: dueDate || undefined })
    setTitle("")
    setNotes("")
    setPriority("medium")
    setDueDate("")
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div className="grid gap-1">
        <Label htmlFor="title" className="text-xs text-muted-foreground">
          {"Title"}
        </Label>
        <Input
          id="title"
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-secondary/50"
        />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="notes" className="text-xs text-muted-foreground">
          {"Notes"}
        </Label>
        <Textarea
          id="notes"
          placeholder="Extra details..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-20 bg-secondary/50"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">{"Priority"}</Label>
          <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
            <SelectTrigger className="bg-secondary/50">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">{"Low"}</SelectItem>
              <SelectItem value="medium">{"Medium"}</SelectItem>
              <SelectItem value="high">{"High"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1 md:col-span-2">
          <Label htmlFor="due" className="text-xs text-muted-foreground">
            {"Due date"}
          </Label>
          <Input
            id="due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-secondary/50"
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit" className="px-6">
          {"Add Task"}
        </Button>
      </div>
    </form>
  )
}
