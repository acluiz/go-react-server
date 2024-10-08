import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { createRoom } from "../services/create-room";

import { ArrowRight } from "lucide-react";
import AmaLogo from "../assets/images/ama-logo.svg";

export const CreateRoom = () => {
  const navigate = useNavigate();

  const handleCreateRoom = async (data: FormData) => {
    const theme = data.get("theme")?.toString();

    if (!theme) return;

    try {
      const { id } = await createRoom({ theme });
      navigate(`/room/${id}/`);
    } catch {
      toast.error("Falha ao criar sala");
    }
  };

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <div className="max-w-[450px] flex flex-col gap-6">
        <img src={AmaLogo} alt="AMA Logo" className="h-10" />

        <p className="leading-relaxed text-zinc-300 text-center">
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas
          mais importantes para a comunidade.
        </p>

        <form
          action={handleCreateRoom}
          className="flex items-center gap-2 p-2 rounded-xl border border-zinc-800 bg-zinc-900 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
        >
          <input
            required
            type="text"
            name="theme"
            autoComplete="off"
            placeholder="Nome da sala"
            className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-inc-500"
          />

          <button
            type="submit"
            className="bg-orange-400 text-orange-950 text-sm font-medium px-3 py-1.5 gap-1.5 flex items-center rounded-lg transition-colors hover:bg-orange-500"
          >
            Criar sala
            <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </main>
  );
};
