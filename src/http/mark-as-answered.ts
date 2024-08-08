interface MarkMessageAsAnsweredRequest {
  roomId: string,
  messageId: string
}

export async function markMessageAsAnswered({ roomId, messageId }: MarkMessageAsAnsweredRequest) {

  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/answer`, {
    method: "PATCH",
  })
}