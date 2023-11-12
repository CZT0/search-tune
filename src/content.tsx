import { request_openai } from "@/lib/openai"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: [
    "https://www.google.com/*",
    "https://www.google.com.hk/*",
    "https://www.google.co.uk/*",
    "https://www.google.ca/*",
    "https://www.google.com.au/*",
    "https://www.google.es/*",
    "https://www.google.com.mx/*",
    "https://www.google.com.ar/*",
    "https://www.google.tw/*",
    "https://www.google.fr/*",
    "https://www.google.de/*",
    "https://www.google.at/*",
    "https://www.google.ru/*",
    "https://www.google.ae/*",
    "https://www.google.com.eg/*",
    "https://www.google.pt/*",
    "https://www.google.com.br/*",
    "https://www.google.co.jp/*",
    "https://www.google.co.in/*"
  ]
}

const PlasmoOverlay = () => {
  useEffect(() => {
    let spaceCount = 0
    const searchBox = document.querySelector(
      'textarea[name="q"]'
    ) as HTMLInputElement

    const handleKeyDown = async (event: { code: string }) => {
      if (event.code === "Space") {
        spaceCount++
        if (spaceCount === 3) {
          spaceCount = 0
          const content = searchBox ? searchBox.value : ""
          const raw_content = searchBox.value
          searchBox.value = "loading..."
          try {
            const stream = await request_openai(content)
            searchBox.value = ""
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content
              if (text) searchBox.value += text
            }
          } catch (e) {
            searchBox.value = raw_content
          }
        }
      } else {
        spaceCount = 0
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return <div />
}

export default PlasmoOverlay
