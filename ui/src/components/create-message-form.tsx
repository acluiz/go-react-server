import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { createMessage } from "../services/create-message";

import { ArrowRight } from "lucide-react";

export const CreateMessageForm = () => {
  const { roomID } = useParams();

  if (!roomID) {
    throw new Error("Messages components must be used within room page");
  }

  const createMessageAction = async (data: FormData) => {
    const message = data.get("message")?.toString();

    if (!message) return;

    try {
      await createMessage({ message, roomID });
    } catch {
      toast.error("Falha ao enviar pergunta, tente novamente");
    }
  };

  return (
    <form
      action={createMessageAction}
      className="flex items-center gap-2 p-2 rounded-xl border border-zinc-800 bg-zinc-900 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
    >
      <input
        type="text"
        name="message"
        autoComplete="off"
        placeholder="Qual a sua pergunta?"
        className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-inc-500"
      />

      <button
        type="submit"
        className="text-orange-950 text-sm font-medium px-3 py-1.5 gap-1.5 flex items-center rounded-lg transition-colors bg-orange-400 hover:bg-orange-500"
      >
        Criar pergunta
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
};
