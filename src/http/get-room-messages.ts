import { toast } from "sonner"

interface GetRoomMessagesRequest {
  roomId: string
}

export interface GetRoomMessagesResponse {
  messages: {
    id: string,
    text: string,
    ammountOfReactions: number,
    answered?: boolean
  }[]
}

export async function getRoomMessages({ roomId }: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`)
    const data: Array<{
      id: string,
      room_id: string,
      message: string,
      reaction_count: number,
      answered: boolean
    }> = await response.json()

    if (!Array.isArray(data)) {
      return {
        messages: []
      }
    }

    return {
      messages: data.map(item => {
        return {
          id: item.id,
          text: item.message,
          ammountOfReactions: item.reaction_count,
          answered: item.answered
        }
      })
    }
  } catch (error) {
    console.error("error fetching room messages", error)
    toast.error("Falha ao carregar mensagens da sala")
    return {
      messages: []
    }
  }
}