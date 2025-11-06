import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ModelSelector } from "./ModelSelector";

interface SettingsPanelProps {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  onModelChange: (model: string) => void;
  onTemperatureChange: (temp: number) => void;
  onMaxTokensChange: (tokens: number) => void;
  onSystemPromptChange: (prompt: string) => void;
}

export const SettingsPanel = ({
  model,
  temperature,
  maxTokens,
  systemPrompt,
  onModelChange,
  onTemperatureChange,
  onMaxTokensChange,
  onSystemPromptChange,
}: SettingsPanelProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="border-border hover:bg-secondary">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>AI Settings</DialogTitle>
          <DialogDescription>
            Customize your AI assistant's behavior
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Model</Label>
            <ModelSelector value={model} onChange={onModelChange} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Temperature: {temperature.toFixed(1)}</Label>
              <span className="text-xs text-muted-foreground">
                {temperature < 0.3 ? "Precise" : temperature < 0.7 ? "Balanced" : "Creative"}
              </span>
            </div>
            <Slider
              value={[temperature]}
              onValueChange={(v) => onTemperatureChange(v[0])}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Max Tokens: {maxTokens}</Label>
              <span className="text-xs text-muted-foreground">Response length</span>
            </div>
            <Slider
              value={[maxTokens]}
              onValueChange={(v) => onMaxTokensChange(v[0])}
              min={256}
              max={4096}
              step={256}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>System Prompt</Label>
            <Textarea
              value={systemPrompt}
              onChange={(e) => onSystemPromptChange(e.target.value)}
              placeholder="You are a helpful AI assistant..."
              className="min-h-[100px] bg-input border-border"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
