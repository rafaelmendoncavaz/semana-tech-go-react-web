import { useParams } from "react-router-dom";
import { Message } from "./message/Message";
import { getRoomMessages } from "../../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebSockets } from "../../hooks/use-messages-websockets";

export function MessageList() {

  const { roomId } = useParams()

  if (!roomId) {
    throw new Error("O componente MessageList deve ser usado somente dentro da página da sala")
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId })
  })

  useMessagesWebSockets({ roomId })

  const sortMessagesByLikes = data.messages.sort((a, b) => {
    return b.ammountOfReactions - a.ammountOfReactions
  })

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {
        sortMessagesByLikes.map(item => <Message key={item.id} messageId={item.id} text={item.text} ammountOfReactions={item.ammountOfReactions} />)
      }
    </ol>
  )
}