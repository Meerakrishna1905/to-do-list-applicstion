"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { Todo, Priority } from "@/hooks/use-todos"

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, updatedTodo: { title: string; notes?: string }) => void
  onDelete: (id: string) => void
}

function PriorityBadge({ p }: { p: Priority }) {
  const map: Record<Priority, string> = {
    low: "bg-secondary text-secondary-foreground",
    medium: "bg-muted text-foreground",
    high: "bg-primary text-primary-foreground",
  }
  return <Badge className={`${map[p]} capitalize`}>{p}</Badge>
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [notes, setNotes] = useState(todo.notes || "")

  function save() {
    if (!title.trim()) return
    onUpdate(todo.id, { title: title.trim(), notes: notes.trim() || undefined })
    setEditing(false)
  }

  const leftBar =
    todo.priority === "high"
      ? "before:bg-primary"
      : todo.priority === "medium"
        ? "before:bg-accent"
        : "before:bg-border"

  return (
    <div
      className={`relative flex items-start gap-3 rounded-xl border bg-secondary/40 p-3 md:p-4 card-glass hover-lift animate-fade-in-up ${leftBar} before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-xl`}
    >
      <div className="mt-1">
        <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} />
      </div>
      <div className="flex-1 space-y-2">
        {!editing ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <p
                  className={`truncate text-[15px] font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {todo.title}
                </p>
                {todo.notes ? (
                  <p className={`text-xs text-muted-foreground ${todo.completed ? "line-through" : ""}`}>
                    {todo.notes}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <PriorityBadge p={todo.priority} />
                {todo.dueDate ? (
                  <span className="rounded-md bg-card/40 px-2 py-1 text-[11px] text-muted-foreground">
                    {"Due "}
                    <span className="text-foreground">{todo.dueDate}</span>
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>
                {"Edit"}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(todo.id)}>
                {"Delete"}
              </Button>
            </div>
          </>
        ) : (
          <div className="grid w-full gap-2">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-16" />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={save}>
                {"Save"}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setEditing(false)}>
                {"Cancel"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
