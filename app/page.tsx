"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useTodos } from "@/hooks/use-todos"
import { TodoForm } from "@/components/todo-form"
import { TodoList } from "@/components/todo-list"
import { TodoFilters } from "@/components/todo-filters"

export default function HomePage() {
  const { todos, isLoading, add, update, toggle, remove, clearCompleted } = useTodos()
  const [status, setStatus] = useState<"all" | "active" | "completed">("all")
  const [priority, setPriority] = useState<"all" | "low" | "medium" | "high">("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return todos.filter((t) => {
      const matchesStatus = status === "all" || (status === "active" ? !t.completed : t.completed)
      const matchesPriority = priority === "all" || t.priority === priority
      const matchesQuery =
        !query ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        (t.notes || "").toLowerCase().includes(query.toLowerCase())
      return matchesStatus && matchesPriority && matchesQuery
    })
  }, [todos, status, priority, query])

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.length - activeCount
  const progress = todos.length ? Math.round((completedCount / todos.length) * 100) : 0

  return (
    <main className="min-h-dvh p-4 md:p-6 animate-fade-in-up">
      <div className="mx-auto w-full max-w-md md:max-w-2xl space-y-6">
        {/* Header: app title + quick stats */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{"Today"}</p>
            <h1 className="text-pretty text-2xl font-semibold tracking-tight">{"Your Tasks"}</h1>
          </div>
          <div className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            {todos.length}
            {" total"}
          </div>
        </header>

        {/* Overview card */}
        <Card className="card-glass hover-lift animate-pop border-border/60 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-balance text-base">
              {"You've got "}
              <span className="text-primary font-semibold">{activeCount}</span>
              {" task"}
              {activeCount === 1 ? "" : "s"}
              {" to complete"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={progress} />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {"Completed: "}
                <span className="text-foreground">{completedCount}</span>
              </span>
              <span>
                {"Active: "}
                <span className="text-foreground">{activeCount}</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Create task */}
        <Card className="card-glass hover-lift animate-pop bg-secondary/30 border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-balance text-base">{"Create new task"}</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoForm
              onSubmit={(data) => {
                add(data)
              }}
            />
          </CardContent>
        </Card>

        {/* Filters + list */}
        <Card className="card-glass hover-lift animate-pop bg-card border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-balance text-base">{"Tasks"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TodoFilters
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              query={query}
              setQuery={setQuery}
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filtered.length}
                {" matching task"}
                {filtered.length === 1 ? "" : "s"}
              </div>
              <Button variant="secondary" onClick={() => clearCompleted()} disabled={completedCount === 0}>
                {"Clear completed"}
              </Button>
            </div>
            <Separator />
            <TodoList todos={filtered} isLoading={isLoading} onToggle={toggle} onUpdate={update} onDelete={remove} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
