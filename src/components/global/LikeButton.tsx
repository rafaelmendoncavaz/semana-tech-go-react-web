import { ArrowUp } from "lucide-react"

interface LikeButtonProps {
  handleReactToMessage: () => void,
  ammountOfReactions: number,
}

export function LikeButton({ handleReactToMessage, ammountOfReactions }: LikeButtonProps) {

  return (
    <button
      onClick={handleReactToMessage}
      className="mt-3 flex items-center gap-2 text-orange-400 hover:text-orange-500 text-sm font-medium"
      type="button">
      <ArrowUp className="size-4" />
      Curtir pergunta ({ammountOfReactions})
    </button>
  )
}