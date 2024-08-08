import { Check } from "lucide-react"

interface MarkAsAnsweredButtonProps {
  handleMarkAsAnswered: () => void,
  text: string
}

export function MarkAsAnsweredButton({ handleMarkAsAnswered, text }: MarkAsAnsweredButtonProps) {

  return (
    <button
      onClick={handleMarkAsAnswered}
      className="mt-3 flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm font-medium"
      type="button">
      <Check className="size-4" />
      {text}
    </button>
  )
}