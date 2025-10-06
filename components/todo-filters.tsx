"use client"

import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"

type Props = {
  status: "all" | "active" | "completed"
  setStatus: (v: "all" | "active" | "completed") => void
  priority: "all" | "low" | "medium" | "high"
  setPriority: (v: "all" | "low" | "medium" | "high") => void
  query: string
  setQuery: (v: string) => void
}

export function TodoFilters({ status, setStatus, priority, setPriority, query, setQuery }: Props) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <Label className="text-xs text-muted-foreground">{"Search"}</Label>
        <Input
          id="q"
          placeholder="Find tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-secondary/50"
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">{"Status"}</Label>
          <ToggleGroup
            type="single"
            value={status}
            onValueChange={(v) => v && setStatus(v as Props["status"])}
            className="justify-start"
          >
            <ToggleGroupItem value="all" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              {"All"}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="active"
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {"Active"}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="completed"
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {"Completed"}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">{"Priority"}</Label>
          <ToggleGroup
            type="single"
            value={priority}
            onValueChange={(v) => v && setPriority(v as Props["priority"])}
            className="justify-start"
          >
            <ToggleGroupItem value="all" className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground">
              {"All"}
            </ToggleGroupItem>
            <ToggleGroupItem value="low" className="data-[state=on]:bg-secondary data-[state=on]:text-foreground">
              {"Low"}
            </ToggleGroupItem>
            <ToggleGroupItem value="medium" className="data-[state=on]:bg-secondary data-[state=on]:text-foreground">
              {"Medium"}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="high"
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {"High"}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
}
