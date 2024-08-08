import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addMessageReaction } from "../../../http/add-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../../../http/remove-message-reaction";

interface MessageProps {
  messageId: string
  text: string
  ammountOfReactions: number
  answered?: boolean
}

export function Message({ messageId, text, ammountOfReactions, answered = false }: MessageProps) {

  const { roomId } = useParams()
  const [isReacted, setIsReacted] = useState(false)

  async function handleReactToMessage() {
    if (!roomId) return

    if (!isReacted) {
      try {
        await addMessageReaction({ roomId, messageId })
        setIsReacted(true)
        toast.success("Você reagiu a esta pergunta")
        return
      } catch (error) {
        console.error("error updating reaction", error)
        toast.error("Ocorreu um erro ao reagir a pergunta")
      }
    }

    if (isReacted) {
      try {
        await removeMessageReaction({ roomId, messageId })
        setIsReacted(false)
        toast.success("Você reagiu esta pergunta")
        return
      } catch (error) {
        console.error("error updating reaction", error)
        toast.error("Ocorreu um erro ao reagir a pergunta")
      }
    }
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
              onClick={handleReactToMessage}
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