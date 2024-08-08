import { useState } from "react";
import { useParams } from "react-router-dom";
import { addMessageReaction } from "../../../http/add-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../../../http/remove-message-reaction";
import { markMessageAsAnswered } from "../../../http/mark-as-answered";
import { LikeButton } from "../../global/LikeButton";
import { DislikeButton } from "../../global/DislikeButton";
import { MarkAsAnsweredButton } from "../../global/MarkAsAnsweredButton";

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

  async function handleMarkAsAnswered() {
    if (!roomId) return

    try {
      await markMessageAsAnswered({ roomId, messageId })
      toast.success("Mensagem marcada como lida")
    } catch (error) {
      console.error("error marking message as read", error)
      toast.error("Ocorreu um erro ao marcar a mensagem como lida")
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
            <div className="flex items-center justify-between">
              <LikeButton handleReactToMessage={handleReactToMessage} ammountOfReactions={ammountOfReactions} />
              {
                answered
                  ? (
                    <MarkAsAnsweredButton handleMarkAsAnswered={handleMarkAsAnswered} text="Respondida" />
                  )
                  : (
                    <MarkAsAnsweredButton handleMarkAsAnswered={handleMarkAsAnswered} text="Marcar Como Respondida" />
                  )
              }
            </div>
          )
          : (
            <div className="flex items-center justify-between">
              <DislikeButton handleReactToMessage={handleReactToMessage} ammountOfReactions={ammountOfReactions} />
              {
                answered
                  ? (
                    <MarkAsAnsweredButton handleMarkAsAnswered={handleMarkAsAnswered} text="Respondida" />
                  )
                  : (
                    <MarkAsAnsweredButton handleMarkAsAnswered={handleMarkAsAnswered} text="Marcar Como Respondida" />
                  )
              }
            </div>
          )
      }
    </li>
  )
}