interface CreateRoomRequest {
  theme: string;
}

interface CreateRoomResponse {
  id: string;
}

export const createRoom = async ({ theme }: CreateRoomRequest) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms`, {
    method: "POST",
    body: JSON.stringify({ theme }),
  });

  const data: CreateRoomResponse = await response.json();

  return data;
};
