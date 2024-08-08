import { MessageList } from "../../components/message-list/MessageList"
import { Form } from "../../components/global/Form"
import { AMAHeader } from "./AMAHeader"
import { Suspense } from "react"
import { useParams } from "react-router-dom"
import { createMessage } from "../../http/create-message"
import { toast } from "sonner"

export function AMARoom() {

  const { roomId } = useParams()

  if (!roomId) {
    throw new Error("Error creating room message")
  }

  async function handleCreateRoomMessage(data: FormData) {
    const message = data.get("message")?.toString()

    if (!message || !roomId) return

    try {
      await createMessage({ roomId, message })
    } catch (error) {
      console.error("Error creating message", error)
      toast.error("Falha ao criar mensagem")
    }
  }

  return (
    <main className="mx-auto max-w-[640px] h-screen flex flex-col gap-6 py-10 px-4">
      <AMAHeader />

      <div className="h-px w-full bg-zinc-900" />

      <Form action={handleCreateRoomMessage} input="Qual a sua pergunta?" name="message" button="Criar Pergunta" />

      <Suspense fallback={<p>Carregando...</p>}>
        <MessageList />
      </Suspense>
    </main>
  )
}