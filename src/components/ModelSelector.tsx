import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const models = [
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", description: "Balanced & fast" },
  { value: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro", description: "Most capable" },
  { value: "google/gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite", description: "Fastest & cheapest" },
  { value: "openai/gpt-5", label: "GPT-5", description: "OpenAI flagship" },
  { value: "openai/gpt-5-mini", label: "GPT-5 Mini", description: "Cost-effective" },
  { value: "openai/gpt-5-nano", label: "GPT-5 Nano", description: "Speed optimized" },
];

export const ModelSelector = ({ value, onChange }: ModelSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-secondary border-border">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.value} value={model.value}>
            <div className="flex flex-col">
              <span className="font-medium">{model.label}</span>
              <span className="text-xs text-muted-foreground">{model.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
