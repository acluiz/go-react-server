import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { ArrowRight, ArrowUp, Share2 } from "lucide-react";
import AmaLogo from "../assets/images/ama-logo.svg";

export const Room = () => {
  const { roomID } = useParams();

  const handleShareRoom = () => {
    const url = window.location.href.toString();

    if (navigator.share && navigator.canShare()) {
      navigator.share({ url });
      return;
    }

    navigator.clipboard.writeText(url);
    toast.info("The room URL was copied to your clipboard");
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

      <form
        action={() => {}}
        className="flex items-center gap-2 p-2 rounded-xl border border-zinc-800 bg-zinc-900 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
      >
        <input
          type="text"
          name="question"
          autoComplete="off"
          placeholder="Qual a sua pergunta?"
          className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-inc-500"
        />

        <button
          type="submit"
          className="text-orange-950 text-sm font-medium px-3 py-1.5 gap-1.5 flex items-center rounded-lg transition-colors bg-orange-400 hover:bg-orange-500"
        >
          Criar pergunta
          <ArrowRight className="size-4" />
        </button>
      </form>

      <ol className="list-decimal list-outside px-3 space-y-8">
        <li className="ml-4 leading-relaxed text-zinc-400">
          O que é GoLang e quais são suas principais vantagens em comparação com
          outras linguagens de programação como Python, Java ou C++?
          <button
            type="button"
            className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (123)
          </button>
        </li>
        <li className="ml-4 leading-relaxed text-zinc-100">
          Como funcionam as goroutines em GoLang e por que elas são importantes
          para a concorrência e paralelismo?
          <button
            type="button"
            className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (123)
          </button>
        </li>
      </ol>
    </div>
  );
};
