'use client';

// Floating chatbot widget — port of github.com/RealComba/Chatbot-AI restyled
// to Diamond Wrapp tokens (hot-pink primary + gold accents + house fonts).
// Two motion details specific to this widget, on top of the brand vocabulary:
//   1. 3-dot "typing" indicator while the n8n webhook request is in flight
//   2. Letter-by-letter reveal of the bot reply once it arrives, instead of
//      a single append (feels conversational rather than transactional).
// Both honor prefers-reduced-motion via framer-motion's useReducedMotion.

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChatCircleDots, X, ArrowUp } from '@phosphor-icons/react';

import { ease, duration } from '@/lib/motion';

const WEBHOOK_URL = 'https://grybroker.app.n8n.cloud/webhook/05a44f4b-0d94-4fde-a18c-0a9044c1ffa7';
const TYPING_SPEED_MS = 22; // ~45 chars/sec — fast but visible

type Message = { id: number; sender: 'user' | 'bot'; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      sender: 'bot',
      text: 'Ciao, sono Diamond Wrapp. Dimmi pure — qui per aiutarti col wrapping della tua auto.',
    },
  ]);
  const [waiting, setWaiting] = useState(false);
  const [pending, setPending] = useState<{ id: number; full: string; shown: number } | null>(
    null,
  );

  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reduced = useReducedMotion();

  // Focus input shortly after open (after entrance animation settles).
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 280);
    return () => clearTimeout(t);
  }, [open]);

  // Esc closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Auto-scroll on any content change.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, waiting, pending?.shown]);

  // Letter-by-letter reveal of the bot reply.
  useEffect(() => {
    if (!pending) return;

    if (reduced) {
      // Skip animation entirely under reduced-motion.
      setMessages((m) => [...m, { id: idRef.current++, sender: 'bot', text: pending.full }]);
      setPending(null);
      return;
    }

    if (pending.shown >= pending.full.length) {
      setMessages((m) => [...m, { id: idRef.current++, sender: 'bot', text: pending.full }]);
      setPending(null);
      return;
    }

    const t = setTimeout(() => {
      setPending((p) => (p ? { ...p, shown: p.shown + 1 } : p));
    }, TYPING_SPEED_MS);
    return () => clearTimeout(t);
  }, [pending, reduced]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || waiting) return;

    setMessages((m) => [...m, { id: idRef.current++, sender: 'user', text }]);
    setInput('');
    setWaiting(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const ct = res.headers.get('content-type') || '';
      let reply: string;
      if (ct.includes('application/json')) {
        const data = await res.json();
        reply =
          data.reply ?? data.output ?? data.message ?? data.text ?? JSON.stringify(data);
      } else {
        reply = await res.text();
      }

      setWaiting(false);
      setPending({ id: idRef.current, full: String(reply), shown: 0 });
    } catch (err) {
      console.error('Errore chatbot:', err);
      setWaiting(false);
      setPending({
        id: idRef.current,
        full: 'Qualcosa è andato storto. Riprova fra poco.',
        shown: 0,
      });
    }
  }, [input, waiting]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Chat con Diamond Wrapp"
            className="fixed bottom-24 right-4 md:right-6 w-[min(92vw,400px)] h-[min(78vh,620px)]"
            style={{ transformOrigin: 'bottom right', zIndex: 500 }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: duration.state, ease: ease.house }}
          >
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-deep shadow-deep">
              {/* Hot-pink hairline at the top — anchors the panel to the brand */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(to right, transparent 0%, var(--color-action-primary) 50%, transparent 100%)',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, var(--color-accent-pink-glow), transparent 70%)',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, var(--color-secondary-purple-tint), transparent 70%)',
                }}
              />

              <header className="relative flex items-center gap-3 px-5 py-4 border-b border-border-subtle">
                <div
                  className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-on"
                  style={{
                    boxShadow:
                      'inset 0 0 0 2px var(--color-text-display), 0 8px 24px rgba(230,59,124,0.32)',
                  }}
                >
                  <span className="font-display font-bold text-[18px] leading-none">DW</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full"
                    style={{
                      background: 'var(--color-status-success)',
                      boxShadow: '0 0 0 2px var(--color-background-deep)',
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold uppercase tracking-display-s text-text-display text-[20px] leading-none">
                    Diamond Wrapp
                  </div>
                  <div className="caption-mono mt-1 text-text-muted text-[10px] leading-none">
                    ONLINE
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Chiudi chat"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-sm border border-border-emphasis text-text-default hover:text-primary hover:border-primary transition-colors duration-state ease-state"
                >
                  <X size={16} weight="bold" />
                </button>
              </header>

              <div
                ref={scrollRef}
                className="chat-scroll relative flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3"
              >
                {messages.map((m) => (
                  <MessageBubble key={m.id} sender={m.sender} text={m.text} animateIn />
                ))}
                {pending && (
                  <MessageBubble
                    key={`pending-${pending.id}`}
                    sender="bot"
                    text={pending.full.slice(0, pending.shown)}
                    caret
                    animateIn
                  />
                )}
                {waiting && <TypingIndicator />}
              </div>

              <div className="relative px-4 pb-4 pt-3 border-t border-border-subtle">
                <div className="flex items-center gap-1 rounded-md border border-border-subtle bg-bg-raised focus-within:border-primary transition-colors duration-state ease-state pl-3 pr-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Scrivi qualcosa…"
                    aria-label="Messaggio"
                    className="flex-1 min-w-0 bg-transparent text-body text-text-default placeholder:text-text-subtle outline-none py-2 px-0"
                  />
                  <button
                    type="button"
                    onClick={send}
                    disabled={!input.trim() || waiting}
                    aria-label="Invia messaggio"
                    className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-sm bg-transparent text-primary hover:text-primary-hover transition-colors duration-state ease-state disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:text-primary"
                  >
                    <ArrowUp size={18} weight="regular" />
                  </button>
                </div>
                <p className="mt-2 px-1 caption-mono text-text-subtle text-[8px]">
                  PREMI <span className="text-text-muted">INVIO</span> PER INVIARE
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Chiudi chat' : 'Apri chat'}
        aria-expanded={open}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-14 w-14 inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-primary-on transition-all duration-state ease-state hover:scale-105 active:scale-95"
        style={{
          boxShadow:
            'inset 0 0 0 2px var(--color-text-display), 0 12px 32px rgba(230,59,124,0.45)',
          zIndex: 500,
        }}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-state ease-house ${
            open ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <ChatCircleDots size={24} weight="bold" />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-state ease-house ${
            open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
          }`}
        >
          <X size={22} weight="bold" />
        </span>
      </button>
    </>
  );
}

function MessageBubble({
  sender,
  text,
  caret,
  animateIn,
}: {
  sender: 'user' | 'bot';
  text: string;
  caret?: boolean;
  animateIn?: boolean;
}) {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${animateIn ? 'chat-msg-in' : ''}`}>
      <div
        className={`max-w-[82%] px-4 py-2.5 text-[14px] leading-pullquote break-words ${
          isUser
            ? 'bg-primary text-primary-on rounded-md rounded-br-sm'
            : 'bg-bg-raised text-text-default border border-border-subtle rounded-md rounded-bl-sm'
        }`}
        style={isUser ? { boxShadow: '0 8px 24px rgba(230,59,124,0.28)' } : undefined}
      >
        {text}
        {caret && <span aria-hidden className="chat-caret" />}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start chat-msg-in" aria-label="Vela sta scrivendo">
      <div className="bg-bg-raised border border-border-subtle rounded-md rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="chat-typing-dot" />
          <span className="chat-typing-dot" style={{ animationDelay: '0.15s' }} />
          <span className="chat-typing-dot" style={{ animationDelay: '0.30s' }} />
        </div>
      </div>
    </div>
  );
}
