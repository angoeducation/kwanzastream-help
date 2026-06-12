import { useState } from "react";

export function FeedbackWidget() {
  const [choice, setChoice] = useState<"up" | "down" | null>(null);

  return (
    <div className="mt-12 border-t border-ks-border pt-6">
      {choice ? (
        <p className="text-[15px] font-medium text-ks-success">Obrigado pelo teu feedback!</p>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-[15px] font-medium text-ks-text">Este artigo foi útil?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setChoice("up")}
              className="px-4 py-1.5 rounded-md border border-ks-border-hover text-[13px] text-ks-text hover:bg-ks-surface-2 transition-colors duration-150"
            >
              👍 Sim
            </button>
            <button
              onClick={() => setChoice("down")}
              className="px-4 py-1.5 rounded-md border border-ks-border-hover text-[13px] text-ks-text hover:bg-ks-surface-2 transition-colors duration-150"
            >
              👎 Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
