import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getRoomMessages } from "../services/get-room-messages";

import { Message } from "./message";
import { useMessagesWS } from "../hooks/use-messages-ws";

export const Messages = () => {
  const { roomID } = useParams();

  if (!roomID) {
    throw new Error("Messages components must be used within room page");
  }

  const { data: messages } = useSuspenseQuery({
    queryKey: ["messages", roomID],
    queryFn: () => getRoomMessages({ roomID }),
  });

  useMessagesWS({ roomID });

  const sortedMessages = messages.sort(
    (a, b) => b.reaction_count - a.reaction_count
  );

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map(({ id, answered, reaction_count, message }) => (
        <Message
          key={id}
          id={id}
          text={message}
          answered={answered}
          amountOfReactions={reaction_count}
        />
      ))}
    </ol>
  );
};
