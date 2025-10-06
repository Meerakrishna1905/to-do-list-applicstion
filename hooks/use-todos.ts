"use client"

import useSWR from "swr"

export type Priority = "low" | "medium" | "high"

export type Todo = {
  id: string
  title: string
  notes?: string
  completed: boolean
  priority: Priority
  dueDate?: string // ISO date
  createdAt: string // ISO date
  updatedAt?: string // ISO date
}

const STORAGE_KEY = "todos-v1"

function readFromStorage(): Todo[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

function writeToStorage(next: Todo[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function useTodos() {
  const { data, mutate, isLoading } = useSWR<Todo[]>(STORAGE_KEY, () => readFromStorage(), { fallbackData: [] })

  const todos = data || []

  function persist(next: Todo[]) {
    writeToStorage(next)
    // Optimistic local update without revalidate
    mutate(next, { revalidate: false })
  }

  function add(input: { title: string; notes?: string; priority: Priority; dueDate?: string }) {
    const now = new Date().toISOString()
    const todo: Todo = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      title: input.title.trim(),
      notes: input.notes?.trim() || undefined,
      priority: input.priority,
      dueDate: input.dueDate || undefined,
      completed: false,
      createdAt: now,
    }
    persist([todo, ...todos])
  }

  function update(id: string, patch: Partial<Omit<Todo, "id" | "createdAt">>) {
    const next = todos.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t))
    persist(next)
  }

  function toggle(id: string) {
    const next = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t,
    )
    persist(next)
  }

  function remove(id: string) {
    const next = todos.filter((t) => t.id !== id)
    persist(next)
  }

  function clearCompleted() {
    const next = todos.filter((t) => !t.completed)
    persist(next)
  }

  return { todos, isLoading, add, update, toggle, remove, clearCompleted }
}
