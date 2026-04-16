"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, RefreshCw, ArrowDown, Briefcase, Code, Palette, Building, Mail, GraduationCap } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  cards?: CardData[];
}

interface CardData {
  type: string;
  title: string;
  [key: string]: any;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

const suggestedQuestions = [
  "Tell me about yourself",
  "Show me your experience",
  "What projects have you worked on?",
  "What skills do you have?",
  "What ventures do you run?",
  "How can I contact you?",
];

// Card Components
function ExperienceCard({ data }: { data: CardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-lg">{data.title}</h4>
          <p className="text-indigo-400 text-sm font-medium">{data.role}</p>
          <div className="flex items-center gap-3 mt-2 text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {data.period}
            </span>
            <span>{data.location}</span>
          </div>
        </div>
      </div>
      {data.highlights && data.highlights.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <ul className="space-y-2">
            {data.highlights.slice(0, 3).map((h: string, i: number) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function ProjectCard({ data }: { data: CardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
          <Code className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-lg">{data.title}</h4>
          <p className="text-slate-400 text-sm mt-1 line-clamp-2">{data.description}</p>
        </div>
      </div>
      {data.tags && data.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.tags.map((tag: string, i: number) => (
            <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SkillsCard({ data }: { data: CardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
          <Palette className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-lg">{data.title}</h4>
        </div>
      </div>
      {data.items && data.items.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.items.map((item: string, i: number) => (
            <span key={i} className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
              {item}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function VentureCard({ data }: { data: CardData }) {
  const statusColors: Record<string, string> = {
    'Active': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'In Development': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
          <Building className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-semibold text-lg">{data.title}</h4>
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[data.status] || 'bg-slate-700/50 text-slate-400 border-slate-600/50'}`}>
              {data.status}
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">{data.description}</p>
          {data.type2 && (
            <p className="text-indigo-400 text-xs mt-2">{data.type2}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ContactCard({ data }: { data: CardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-lg">Get in Touch</h4>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {data.phone && (
          <a href={`tel:${data.phone}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
            <span className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">📱</span>
            {data.phone}
          </a>
        )}
        {data.email && (
          <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
            <span className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">✉️</span>
            {data.email}
          </a>
        )}
        {data.linkedin && (
          <a href={`https://${data.linkedin}`} target="_blank" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
            <span className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">💼</span>
            LinkedIn
          </a>
        )}
        {data.dribbble && (
          <a href={`https://dribbble.com/${data.dribbble}`} target="_blank" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
            <span className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">🎨</span>
            Dribbble
          </a>
        )}
      </div>
    </motion.div>
  );
}

function EducationCard({ data }: { data: CardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-lg">Education</h4>
        </div>
      </div>
      {data.institutions && (
        <div className="mt-4 space-y-3">
          {data.institutions.map((inst: any, i: number) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <div>
                <p className="text-white font-medium">{inst.name}</p>
                <p className="text-slate-400 text-sm">{inst.degree}</p>
              </div>
              <div className="text-right">
                <p className="text-indigo-400 text-sm">{inst.percentage}</p>
                <p className="text-slate-500 text-xs">{inst.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CardRenderer({ cards }: { cards: CardData[] }) {
  return (
    <div className="grid gap-4 mt-4">
      {cards.map((card, i) => {
        switch (card.type) {
          case 'experience':
            return <ExperienceCard key={i} data={card} />;
          case 'project':
            return <ProjectCard key={i} data={card} />;
          case 'skills':
            return <SkillsCard key={i} data={card} />;
          case 'venture':
            return <VentureCard key={i} data={card} />;
          case 'contact':
            return <ContactCard key={i} data={card} />;
          case 'education':
            return <EducationCard key={i} data={card} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function ChatInterface() {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatState.messages, chatState.isLoading]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 300);
    };
    
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || chatState.isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));
    setInput("");
    inputRef.current?.focus();

    try {
      const history = chatState.messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        cards: data.cards || data.structured?.cards,
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Chat error:", error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setChatState({ messages: [], isLoading: false });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) {
    return (
      <div className="h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col text-white font-sans overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="px-8 py-5 border-b border-slate-800/50 flex items-center justify-between bg-slate-950/50 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Dhrumil
            </h1>
            <p className="text-xs text-emerald-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
              Online
            </p>
          </div>
        </div>
        
        {chatState.messages.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearChat}
            className="px-4 py-2.5 text-sm font-medium text-slate-400 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            New Chat
          </motion.button>
        )}
      </header>

      {/* Messages */}
      <main 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-8 py-6 relative"
      >
        <AnimatePresence>
          {chatState.messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center px-4"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-7 shadow-2xl shadow-indigo-500/30"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Hey, I'm Dhrumil
              </h2>
              <p className="text-slate-400 max-w-lg mb-8 leading-relaxed">
                I'm a 23-year-old Product Designer & AI Product Manager with 6+ years of experience. 
                Ask me anything about my work, projects, skills, or ventures!
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center max-w-lg">
                {suggestedQuestions.map((q, i) => (
                  <motion.button
                    key={q}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => sendMessage(q)}
                    className="px-5 py-3.5 text-sm font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-indigo-500/30 rounded-xl transition-all hover:-translate-y-0.5"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {chatState.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex gap-4 mb-6"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" 
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600" 
                      : "bg-slate-800/80 border border-slate-700/50"
                  }`}>
                    {message.role === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-indigo-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`p-5 rounded-2xl ${
                      message.role === "user" 
                        ? "bg-transparent" 
                        : "bg-slate-800/50 border border-slate-700/50"
                    }`}>
                      <p className="text-white leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      {message.cards && message.cards.length > 0 && (
                        <CardRenderer cards={message.cards} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {chatState.isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Input */}
      <footer className="px-8 py-5 bg-slate-950/50 backdrop-blur-xl relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 p-2 bg-slate-900/80 border border-slate-700/50 rounded-2xl focus-within:border-indigo-500/30 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Dhrumil..."
              rows={1}
              className="flex-1 bg-transparent text-white placeholder-slate-500 px-4 py-3 outline-none resize-none max-h-32"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || chatState.isLoading}
              className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>
          <p className="text-center text-slate-600 text-xs mt-3">
            AI-powered responses • Powered by portfolio knowledge
          </p>
        </div>
      </footer>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToBottom}
            className="fixed bottom-24 right-8 w-10 h-10 bg-slate-800/80 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all z-20"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
