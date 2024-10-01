import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { createMessageReaction } from "../services/create-message-reaction";

import { ArrowUp } from "lucide-react";
import { removeMessageReaction } from "../services/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export const Message = ({
  id,
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) => {
  const [hasReacted, setHasReacted] = useState(false);

  const { roomID } = useParams();

  if (!roomID) {
    throw new Error("Messages components must be used within room page");
  }

  const createMessageReactionAction = async () => {
    try {
      await createMessageReaction({ roomID, messageID: id });
      setHasReacted(true);
    } catch (error) {
      toast.error("Falha ao reagir, tente novamente");
    }
  };

  const removeMessageReactionAction = async () => {
    try {
      await removeMessageReaction({ roomID, messageID: id });
      setHasReacted(false);
    } catch (error) {
      toast.error("Falha ao remover reação, tente novamente");
    }
  };

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}

      {hasReacted ? (
        <button
          type="button"
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
          onClick={removeMessageReactionAction}
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          type="button"
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
          onClick={createMessageReactionAction}
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  );
};
