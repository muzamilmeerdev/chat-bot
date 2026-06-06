import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, Github, Globe, Code2, Zap, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const FLASK_API_URL =
  import.meta.env.DEV
    ? "http://localhost:5000/chat"
    : "https://chat-bot-3-9qyc.onrender.com/chat";

// Keywords that mean "who made you / who created you" in many languages
const CREATOR_KEYWORDS = [
  "who made you", "who created you", "who built you", "who developed you",
  "who is your creator", "who is your developer", "who is your maker",
  "tumhe kisne banaya", "kisne banaya", "aapko kisne banaya",
  "tumhari creator", "kaun banaya", "kia bnaya", "kis na banaya",
  "مَن صنعك", "من أنشأك", "wer hat dich gemacht", "qui t'a créé",
  "quien te hizo", "chi ti ha creato", "кто тебя создал",
  "あなたを作ったのは", "谁制作了你", "누가 만들었어",
  "apko kisne", "aapko kisne", "bnaya", "banaya", "creator", "developer who",
  "who is your owner", "your owner", "your maker", "your author",
];

function isCreatorQuestion(message: string): boolean {
  const lower = message.toLowerCase();
  return CREATOR_KEYWORDS.some((kw) => lower.includes(kw));
}

const CREATOR_ANSWER =
  "Mujhe **Muzamil Ahmad Mir** ne banaya hai! 🎉\n\nHe is a talented Python & AI developer who built me using Flask, Groq API, and the Llama 3.1 model. If you want to know more about him, check out his profile on the left! 😊";

const MOCK_RESPONSES = [
  "That's a great question! Based on my knowledge, I can provide you with detailed information on that topic. Feel free to ask more!",
  "I understand what you're asking. Here's a comprehensive answer to help you better understand the concept.",
  "Interesting! I'd be happy to elaborate further. Feel free to ask any follow-up questions.",
  "Great question! I'm here to assist you. Is there anything specific you'd like to know more about?",
];

async function sendMessage(message: string): Promise<string> {
  // Always answer creator questions locally regardless of backend
  if (isCreatorQuestion(message)) {
    await new Promise((r) => setTimeout(r, 600));
    return CREATOR_ANSWER;
  }
  try {
    const response = await fetch(FLASK_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    return data.reply;
  } catch {
    // Mock response when Flask backend is not running
    await new Promise((r) => setTimeout(r, 1200));
    return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
  }
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-violet-400"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function renderContent(text: string) {
  // Simple bold (**text**) and newline rendering
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
          isUser
            ? "bg-gradient-to-br from-violet-500 to-purple-600"
            : "bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-violet-300" />
        )}
      </div>
      <div className={`max-w-[72%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-tr-sm"
              : "bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-sm"
          }`}
        >
          {renderContent(message.content)}
        </div>
        <span className="text-xs text-slate-500 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Assalam o Alaikum! I'm your AI assistant powered by **Muzamil Ahmad Mir** 🚀\nAsk me anything — I'm here to help!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDark] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const reply = await sendMessage(trimmed);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: reply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = ["What can you do?", "Tell me a fun fact", "Explain AI in simple terms", "Write a Python hello world"];

  return (
    <div className={`${isDark ? "dark" : ""} flex size-full bg-slate-950 text-slate-100 overflow-hidden`}>
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Dev Profile */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm leading-tight">Muzamil Ahmad Mir</h2>
              <p className="text-violet-400 text-xs mt-0.5">AI & Python Developer</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Code2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Python · Flask · AI/ML</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Groq API · Llama 3.1</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Stack Developer</span>
            </div>
          </div>
      <div className="flex gap-2 mt-4">
  <button
    onClick={() => window.open("https://github.com/muzamilmeerdev", "_blank")}
    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all duration-200"
  >
    <Github className="w-3 h-3" />
    GitHub
  </button>

  <button
    onClick={() => window.open("https://www.linkedin.com/in/Muzamil-Ahmad-Mir", "_blank")}
    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all duration-200"
  >
    <Globe className="w-3 h-3" />
    LinkedIn
  </button>

  <button
    onClick={() => window.open("https://chat-bot-six-lyart.vercel.app", "_blank")}
    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all duration-200"
  >
    <Globe className="w-3 h-3" />
    Portfolio
  </button>
</div>
        </div>
        {/* Tech Stack */}
        <div className="p-5 border-b border-slate-800">
          <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">Powered By</p>
          <div className="space-y-2.5">
            {[
              { label: "Model", value: "Llama 3.1-8B", color: "text-violet-400" },
              { label: "API", value: "Groq Cloud", color: "text-emerald-400" },
              { label: "Backend", value: "Flask (Python)", color: "text-amber-400" },
              { label: "Frontend", value: "React + Tailwind", color: "text-sky-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">{item.label}</span>
                <span className={`text-xs font-medium ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="p-5 mt-auto">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">AI is Online</span>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm">MuzamilBot</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-xs">Always ready to help</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-slate-400 text-xs">Llama 3.1 · Groq</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex gap-3"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 shadow-md flex-shrink-0">
                  <Bot className="w-4 h-4 text-violet-300" />
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm shadow-sm">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-violet-500/50 px-3 py-1.5 rounded-full transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-6 pb-5 pt-2">
          <div className="flex items-end gap-3 bg-slate-800 border border-slate-700 focus-within:border-violet-500/60 rounded-2xl px-4 py-3 transition-all duration-200 shadow-lg">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Enter to send, Shift+Enter for newline)"
              rows={1}
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 resize-none outline-none text-sm leading-relaxed min-h-[24px] max-h-[120px] overflow-y-auto"
              style={{ fieldSizing: "content" } as React.CSSProperties}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
          <p className="text-slate-600 text-xs text-center mt-2">
            Built by <span className="text-violet-400">Muzamil Ahmad Mir</span> · Powered by Groq & Llama 3.1
          </p>
        </div>
      </div>
    </div>
  );
}
