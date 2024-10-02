import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import {
  GetRoomMessageResponse,
  getRoomMessages,
} from "../services/get-room-messages";

import { Message } from "./message";

type MessageKind =
  | "message_created"
  | "message_answered"
  | "message_reaction_increased"
  | "message_reaction_decreased";

interface WSUpdatedResponse {
  kind: MessageKind;
  value: any;
}

export const Messages = () => {
  const { roomID } = useParams();
  const queryClient = useQueryClient();

  if (!roomID) {
    throw new Error("Messages components must be used within room page");
  }

  const { data: messages } = useSuspenseQuery({
    queryKey: ["messages", roomID],
    queryFn: () => getRoomMessages({ roomID }),
  });

  const onMessageCreated = (data: WSUpdatedResponse) => {
    queryClient.setQueryData<GetRoomMessageResponse[]>(
      ["messages", roomID],
      (state) => [
        ...(state ?? []),
        {
          id: data.value.id,
          message: data.value.message,
          reaction_count: 0,
          answered: false,
        },
      ]
    );
  };

  const onMessageAnswered = (data: WSUpdatedResponse) => {
    queryClient.setQueryData<GetRoomMessageResponse[]>(
      ["messages", roomID],
      (state) => {
        if (!state) {
          return undefined;
        }

        return state.map((message) => {
          if (message.id === data.value.id) {
            return { ...message, answered: true };
          }

          return message;
        });
      }
    );
  };

  const onMessageReacted = (data: WSUpdatedResponse) => {
    queryClient.setQueryData<GetRoomMessageResponse[]>(
      ["messages", roomID],
      (state) => {
        if (!state) {
          return undefined;
        }

        return state.map((message) => {
          if (message.id === data.value.id) {
            return { ...message, reaction_count: data.value.count };
          }

          return message;
        });
      }
    );
  };

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomID}`);

    ws.onopen = () => {
      console.log("Websocket connected");
    };

    ws.onclose = () => {
      console.log("Websocket connection closed");
    };

    ws.onmessage = (e) => {
      const data: WSUpdatedResponse = JSON.parse(e.data);

      const actions = {
        message_created: onMessageCreated(data),
        message_answered: onMessageAnswered(data),
        message_reaction_increased: onMessageReacted(data),
        message_reaction_decreased: onMessageReacted(data),
      };

      const actionToTrigger = () => actions[data.kind];

      actionToTrigger();
    };

    return () => ws.close();
  }, [roomID, queryClient]);

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {messages.map(({ id, answered, reaction_count, message }) => (
        <Message
          key={id}
          id={id}
          answered={answered}
          amountOfReactions={reaction_count}
          text={message}
        />
      ))}
    </ol>
  );
};
