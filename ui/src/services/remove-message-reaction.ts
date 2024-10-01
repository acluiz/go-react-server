interface RemoveMessageReactionRequest {
  roomID: string;
  messageID: string;
}

export const removeMessageReaction = async ({
  roomID,
  messageID,
}: RemoveMessageReactionRequest) => {
  await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomID}/messages/${messageID}/react`,
    { method: "DELETE" }
  );
};
