import { useEffect } from "react"
import type { GetRoomMessagesResponse } from "../http/get-room-messages"
import { useQueryClient } from "@tanstack/react-query"

interface UseMessagesWebSocketsProps {
  roomId: string,
}

type WebHookMessage =
  | { kind: "message_created", value: { id: string, message: string } }
  | { kind: "message_answered", value: { id: string } }
  | { kind: "message_reaction_increased", value: { id: string, count: number } }
  | { kind: "message_reaction_decreased", value: { id: string, count: number } }

export function useMessagesWebSockets({ roomId }: UseMessagesWebSocketsProps) {

  const queryClient = useQueryClient()

  useEffect(() => {
    const webSocket = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`)
    webSocket.onmessage = (event) => {
      const data: WebHookMessage = JSON.parse(event.data)

      switch (data.kind) {
        case "message_created": {
          queryClient.setQueryData<GetRoomMessagesResponse>(["messages", roomId], state => {
            return {
              messages: [
                ...(state?.messages ?? []),
                {
                  id: data.value.id,
                  text: data.value.message,
                  ammountOfReactions: 0,
                  answered: false
                }
              ],
            }
          })
          break
        }
        case "message_answered": {
          queryClient.setQueryData<GetRoomMessagesResponse>(["messages", roomId], state => {
            if (!state) return undefined
            return {
              messages: state.messages.map(item => {
                if (item.id === data.value.id) {
                  return {
                    ...item,
                    answered: true
                  }
                }
                return item
              }),
            }
          })
          break
        }
        case "message_reaction_increased":
        case "message_reaction_decreased": {
          queryClient.setQueryData<GetRoomMessagesResponse>(["messages", roomId], state => {
            if (!state) return undefined
            return {
              messages: state.messages.map(item => {
                if (item.id === data.value.id) {
                  return {
                    ...item,
                    ammountOfReactions: data.value.count
                  }
                }
                return item
              }),
            }
          })
          break
        }
      }
    }

    return () => {
      webSocket.close()
    }
  }, [roomId, queryClient])
}