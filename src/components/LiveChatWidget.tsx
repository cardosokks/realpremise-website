import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, MessageCircle, Phone, Sparkles, CheckCheck, User, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { fetchChatSession, sendClientMessage } from '../services/api';
import { ChatSession, ChatMessage } from '../types';

interface LiveChatWidgetProps {
  hidden?: boolean;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ hidden = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'whatsapp'>('chat');
  
  // Chat session state
  const [sessionId, setSessionId] = useState<string>(() => {
    return localStorage.getItem('realpremise_chat_session_id') || '';
  });
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = '556192035053';
  const formattedWhatsapp = '+55 (61) 9203-5053';

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Poll for messages in active session
  useEffect(() => {
    if (!sessionId || hidden) return;

    const loadSession = async () => {
      try {
        const session = await fetchChatSession(sessionId);
        setMessages(session.messages || []);
        
        // Count unread admin messages if widget is closed
        if (!isOpen) {
          const adminMsgs = session.messages.filter(m => m.sender === 'admin');
          setUnreadCount(adminMsgs.length);
        }
      } catch (err) {
        // Session not found or error
      }
    };

    loadSession();
    const interval = setInterval(loadSession, 3500); // Poll every 3.5s
    return () => clearInterval(interval);
  }, [sessionId, isOpen, hidden]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setSending(true);
    try {
      const payloadName = clientName.trim() || 'Visitante';
      
      if (clientName) localStorage.setItem('realpremise_client_name', clientName);
      if (clientPhone) localStorage.setItem('realpremise_client_phone', clientPhone);
      if (clientEmail) localStorage.setItem('realpremise_client_email', clientEmail);

      const res = await sendClientMessage({
        sessionId: sessionId || undefined,
        clientName: payloadName,
        clientPhone,
        clientEmail,
        text: inputText
      });

      if (!sessionId && res.session.id) {
        setSessionId(res.session.id);
        localStorage.setItem('realpremise_chat_session_id', res.session.id);
      }

      setMessages(res.session.messages || []);
      setInputText('');
    } catch (err: any) {
      alert(err.message || 'Erro ao enviar mensagem.');
    } finally {
      setSending(false);
    }
  };

  const handleOpenWhatsapp = () => {
    const text = encodeURIComponent('Olá! Gostaria de falar sobre um projeto de sistema web com a REALPREMISE.');
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  // If explicitly hidden by parent (e.g. Admin Panel open), suppress completely
  if (hidden) return null;

  return (
    <aside 
      aria-label="Atendimento Online e Suporte"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 font-sans select-none"
    >
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded="false"
          aria-label="Abrir chat de atendimento online"
          className="relative group flex items-center gap-2.5 sm:gap-3 p-3 sm:px-4 sm:py-3.5 bg-[#1a1318] hover:bg-[#241b20] text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#d4789a]/20 border border-white/10 hover:border-[#d4789a]/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4789a]/50"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-5 h-5 sm:w-5 sm:h-5 text-[#e8b0c4] group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#f0c870] rounded-full ring-2 ring-[#0f0d0e] animate-pulse" />
          </div>

          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="text-[11px] font-bold font-display tracking-tight text-white leading-tight">
              Atendimento Online
            </span>
            <span className="text-[9px] text-[#f0c870] font-medium leading-none flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#f0c870]" />
              Equipe disponível
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 text-[10px] font-black bg-rose-500 text-white rounded-full shadow-lg ring-2 ring-white dark:ring-slate-900 animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Floating Chat Box */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="Janela de Atendimento Online"
          className="w-[calc(100vw-2.5rem)] sm:w-[380px] max-w-[400px] h-[520px] max-h-[calc(100vh-6rem)] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 p-4 text-white flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 rounded-xl bg-brand-600 border border-brand-400/30 flex items-center justify-center font-bold text-xs shadow-md shrink-0">
                <Sparkles className="w-5 h-5 text-brand-200" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-primary-400 rounded-full ring-2 ring-slate-900" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold font-display text-sm leading-tight text-white truncate">
                  REALPREMISE Live
                </h3>
                <p className="text-[10px] text-brand-primary-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary-400 animate-pulse" />
                  <span>Equipe pronta para atender</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar janela de chat"
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contact Mode Selector Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Direto</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('whatsapp')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-brand-primary-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-brand-primary-600'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* TAB 1: INTERACTIVE LIVE CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
              
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                {messages.length === 0 ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 font-semibold">
                      Olá! Como podemos ajudar no seu projeto web?
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                      Preencha seus dados rápidos abaixo ou envie uma mensagem direta para a nossa equipe.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isAdmin = msg.sender === 'admin';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 px-1">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            {isAdmin ? 'Engenharia REALPREMISE' : msg.senderName}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">
                            {msg.createdAt}
                          </span>
                        </div>

                        <div
                          className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                            isAdmin
                              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-tl-xs shadow-2xs'
                              : 'bg-brand-600 text-white rounded-tr-xs shadow-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input & Visitor Identity Bar */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Identificação</span>
                  {sessionId && (
                    <button
                      type="button"
                      onClick={() => {
                        setSessionId('');
                        localStorage.removeItem('realpremise_chat_session_id');
                        setMessages([]);
                      }}
                      className="text-[10px] text-brand-600 hover:text-brand-800 font-semibold"
                    >
                      Nova conversa
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 pb-1">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={clientName || ''}
                    onChange={(e) => setClientName(e.target.value)}
                    className="px-2.5 py-1.5 text-[11px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-brand-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp ou E-mail"
                    value={clientPhone || clientEmail || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.includes('@')) {
                        setClientEmail(val);
                        setClientPhone('');
                      } else {
                        setClientPhone(val);
                        setClientEmail('');
                      }
                    }}
                    className="px-2.5 py-1.5 text-[11px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={sending || !inputText.trim()}
                    aria-label="Enviar mensagem"
                    className="p-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 2: DIRECT WHATSAPP */}
          {activeTab === 'whatsapp' && (
            <div className="flex-1 p-6 flex flex-col items-center justify-between text-center bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
              <div className="space-y-3 pt-2">
                <div className="w-16 h-16 rounded-3xl bg-brand-primary-100 dark:bg-brand-primary-950/80 border border-brand-primary-300 dark:border-brand-primary-800 text-brand-primary-600 dark:text-brand-primary-400 flex items-center justify-center mx-auto shadow-md">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    Fale Direto no WhatsApp
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    {formattedWhatsapp}
                  </p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
                  Para orçamentos ágeis, dúvidas técnicas ou contratação de projetos com resposta prioritária.
                </p>
              </div>

              <div className="w-full space-y-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsapp}
                  className="w-full py-3 px-4 bg-brand-primary-600 hover:bg-brand-primary-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-brand-primary-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Iniciar Conversa no WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-slate-400">
                  Atendimento de Segunda a Sexta, das 09h às 19h
                </p>
              </div>
            </div>
          )}

        </div>
      )}

    </aside>
  );
};
