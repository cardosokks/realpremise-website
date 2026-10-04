import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, Key, ArrowRight, AlertCircle } from 'lucide-react';
import { login } from '../services/api';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await login(email, password);
      onLoginSuccess(res.user);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Usuário/E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f0d0e]/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="relative w-full max-w-md bg-[#1a1318] border border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-[#f5eff2] space-y-6"
      >
        
        {/* Top close */}
        <button
          onClick={onClose}
          aria-label="Fechar janela de login"
          className="absolute top-4 right-4 p-2.5 text-[#b89aa8] hover:text-white rounded-xl hover:bg-[#241b20] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#241b20] border border-[#d4789a]/35 text-[#e8b0c4] flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 id="login-modal-title" className="text-2xl font-bold font-display tracking-tight text-white">
            Painel Administrativo
          </h2>
          <p className="text-xs sm:text-sm text-[#b89aa8]">
            Digite suas credenciais de acesso para gerenciar o ecossistema.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-200 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#b89aa8] mb-1.5">
              Usuário ou E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6070] pointer-events-none" />
              <input
                type="text"
                required
                placeholder="admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#0f0d0e] border border-white/10 rounded-xl text-white placeholder-[#7a6070] focus:outline-hidden focus:ring-2 focus:ring-[#d4789a] min-h-[46px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#b89aa8] mb-1.5">
              Senha de Acesso
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6070] pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#0f0d0e] border border-white/10 rounded-xl text-white placeholder-[#7a6070] focus:outline-hidden focus:ring-2 focus:ring-[#d4789a] min-h-[46px]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 text-sm font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] hover:brightness-110 rounded-xl transition-all shadow-lg shadow-[#d4789a]/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[48px]"
          >
            <span>{loading ? 'Autenticando...' : 'Entrar no Gerenciador'}</span>
            <ArrowRight className="w-4 h-4 text-[#0f0d0e]" />
          </button>
        </form>

      </div>

    </div>
  );
};
