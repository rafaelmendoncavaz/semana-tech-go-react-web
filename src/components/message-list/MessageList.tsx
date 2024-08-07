import { Message } from "./message/Message";

export function MessageList() {

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      <Message text="mensagem" ammountOfReactions={1} />
    </ol>
  )
}