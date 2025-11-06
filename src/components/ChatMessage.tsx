import { User, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  model?: string;
}

const getModelIcon = (model: string = "") => {
  if (model.includes("gemini")) {
    return "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg";
  } else if (model.includes("gpt")) {
    return "https://cdn.oaistatic.com/_next/static/media/openai-logomark.e8a0e927.svg";
  }
  return null;
};

export const ChatMessage = ({ role, content, model }: ChatMessageProps) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const modelIcon = !isUser ? getModelIcon(model) : null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        description: "Copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderContent = () => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={lastIndex} className="whitespace-pre-wrap">
            {content.slice(lastIndex, match.index)}
          </span>
        );
      }

      const language = match[1] || "code";
      const code = match[2];

      parts.push(
        <div key={match.index} className="my-4 rounded-lg overflow-hidden bg-secondary/50">
          <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
            <span className="text-xs font-medium text-muted-foreground">{language}</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-7"
              onClick={() => copyToClipboard(code)}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm">{code}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(
        <span key={lastIndex} className="whitespace-pre-wrap">
          {content.slice(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : <span className="whitespace-pre-wrap">{content}</span>;
  };

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
            : "bg-white dark:bg-secondary"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5" />
        ) : modelIcon ? (
          <img src={modelIcon} alt="AI" className="w-6 h-6" />
        ) : (
          <span className="text-2xl">🤖</span>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="font-semibold text-foreground">
          {isUser ? "You" : "AI Assistant"}
        </div>
        <div className="text-foreground/90 leading-relaxed">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
