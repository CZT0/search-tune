import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { storage } from "@/lib/storage"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/dist/hook"

import "@/globals.css"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

export default function IndexPopup() {
  const [storageApiKey, setStorageApiKey] = useStorage(
    {
      key: "apiKey",
      instance: storage
    },
    ""
  )
  const [storageBaseUrl, setStorageBaseUrl] = useStorage(
    {
      key: "baseUrl",
      instance: storage
    },
    "https://api.openai.com/v1"
  )
  const [storageLanguage, setStorageLanguage] = useStorage(
    { key: "language", instance: storage },
    "English"
  )
  const [storageModel, setStorageModel] = useStorage(
    { key: "model", instance: storage },
    "gpt-4o"
  )
  const [apiKey, setApiKey] = useState(storageApiKey)
  const [baseUrl, setBaseUrl] = useState(storageBaseUrl)
  const [language, setLanguage] = useState(storageLanguage)
  const [model, setModel] = useState(storageModel)

  useEffect(() => {
    setApiKey(storageApiKey)
    setBaseUrl(storageBaseUrl)
    setLanguage(storageLanguage)
    setModel(storageModel)
  }, [storageApiKey, storageBaseUrl, storageLanguage, storageModel])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await setStorageApiKey(apiKey)
    await setStorageBaseUrl(baseUrl)
    await setStorageLanguage(language)
    await setStorageModel(model)
    window.close()
  }

  return (
    <div className="p-4 shadow-lg rounded-lg max-w-sm mx-auto flex flex-col w-80">
      <form onSubmit={handleSubmit}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How to use?</AccordionTrigger>
            <AccordionContent>
              <div className={"font-bold text-zinc-500"}>
                <p>1. Type your search query into the Google search bar.</p>
                <p>2. Press '/' key twice after your query.</p>
                <p>3. Get the results you want.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className={"mb-4 mt-4"}>
          <label
            htmlFor="api-key"
            className="block text-gray-700 text-sm font-bold mb-2">
            Search Languages
          </label>
          <Input
            id="language"
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Enter Search Language"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="api-key"
            className="block text-gray-700 text-sm font-bold mb-2">
            API Key:
          </label>
          <Input
            id="api-key"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter OpenAI API Key"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="base-url"
            className="block text-gray-700 text-sm font-bold mb-2">
            Base URL (optional):
          </label>
          <Input
            id="base-url"
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Enter Base URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="model"
            className="block text-gray-700 text-sm font-bold mb-2">
            Model:
          </label>
          <Input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter Model Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className={"flex space-x-2"}>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
