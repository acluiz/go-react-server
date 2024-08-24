import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Share2 } from "lucide-react";
import AmaLogo from "../assets/images/ama-logo.svg";

import { Messages } from "../components/messages";
import { CreateMessageForm } from "../components/create-message-form";

export const Room = () => {
  const { roomID } = useParams();

  const handleShareRoom = () => {
    const url = window.location.href.toString();

    if (navigator.share && navigator.canShare()) {
      navigator.share({ url });
      return;
    }

    navigator.clipboard.writeText(url);
    toast.info("O link da sala foi copiado para a área de transferência");
  };

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-5">
      <div className="flex items-center gap-3 px-3">
        <img src={AmaLogo} alt="AMA Logo" className="h-5" />

        <span className="text-sm text-zinc-500 text truncate">
          Código da sala: <span className="text-zinc-300">{roomID}</span>
        </span>

        <button
          type="submit"
          className="ml-auto text-zinc-300 text-sm font-medium px-3 py-1.5 gap-1.5 flex items-center rounded-lg transition-colors bg-zinc-800 hover:bg-zinc-700"
          onClick={handleShareRoom}
        >
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <CreateMessageForm />

      <Suspense fallback={<p>Carregando...</p>}>
        <Messages />
      </Suspense>
    </div>
  );
};
