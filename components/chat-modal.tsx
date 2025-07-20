"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles } from "lucide-react"
import type {
  ChatMessage,
  ChatModalProps,
  StreamedResponseEvent,
} from "@/type";

export function ChatModal({
  isOpen,
  onClose,
  onMatchesUpdate,
}: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Assalam-o-Alaikum! I am your Rishta Auntie. Tell me what kind of partner you are looking for, and I will help you find the perfect match!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    messages.push(userMessage);
    setMessages([...messages]);

    setInput("");
    setIsLoading(true);
    setCurrentResponse("");

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      const pythonApiUrl =
        process.env.PYTHON_API_URL || "http://localhost:8000";

      const response = await fetch(`${pythonApiUrl}/auntie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: messages
            .map((msg) => ({ role: msg.role, content: msg.content }))
            .filter((msg) => msg.role !== "system"),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      let accumulatedResponse = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);

        buffer += chunk;
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const chunk of lines) {
          const event: StreamedResponseEvent = JSON.parse(chunk);
          if (event?.type == "raw_response_event" && event.delta) {
            accumulatedResponse += event.delta;
            setCurrentResponse(accumulatedResponse);
          } else if (
            event?.type === "tool_call_output_item" &&
            event.tool_result
          ) {
            if (Array.isArray(event.tool_result)) {
              onMatchesUpdate(event.tool_result);

              const systemMessage: ChatMessage = {
                id: `system-${Date.now()}`,
                role: "system",
                content: "Matches updated based on your preferences!",
                timestamp: new Date(),
              };
              messages.push(systemMessage);
              setMessages([...messages]);
            }
          }
        }
      }

      // Add the complete assistant response
      if (accumulatedResponse) {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: accumulatedResponse,
          timestamp: new Date(),
        };
        messages.push(assistantMessage);
        setMessages([...messages]);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request was aborted");
        return;
      }

      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      messages.push(errorMessage);
      setMessages([...messages]);
    } finally {
      setIsLoading(false);
      setCurrentResponse("");
      abortControllerRef.current = null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-screen sm:h-[500px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>Rishta Auntie</span>
            <Sparkles className="h-4 w-4" />
          </DialogTitle>
        </DialogHeader>

        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.role === "user"
                      ? "bg-pink-600 text-white"
                      : message.role === "system"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === "assistant" && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.role === "user" && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.role === "system" && (
                      <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.role === "user"
                            ? "text-pink-200"
                            : message.role === "system"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Show current streaming response */}
            {currentResponse && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-100 text-gray-900">
                  <div className="flex items-start space-x-2">
                    <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">
                        {currentResponse}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isLoading && !currentResponse && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-100 text-gray-900">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Rishta Auntie about your preferences..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-pink-600 hover:bg-pink-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
