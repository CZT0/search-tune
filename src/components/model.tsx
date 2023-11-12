import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import * as React from "react"

interface SelectModelProps {
  model: string
  setModel: Function
}

export function SelectModel({ model, setModel }: SelectModelProps) {
  const models = ["gpt-3.5-turbo-0613", "gpt-4-0613"]
  return (
    <Select onValueChange={(value) => setModel(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={model} />
      </SelectTrigger>
      <SelectContent className="max-h-40 overflow-auto">
        <SelectGroup>
          {models.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
