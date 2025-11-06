import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 p-6 rounded-xl transition-all duration-300",
        isUser ? "bg-[hsl(var(--user-message))]" : "bg-[hsl(var(--ai-message))]"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-gradient-to-br from-[hsl(var(--ai-gradient-start))] to-[hsl(var(--ai-gradient-end))] text-white"
        )}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      <div className="flex-1 space-y-2">
        <div className="font-semibold text-foreground">
          {isUser ? "You" : "AI Assistant"}
        </div>
        <div className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};
