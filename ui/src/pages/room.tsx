import { useParams } from "react-router-dom";

export const Room = () => {
  const { roomID } = useParams();

  return <h1>{roomID}</h1>;
};
