import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface CompactModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const models = [
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", shortLabel: "Flash", icon: "✨" },
  { value: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro", shortLabel: "Pro", icon: "⚡" },
  { value: "google/gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite", shortLabel: "Lite", icon: "💫" },
  { value: "openai/gpt-5", label: "GPT-5", shortLabel: "GPT-5", icon: "🤖" },
  { value: "openai/gpt-5-mini", label: "GPT-5 Mini", shortLabel: "5-Mini", icon: "🔷" },
  { value: "openai/gpt-5-nano", label: "GPT-5 Nano", shortLabel: "5-Nano", icon: "◆" },
];

export const CompactModelSelector = ({ value, onChange }: CompactModelSelectorProps) => {
  const currentModel = models.find((m) => m.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 px-3 gap-2 font-medium text-sm hover:bg-secondary/80"
        >
          <span>{currentModel?.icon}</span>
          <span>{currentModel?.shortLabel}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.value}
            onClick={() => onChange(model.value)}
            className={value === model.value ? "bg-secondary" : ""}
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-lg">{model.icon}</span>
              <div className="flex flex-col">
                <span className="font-medium">{model.label}</span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
