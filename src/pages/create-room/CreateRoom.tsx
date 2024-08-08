import logo from "../../assets/Logo.svg"
import { useNavigate } from "react-router-dom"
import { Form } from "../../components/global/Form"
import { createRoom } from "../../http/create-room"
import { toast } from "sonner"

export function CreateRoom() {

  const navigate = useNavigate()

  async function handleCreateRoom(data: FormData) {
    const theme = data.get("theme")?.toString()

    if (!theme) return

    try {
      const { roomId } = await createRoom({ theme })
      navigate(`/room/${roomId}`)

    } catch (error) {
      toast.error("Falha ao criar sala")
      console.error("error creating room", error)
    }

  }

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <div className="max-w-[450px] flex flex-col gap-6">
        <div className="w-14 h-10 self-center">
          <img src={logo} alt="AMA" />
        </div>
        <p className="leading-relaxed text-zinc-300 text-center">
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>

        <Form action={handleCreateRoom} input="Nome da Sala" name="theme" button="Criar Sala" />

      </div>
    </main>
  )
}