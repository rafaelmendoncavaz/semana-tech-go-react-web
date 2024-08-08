import { ArrowDown } from "lucide-react"

interface LikeButtonProps {
  handleReactToMessage: () => void,
  ammountOfReactions: number,
}

export function DislikeButton({ handleReactToMessage, ammountOfReactions }: LikeButtonProps) {

  return (
    <button
      onClick={handleReactToMessage}
      className="mt-3 flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm font-medium"
      type="button">
      <ArrowDown className="size-4" />
      Curtir pergunta ({ammountOfReactions})
    </button>
  )
}