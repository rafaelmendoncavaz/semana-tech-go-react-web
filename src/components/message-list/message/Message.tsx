import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface MessageProps {
  text: string
  ammountOfReactions: number
  answered?: boolean
}

export function Message({ text, ammountOfReactions, answered = false }: MessageProps) {

  const [isReacted, setIsReacted] = useState(false)

  function handleReactToMessage() {
    setIsReacted(true)
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
      <p>
        {text}
      </p>

      {
        isReacted
          ? (
            <button
              className="mt-3 flex items-center gap-2 text-orange-400 hover:text-orange-500 text-sm font-medium"
              type="button">
              <ArrowUp className="size-4" />
              Curtir pergunta ({ammountOfReactions})
            </button>
          )
          : (
            <button
              onClick={handleReactToMessage}
              className="mt-3 flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm font-medium"
              type="button">
              <ArrowUp className="size-4" />
              Curtir pergunta ({ammountOfReactions})
            </button>
          )
      }
    </li>
  )
}