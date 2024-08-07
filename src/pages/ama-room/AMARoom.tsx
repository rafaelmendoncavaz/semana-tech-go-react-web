import { MessageList } from "../../components/message-list/MessageList"
import { Form } from "../../components/global/Form"
import { AMAHeader } from "./AMAHeader"

export function AMARoom() {

  return (
    <main className="mx-auto max-w-[640px] h-screen flex flex-col gap-6 py-10 px-4">
      <AMAHeader />

      <div className="h-px w-full bg-zinc-900" />

      <Form input="Qual a sua pergunta?" button="Criar Pergunta" />

      <MessageList />
    </main>
  )
}