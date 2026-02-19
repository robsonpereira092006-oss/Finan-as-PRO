
import React, { useState, useRef, useEffect } from 'react';
import { getFinancialAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá Alex! Eu sou seu assistente financeiro pessoal. Como posso te ajudar a alcançar seus objetivos hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mockFinancialContext = "Saldo total: R$ 12.450,00. Renda mensal: R$ 5.000,00. Despesas: R$ 3.200,00. Dívidas ativas: R$ 12.450,00 em 3 instituições (Chase, João Silva, Toyota). Divisão de gastos: Alimentação (75% do orçamento de R$ 1k), Aluguel (100% do orçamento de R$ 1.8k), Lazer (30% do orçamento de R$ 500).";

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const advice = await getFinancialAdvice(input, mockFinancialContext);
      if (advice) {
        setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, encontrei um erro. Por favor, tente novamente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 sticky top-0 bg-white dark:bg-slate-900 z-10">
        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
          <span className="material-symbols-outlined">smart_toy</span>
        </div>
        <div>
          <h2 className="font-bold text-sm">Finanza IA Assistente</h2>
          <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                m.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte qualquer coisa sobre suas finanças..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-primary transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-primary/30"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
