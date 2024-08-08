interface AddMessageReactionRequest {
  roomId: string,
  messageId: string
}

export async function addMessageReaction({ roomId, messageId }: AddMessageReactionRequest) {

  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
    method: "PATCH",
  })
}