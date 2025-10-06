"use client"

import { Skeleton } from "@/components/ui/skeleton"
import type { Todo } from "@/hooks/use-todos"
import { TodoItem } from "@/components/todo-item"

type Props = {
  todos: Todo[]
  isLoading?: boolean
  onToggle: (id: string) => void
  onUpdate: (id: string, patch: Partial<Todo>) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, isLoading, onToggle, onUpdate, onDelete }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  if (!todos.length) {
    return <p className="text-sm text-muted-foreground">{"No tasks match your filters."}</p>
  }

  return (
    <div className="space-y-3">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  )
}
