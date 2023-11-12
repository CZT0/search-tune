import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import * as React from "react"

interface SelectLanguageProps {
  language: string
  setLanguage: Function
}

export function SelectLanguage({ language, setLanguage }: SelectLanguageProps) {
  const languages = [
    "English",
    "Chinese",
    "Spanish",
    "French",
    "German",
    "Russian",
    "Arabic",
    "Portuguese",
    "Japanese",
    "Hindi"
  ]
  return (
    <Select onValueChange={(value) => setLanguage(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={language} />
      </SelectTrigger>
      <SelectContent className="max-h-40 overflow-auto">
        <SelectGroup>
          {languages.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
