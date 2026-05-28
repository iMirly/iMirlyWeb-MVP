import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ANUNCIOS, INITIAL_CONVERSATIONS, type Anuncio, type ChatMessage, type Conversation, type BudgetState } from "./data";

type User = { name: string; email: string };

type Transaction = { id: string; concepto: string; importe: number; fecha: string };

type State = {
  user: User | null;
  favorites: string[];
  anuncios: Anuncio[];
  conversations: Conversation[];
  saldo: number;
  pendiente: number;
  transacciones: Transaction[];
};

type Ctx = State & {
  login: (email: string, name?: string) => void;
  logout: () => void;
  toggleFavorite: (id: string) => void;
  sendMessage: (convId: string, text: string) => void;
  sendBudget: (convId: string, precio: number, horas: number, descripcion: string) => void;
  setBudgetState: (convId: string, msgId: string, state: BudgetState) => void;
  openConversationFromAnuncio: (anuncio: Anuncio) => string;
  publishAnuncio: (a: Omit<Anuncio, "id" | "rating" | "reviews" | "avatar" | "proveedor">) => void;
  recargar: (amount: number) => void;
};

const Context = createContext<Ctx | null>(null);

const STORAGE_KEY = "imirly:v1";

const initial: State = {
  user: null,
  favorites: [],
  anuncios: ANUNCIOS,
  conversations: INITIAL_CONVERSATIONS,
  saldo: 120.5,
  pendiente: 60,
  transacciones: [
    { id: "t1", concepto: "Recarga monedero", importe: 100, fecha: "12 may" },
    { id: "t2", concepto: "Pago a Marina López", importe: -45, fecha: "08 may" },
    { id: "t3", concepto: "Bono bienvenida iMirly", importe: 10, fecha: "01 may" },
  ],
};

export function ImirlyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        setState((s) => ({ ...s, ...parsed, anuncios: ANUNCIOS }));
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const { anuncios: _omit, ...persist } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {}
  }, [state, hydrated]);

  const ctx: Ctx = {
    ...state,
    login: (email, name) =>
      setState((s) => ({ ...s, user: { email, name: name ?? email.split("@")[0] } })),
    logout: () => setState((s) => ({ ...s, user: null })),
    toggleFavorite: (id) =>
      setState((s) => ({
        ...s,
        favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id],
      })),
    sendMessage: (convId, text) =>
      setState((s) => ({
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === convId
            ? {
                ...c,
                lastTime: "ahora",
                messages: [
                  ...c.messages,
                  { id: crypto.randomUUID(), type: "text", from: "me", text, time: "ahora" },
                ],
              }
            : c,
        ),
      })),
    sendBudget: (convId, precio, horas, descripcion) =>
      setState((s) => ({
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === convId
            ? {
                ...c,
                lastTime: "ahora",
                messages: [
                  ...c.messages,
                  { id: crypto.randomUUID(), type: "budget", from: "me", precio, horas, descripcion, state: "pendiente", time: "ahora" },
                ],
              }
            : c,
        ),
      })),
    setBudgetState: (convId, msgId, newState) =>
      setState((s) => ({
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === msgId && m.type === "budget" ? { ...m, state: newState } : m,
                ),
              }
            : c,
        ),
      })),
    openConversationFromAnuncio: (a) => {
      const existing = state.conversations.find((c) => c.anuncioId === a.id);
      if (existing) return existing.id;
      const id = "c" + crypto.randomUUID().slice(0, 6);
      setState((s) => ({
        ...s,
        conversations: [
          {
            id,
            anuncioId: a.id,
            proveedor: a.proveedor,
            avatar: a.avatar,
            titulo: a.titulo,
            lastTime: "ahora",
            unread: 0,
            messages: [
              { id: "m0", type: "text", from: "them", text: `¡Hola! Soy ${a.proveedor.split(" ")[0]}, ¿en qué puedo ayudarte?`, time: "ahora" },
            ],
          },
          ...s.conversations,
        ],
      }));
      return id;
    },
    publishAnuncio: (a) =>
      setState((s) => ({
        ...s,
        anuncios: [
          {
            ...a,
            id: "n" + crypto.randomUUID().slice(0, 6),
            rating: 0,
            reviews: 0,
            proveedor: s.user?.name ?? "Tú",
            avatar: ANUNCIOS[0].avatar,
          },
          ...s.anuncios,
        ],
      })),
    recargar: (amount) =>
      setState((s) => ({
        ...s,
        saldo: s.saldo + amount,
        transacciones: [
          { id: "t" + crypto.randomUUID().slice(0, 6), concepto: "Recarga monedero", importe: amount, fecha: "hoy" },
          ...s.transacciones,
        ],
      })),
  };

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}

export function useImirly() {
  const c = useContext(Context);
  if (!c) throw new Error("useImirly must be inside ImirlyProvider");
  return c;
}

export type { Conversation, ChatMessage };