import { Share2 } from "lucide-react"
import logo from "../../assets/Logo.svg"
import { useParams } from "react-router-dom"
import { toast } from "sonner"


export function AMAHeader() {

  const { roomId } = useParams()

  function handleShareRoom() {
    const url = window.location.href.toString()

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url })
    } else {
      navigator.clipboard.writeText(url)
      toast("The room URL is copied to your clipboard")
    }
  }

  return (
    <header className="flex items-center justify-between gap-3 px-3">
      <div className="flex gap-3 items-center">
        <img
          src={logo}
          alt="AMA"
          className="h-5"
        />

        <span className="tex-sm text-zinc-500 truncate">
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>
      </div>

      <button
        className="bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-300 font-medium text-sm px-3 py-1.5 gap-1.5 flex items-center rounded-lg"
        onClick={handleShareRoom}
        type="submit">
        Compartilhar
        <Share2 className="size-4" />
      </button>
    </header>
  )
}