import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { GetRoomMessageResponse } from "../services/get-room-messages";

interface useMessagesWSParams {
  roomID: string;
}

type MessageCreated = {
  kind: "message_created";
  value: { id: string; message: string };
};

type MessageAnswered = {
  kind: "message_answered";
  value: { id: string };
};

type MessageReactionCount = {
  kind: "message_reaction_increased" | "message_reaction_decreased";
  value: { id: string; count: number };
};

type WebhookMessage = MessageCreated | MessageAnswered | MessageReactionCount;

export const useMessagesWS = ({ roomID }: useMessagesWSParams) => {
  const queryClient = useQueryClient();

  const onMessageCreated = (data: MessageCreated) => {
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

  const onMessageAnswered = (data: MessageAnswered) => {
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

  const onMessageReacted = (data: MessageReactionCount) => {
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
      const data: WebhookMessage = JSON.parse(e.data);

      if (data.kind === "message_created") {
        onMessageCreated(data);
        return;
      }

      if (data.kind === "message_answered") {
        onMessageAnswered(data);
        return;
      }

      onMessageReacted(data);
    };

    return () => ws.close();
  }, [roomID, queryClient]);
};
