import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ChatSidebar } from "@/components/ChatSidebar";
import { CompactModelSelector } from "@/components/CompactModelSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/useChat";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  
  const [model, setModel] = useState("google/gemini-2.5-flash");
  const [systemPrompt] = useState(
    "You are a helpful, friendly, and knowledgeable AI assistant. Provide clear, accurate, and engaging responses."
  );

  const { messages, isLoading, sendMessage, clearMessages } = useChat({
    model,
    systemPrompt,
  });

  const handleNewChat = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      timestamp: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
    clearMessages();
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    clearMessages();
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
      clearMessages();
    }
  };

  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  const handleSendMessage = (content: string) => {
    // Auto-create conversation if none exists
    if (!currentConversationId) {
      handleNewChat();
    }
    
    // Update conversation title with first message
    if (messages.length === 0 && currentConversationId) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentConversationId
            ? { ...c, title: content.slice(0, 30) + (content.length > 30 ? "..." : "") }
            : c
        )
      );
    }
    
    sendMessage(content);
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
      />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border px-6 py-3 flex items-center justify-between bg-card/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(var(--ai-gradient-start))] to-[hsl(var(--ai-gradient-end))] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[hsl(var(--ai-gradient-start))] to-[hsl(var(--ai-gradient-end))] bg-clip-text text-transparent">
                AI Chat
              </h1>
            </div>
            <div className="h-6 w-px bg-border" />
            <CompactModelSelector value={model} onChange={setModel} />
          </div>
          <ThemeToggle />
        </header>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4 max-w-2xl">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[hsl(var(--ai-gradient-start))] to-[hsl(var(--ai-gradient-end))] flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Welcome to AI Chat</h2>
                <p className="text-muted-foreground text-lg">
                  Start a conversation with advanced AI models. Ask questions, get help, or just chat!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[
                    "Explain quantum computing",
                    "Write a Python script",
                    "Plan a trip to Japan",
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(suggestion)}
                      className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-left"
                    >
                      <p className="text-sm">{suggestion}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <ChatMessage 
                  key={index} 
                  role={message.role} 
                  content={message.content}
                  model={model}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-6 bg-card/50 backdrop-blur">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
