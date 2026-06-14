import { useState } from "react";
import { ThumbsUp, ThumbsDown, Send, CheckCircle } from "lucide-react";

export function FeedbackWidget() {
  const [choice, setChoice] = useState<"up" | "down" | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mt-12 border-t border-ks-border pt-8">
      {submitted ? (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg animate-fade-in">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-[14px] font-medium">
            Obrigado pelo teu feedback! Ajudará a melhorar a nossa central de ajuda.
          </p>
        </div>
      ) : choice === "up" ? (
        <div className="flex items-center gap-3 bg-ks-surface-2 border border-ks-border p-4 rounded-lg animate-fade-in">
          <CheckCircle className="w-5 h-5 text-ks-accent flex-shrink-0" />
          <p className="text-[14px] font-medium text-ks-text">
            Obrigado! Ficamos felizes por saber que este artigo foi útil.
          </p>
        </div>
      ) : choice === "down" ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-ks-surface-2 border border-ks-border p-5 rounded-lg animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <ThumbsDown className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-[14px] font-semibold text-ks-text">
                Como podemos melhorar este artigo?
              </h4>
              <p className="text-[12px] text-ks-muted mt-0.5">
                O teu comentário é anónimo e ajuda-nos a atualizar a informação.
              </p>
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreve aqui o teu comentário ou o que faltou explicar..."
            required
            rows={3}
            className="w-full text-[14px] bg-white border border-ks-border-hover rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-ks-accent focus:border-ks-accent text-ks-text placeholder-ks-muted resize-none"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setChoice(null)}
              className="px-4 py-2 text-[13px] font-medium text-ks-muted hover:text-ks-text transition-colors duration-150"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-ks-accent hover:bg-ks-accent-hover text-white px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-150 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Enviar Feedback
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-ks-surface-2 border border-ks-border p-5 rounded-lg">
          <div>
            <h4 className="text-[14px] font-semibold text-ks-text">Este artigo foi útil?</h4>
            <p className="text-[12px] text-ks-muted mt-0.5">
              Diz-nos a tua opinião para continuarmos a melhorar.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChoice("up")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-ks-surface border border-ks-border hover:border-ks-border-hover rounded-md text-[13px] font-medium text-ks-text transition-all duration-150 shadow-sm group"
            >
              <ThumbsUp className="w-4 h-4 text-ks-muted group-hover:text-ks-accent transition-colors" />
              <span>Sim, ajudou</span>
            </button>
            <button
              onClick={() => setChoice("down")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-ks-surface border border-ks-border hover:border-ks-border-hover rounded-md text-[13px] font-medium text-ks-text transition-all duration-150 shadow-sm group"
            >
              <ThumbsDown className="w-4 h-4 text-ks-muted group-hover:text-red-500 transition-colors" />
              <span>Não, de todo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
