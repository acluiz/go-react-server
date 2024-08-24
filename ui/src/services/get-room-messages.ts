interface GetRoomMessagesRequest {
  roomID: string;
}

interface GetRoomMessageResponse {
  id: string;
  room_id: string;
  message: string;
  reaction_count: number;
  answered: boolean;
}

// Temporary mock - waiting for method to be created in api
const MOCKED_RESPONSE = [
  {
    id: "0",
    room_id: "0",
    message:
      "O que é GoLang e quais são suas principais vantagens em comparação com outras linguagens de programação como Python, Java ou C++?",
    reaction_count: 182,
    answered: true,
  },
  {
    id: "1",
    room_id: "1",
    message:
      "Como funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?",
    reaction_count: 173,
    answered: false,
  },
];

export const getRoomMessages = async ({ roomID }: GetRoomMessagesRequest) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomID}/messages`,
    { method: "GET" }
  );

  try {
    const data: Array<GetRoomMessageResponse> = await response.json();
    return data;
  } catch {
    return MOCKED_RESPONSE;
  }
};
