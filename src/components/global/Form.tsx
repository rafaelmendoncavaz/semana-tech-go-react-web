import { ArrowRight } from "lucide-react"

interface FormProps {
  action?: (data: FormData) => void
  input: string
  button: string
}

export function Form({ action, input, button }: FormProps) {

  return (
    <form
      action={action}
      className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1">
      <input
        className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
        type="text"
        name="theme"
        placeholder={input}
        autoComplete="off"
      />

      <button
        className="bg-orange-400 hover:bg-orange-500 transition-colors text-orange-950 font-medium text-sm px-3 py-1.5 gap-1.5 flex items-center rounded-lg"
        type="submit">
        {button}
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}