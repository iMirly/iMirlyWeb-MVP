import { useMemo, useState } from "react";
import { useImirly } from "@/lib/imirly/store";
import { CATEGORIES, type Anuncio, type Subcategory } from "@/lib/imirly/data";
import logo from "@/assets/imirly/logo.webp";
import {
  Home as HomeIcon, Heart, PlusCircle, MessageCircle, User as UserIcon,
  Search, Star, MapPin, ChevronLeft, Bell, Send, ChevronRight,
  Wallet, Settings, LogOut, ShieldCheck, HelpCircle, Info, Mail, Plus, Sparkles,
} from "lucide-react";

type Tab = "home" | "fav" | "publish" | "messages" | "profile";
type Nav =
  | { kind: "tab"; tab: Tab }
  | { kind: "category"; id: string }
  | { kind: "list"; categoryId: string; sub: Subcategory }
  | { kind: "detail"; anuncioId: string }
  | { kind: "chat"; convId: string }
  | { kind: "saldo" };

export function MainApp({ onLogout }: { onLogout: () => void }) {
  const [stack, setStack] = useState<Nav[]>([{ kind: "tab", tab: "home" }]);
  const current = stack[stack.length - 1];
  const push = (n: Nav) => setStack((s) => [...s, n]);
  const pop = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const setTab = (tab: Tab) => setStack([{ kind: "tab", tab }]);

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {current.kind === "tab" && current.tab === "home" && <HomeTab onCategory={(id) => push({ kind: "category", id })} onOpenChat={(convId) => push({ kind: "chat", convId })} />}
        {current.kind === "tab" && current.tab === "fav" && <FavoritesTab onOpen={(id) => push({ kind: "detail", anuncioId: id })} />}
        {current.kind === "tab" && current.tab === "publish" && <PublishTab onDone={() => setTab("home")} />}
        {current.kind === "tab" && current.tab === "messages" && <MessagesTab onOpen={(convId) => push({ kind: "chat", convId })} />}
        {current.kind === "tab" && current.tab === "profile" && <ProfileTab onLogout={onLogout} onSaldo={() => push({ kind: "saldo" })} />}
        {current.kind === "category" && <SubcategoriesScreen categoryId={current.id} onBack={pop} onSub={(sub) => push({ kind: "list", categoryId: current.id, sub })} />}
        {current.kind === "list" && <AnunciosListScreen sub={current.sub} onBack={pop} onOpen={(id) => push({ kind: "detail", anuncioId: id })} />}
        {current.kind === "detail" && <AnuncioDetail id={current.anuncioId} onBack={pop} onChat={(convId) => push({ kind: "chat", convId })} />}
        {current.kind === "chat" && <ChatScreen convId={current.convId} onBack={pop} />}
        {current.kind === "saldo" && <SaldoScreen onBack={pop} />}
      </div>
      {current.kind === "tab" && <BottomNav tab={current.tab} onChange={setTab} />}
    </div>
  );
}

/* ----------------------- Bottom Nav ----------------------- */
function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const items: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Inicio", icon: <HomeIcon className="w-5 h-5" /> },
    { id: "fav", label: "Favoritos", icon: <Heart className="w-5 h-5" /> },
    { id: "publish", label: "Publicar", icon: <PlusCircle className="w-6 h-6" /> },
    { id: "messages", label: "Mensajes", icon: <MessageCircle className="w-5 h-5" /> },
    { id: "profile", label: "Perfil", icon: <UserIcon className="w-5 h-5" /> },
  ];
  return (
    <nav className="border-t border-border bg-background grid grid-cols-5 pt-2 pb-3 px-1">
      {items.map((it) => {
        const active = tab === it.id;
        return (
          <button key={it.id} onClick={() => onChange(it.id)} className="flex flex-col items-center gap-1 py-1 relative">
            <span className={`flex items-center justify-center w-12 h-7 rounded-full transition-colors ${active ? "bg-primary-soft text-primary" : "text-muted-foreground"}`}>
              {it.icon}
            </span>
            <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* ----------------------- Home ----------------------- */
function HomeTab({ onCategory, onOpenChat }: { onCategory: (id: string) => void; onOpenChat: (id: string) => void }) {
  const { user, anuncios, openConversationFromAnuncio } = useImirly();
  const [query, setQuery] = useState("");
  const trending = anuncios.slice(0, 6);
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return anuncios.filter((a) => a.titulo.toLowerCase().includes(q) || a.descripcion.toLowerCase().includes(q)).slice(0, 8);
  }, [query, anuncios]);

  return (
    <div>
      <header className="bg-brand-gradient text-primary-foreground px-5 pt-8 pb-10 rounded-b-[32px] shadow-brand">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80">Hola{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋</p>
            <h1 className="text-2xl font-extrabold">¿Qué necesitas hoy?</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </button>
        </div>
        <label className="mt-5 flex items-center gap-2 bg-white text-foreground rounded-2xl px-4 py-3 shadow-soft">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar fontanero, yoga, paseador..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </label>
      </header>

      {query && (
        <section className="px-5 pt-5">
          <h2 className="text-sm font-bold mb-2">Resultados</h2>
          <div className="space-y-2">
            {results.length === 0 && <p className="text-sm text-muted-foreground">Sin resultados.</p>}
            {results.map((a) => (
              <button key={a.id} onClick={() => onOpenChat(openConversationFromAnuncio(a))} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-muted">
                <img src={a.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold line-clamp-1">{a.titulo}</p>
                  <p className="text-xs text-muted-foreground">{a.proveedor} · {a.ciudad}</p>
                </div>
                <span className="text-sm font-bold text-primary">{a.precioHora}€/h</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">Categorías</h2>
          <Sparkles className="w-4 h-4 text-warning" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => onCategory(c.id)} className="relative h-28 rounded-2xl overflow-hidden shadow-soft active:scale-[0.98] transition">
              <img src={c.image} alt={c.nombre} className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <span className="absolute bottom-2 left-3 text-white font-bold text-base drop-shadow">{c.nombre}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6 pb-8">
        <h2 className="text-base font-bold mb-3">Tendencia esta semana</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
          {trending.map((a) => (
            <button key={a.id} onClick={() => onOpenChat(openConversationFromAnuncio(a))} className="min-w-[210px] max-w-[210px] bg-card rounded-2xl shadow-soft overflow-hidden text-left">
              <img src={a.image} alt="" className="w-full h-28 object-cover" />
              <div className="p-3 space-y-1">
                <p className="text-sm font-semibold line-clamp-1">{a.titulo}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 fill-warning text-warning" /> {a.rating} · {a.ciudad}
                </div>
                <p className="text-primary text-sm font-bold">{a.precioHora}€<span className="text-xs font-normal text-muted-foreground">/h</span></p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ----------------------- Subcategories ----------------------- */
function SubcategoriesScreen({ categoryId, onBack, onSub }: { categoryId: string; onBack: () => void; onSub: (s: Subcategory) => void }) {
  const category = CATEGORIES.find((c) => c.id === categoryId)!;
  return (
    <div>
      <ScreenHeader title={category.nombre} onBack={onBack} />
      <div className="grid grid-cols-2 gap-3 px-5 pb-8">
        {category.subcategorias.map((s) => (
          <button key={s.id} onClick={() => onSub(s)} className="relative h-32 rounded-2xl overflow-hidden shadow-soft active:scale-[0.98] transition">
            <img src={s.image} alt={s.nombre} className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-2 left-3 right-3 text-white font-semibold text-sm">{s.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------- Anuncios list ----------------------- */
function AnunciosListScreen({ sub, onBack, onOpen }: { sub: Subcategory; onBack: () => void; onOpen: (id: string) => void }) {
  const { anuncios, favorites, toggleFavorite } = useImirly();
  const list = anuncios.filter((a) => a.subcategoriaId === sub.id);
  return (
    <div>
      <ScreenHeader title={sub.nombre} onBack={onBack} />
      <div className="px-5 pb-8 space-y-3">
        {list.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No hay anuncios todavía en esta categoría.</div>
        )}
        {list.map((a) => (
          <article key={a.id} className="bg-card rounded-2xl shadow-soft overflow-hidden">
            <button onClick={() => onOpen(a.id)} className="block w-full text-left">
              <img src={a.image} alt="" className="w-full h-36 object-cover" />
            </button>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div onClick={() => onOpen(a.id)} className="cursor-pointer flex-1">
                  <h3 className="font-bold text-sm">{a.titulo}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {a.ciudad} · {a.proveedor}
                  </p>
                </div>
                <button onClick={() => toggleFavorite(a.id)} className="p-1">
                  <Heart className={`w-5 h-5 ${favorites.includes(a.id) ? "fill-heart text-heart" : "text-muted-foreground"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-warning text-warning" /> {a.rating} <span className="text-muted-foreground font-normal">({a.reviews})</span>
                </span>
                <span className="text-primary font-extrabold">{a.precioHora}€<span className="text-xs font-normal text-muted-foreground">/h</span></span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ----------------------- Anuncio detail ----------------------- */
function AnuncioDetail({ id, onBack, onChat }: { id: string; onBack: () => void; onChat: (convId: string) => void }) {
  const { anuncios, favorites, toggleFavorite, openConversationFromAnuncio } = useImirly();
  const a = anuncios.find((x) => x.id === id);
  if (!a) return null;
  return (
    <div className="pb-8">
      <div className="relative h-64">
        <img src={a.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <button onClick={onBack} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => toggleFavorite(a.id)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow">
          <Heart className={`w-5 h-5 ${favorites.includes(a.id) ? "fill-heart text-heart" : "text-foreground"}`} />
        </button>
      </div>
      <div className="px-5 -mt-6 relative">
        <div className="bg-card rounded-2xl p-5 shadow-soft space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-lg font-extrabold">{a.titulo}</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> {a.ciudad}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-primary">{a.precioHora}€</p>
              <p className="text-xs text-muted-foreground -mt-1">por hora</p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <img src={a.avatar} alt="" className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{a.proveedor}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Star className="w-3 h-3 fill-warning text-warning" /> {a.rating} · {a.reviews} reseñas
              </p>
            </div>
            <span className="text-xs bg-success/15 text-success font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verificado
            </span>
          </div>
        </div>
      </div>
      <div className="px-5 mt-5">
        <h2 className="text-sm font-bold mb-2">Descripción</h2>
        <p className="text-sm text-foreground/80 leading-relaxed">{a.descripcion}</p>
      </div>
      <div className="px-5 mt-6">
        <button
          onClick={() => onChat(openConversationFromAnuncio(a))}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-brand active:scale-[0.98] transition"
        >
          <MessageCircle className="w-5 h-5" /> Contactar y pedir presupuesto
        </button>
      </div>
    </div>
  );
}

/* ----------------------- Chat ----------------------- */
function ChatScreen({ convId, onBack }: { convId: string; onBack: () => void }) {
  const { conversations, sendMessage, sendBudget, setBudgetState } = useImirly();
  const conv = conversations.find((c) => c.id === convId);
  const [text, setText] = useState("");
  const [showBudget, setShowBudget] = useState(false);
  const [bPrecio, setBPrecio] = useState(50);
  const [bHoras, setBHoras] = useState(2);
  const [bDesc, setBDesc] = useState("");
  if (!conv) return null;

  return (
    <div className="flex flex-col h-full">
      <header className="px-4 py-3 border-b border-border flex items-center gap-3 bg-card">
        <button onClick={onBack} className="p-1"><ChevronLeft className="w-5 h-5" /></button>
        <img src={conv.avatar} alt="" className="w-10 h-10 rounded-full" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm line-clamp-1">{conv.proveedor}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{conv.titulo}</p>
        </div>
        <span className="text-[10px] font-semibold text-success bg-success/15 px-2 py-1 rounded-full">En línea</span>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-muted/40">
        {conv.messages.map((m) => {
          const mine = m.from === "me";
          if (m.type === "text") {
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-soft ${mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card text-foreground rounded-bl-sm"}`}>
                  {m.text}
                  <span className={`block text-[10px] mt-1 ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</span>
                </div>
              </div>
            );
          }
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl shadow-soft overflow-hidden border ${mine ? "border-primary/30" : "border-border"} bg-card`}>
                <div className="bg-brand-gradient text-primary-foreground px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide">Presupuesto</span>
                  <BudgetBadge state={m.state} />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-primary">{m.precio}€</span>
                    <span className="text-xs text-muted-foreground">total · {m.horas}h</span>
                  </div>
                  <p className="text-sm text-foreground/80">{m.descripcion}</p>
                  {!mine && m.state === "pendiente" && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setBudgetState(conv.id, m.id, "aceptado")}
                        className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
                      >
                        Aceptar y pagar
                      </button>
                      <button
                        onClick={() => setBudgetState(conv.id, m.id, "rechazado")}
                        className="flex-1 py-2 rounded-xl border border-destructive text-destructive text-sm font-semibold"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                  {m.state === "aceptado" && (
                    <button
                      onClick={() => setBudgetState(conv.id, m.id, "aprobado")}
                      className="w-full mt-2 py-2 rounded-xl bg-success text-white text-sm font-semibold"
                    >
                      Marcar trabajo aprobado y liberar pago
                    </button>
                  )}
                  <span className="block text-[10px] text-muted-foreground pt-1">{m.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showBudget && (
        <div className="border-t border-border bg-card p-4 space-y-3 animate-in slide-in-from-bottom">
          <p className="text-sm font-bold">Enviar presupuesto</p>
          <div className="grid grid-cols-2 gap-2">
            <NumberField label="Precio (€)" value={bPrecio} onChange={setBPrecio} />
            <NumberField label="Horas" value={bHoras} onChange={setBHoras} />
          </div>
          <textarea value={bDesc} onChange={(e) => setBDesc(e.target.value)} placeholder="Descripción del trabajo" className="w-full bg-muted rounded-xl px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-primary/40" rows={2} />
          <div className="flex gap-2">
            <button onClick={() => setShowBudget(false)} className="flex-1 py-2 rounded-xl border border-border text-sm">Cancelar</button>
            <button
              onClick={() => { sendBudget(conv.id, bPrecio, bHoras, bDesc || "Servicio acordado"); setShowBudget(false); setBDesc(""); }}
              className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-border bg-card p-3 flex items-end gap-2">
        <button onClick={() => setShowBudget((v) => !v)} className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center shrink-0">
          <Plus className="w-5 h-5" />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text.trim()) { sendMessage(conv.id, text.trim()); setText(""); }
          }}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          onClick={() => { if (text.trim()) { sendMessage(conv.id, text.trim()); setText(""); } }}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}

function BudgetBadge({ state }: { state: string }) {
  const map: Record<string, string> = {
    pendiente: "bg-warning/20 text-yellow-900",
    aceptado: "bg-white/20 text-white",
    rechazado: "bg-destructive/30 text-white",
    aprobado: "bg-success/30 text-white",
    finalizado: "bg-white/20 text-white",
  };
  return <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${map[state]}`}>{state}</span>;
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} className="w-full bg-muted rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 mt-0.5" />
    </label>
  );
}

/* ----------------------- Favorites ----------------------- */
function FavoritesTab({ onOpen }: { onOpen: (id: string) => void }) {
  const { favorites, anuncios, toggleFavorite } = useImirly();
  const items = anuncios.filter((a) => favorites.includes(a.id));
  return (
    <div>
      <TopBar title="Favoritos" />
      <div className="px-5 space-y-3 pb-8">
        {items.length === 0 && (
          <div className="text-center py-16 px-6">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">Marca anuncios con el corazón para guardarlos aquí.</p>
          </div>
        )}
        {items.map((a) => (
          <div key={a.id} className="flex gap-3 bg-card rounded-2xl shadow-soft p-3">
            <button onClick={() => onOpen(a.id)} className="shrink-0">
              <img src={a.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm line-clamp-1">{a.titulo}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{a.proveedor} · {a.ciudad}</p>
              <p className="text-primary font-bold text-sm mt-1">{a.precioHora}€/h</p>
            </div>
            <button onClick={() => toggleFavorite(a.id)} className="p-1 self-start">
              <Heart className="w-5 h-5 fill-heart text-heart" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------- Messages list ----------------------- */
function MessagesTab({ onOpen }: { onOpen: (id: string) => void }) {
  const { conversations } = useImirly();
  return (
    <div>
      <TopBar title="Mensajes" />
      <div className="divide-y divide-border">
        {conversations.map((c) => {
          const last = c.messages[c.messages.length - 1];
          const preview = last?.type === "text" ? last.text : last ? `💼 Presupuesto · ${last.precio}€` : "";
          return (
            <button key={c.id} onClick={() => onOpen(c.id)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted text-left">
              <img src={c.avatar} alt="" className="w-12 h-12 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm line-clamp-1">{c.proveedor}</p>
                  <span className="text-[11px] text-muted-foreground">{c.lastTime}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{preview}</p>
              </div>
              {c.unread > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{c.unread}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------- Publish ----------------------- */
function PublishTab({ onDone }: { onDone: () => void }) {
  const { publishAnuncio } = useImirly();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(20);
  const [ciudad, setCiudad] = useState("Madrid");
  const [catId, setCatId] = useState(CATEGORIES[0].id);
  const cat = CATEGORIES.find((c) => c.id === catId)!;
  const [subId, setSubId] = useState(cat.subcategorias[0].id);
  const sub = cat.subcategorias.find((s) => s.id === subId) ?? cat.subcategorias[0];

  const submit = () => {
    if (!titulo.trim()) return;
    publishAnuncio({
      titulo, descripcion, precioHora: precio, ciudad,
      categoriaId: catId, subcategoriaId: subId, image: sub.image,
    });
    onDone();
  };

  return (
    <div>
      <TopBar title="Publicar anuncio" />
      <div className="px-5 pb-8 space-y-4">
        <FormField label="Título del anuncio">
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej. Fontanero 24h" className="form-input" />
        </FormField>
        <FormField label="Descripción">
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3} placeholder="Cuenta qué ofreces..." className="form-input resize-none" />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Precio / hora (€)">
            <input type="number" value={precio} onChange={(e) => setPrecio(Number(e.target.value) || 0)} className="form-input" />
          </FormField>
          <FormField label="Ciudad">
            <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="form-input" />
          </FormField>
        </div>
        <FormField label="Categoría">
          <select value={catId} onChange={(e) => { setCatId(e.target.value); const c = CATEGORIES.find((x) => x.id === e.target.value)!; setSubId(c.subcategorias[0].id); }} className="form-input">
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </FormField>
        <FormField label="Subcategoría">
          <select value={subId} onChange={(e) => setSubId(e.target.value)} className="form-input">
            {cat.subcategorias.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
          </select>
        </FormField>
        <button onClick={submit} className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-brand">
          Publicar anuncio
        </button>
        <p className="text-[11px] text-center text-muted-foreground">Tu anuncio aparecerá inmediatamente en la categoría elegida.</p>
      </div>
      <style>{`.form-input{width:100%;background:var(--color-muted);border-radius:0.875rem;padding:0.65rem 0.9rem;font-size:0.875rem;outline:none}.form-input:focus{box-shadow:0 0 0 2px color-mix(in oklab, var(--primary) 40%, transparent)}`}</style>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

/* ----------------------- Profile ----------------------- */
function ProfileTab({ onLogout, onSaldo }: { onLogout: () => void; onSaldo: () => void }) {
  const { user, saldo, logout } = useImirly();
  const items = [
    { icon: <Wallet className="w-5 h-5" />, label: "Mi monedero", onClick: onSaldo, right: <span className="text-sm font-bold text-primary">{saldo.toFixed(2)}€</span> },
    { icon: <Heart className="w-5 h-5" />, label: "Mis favoritos" },
    { icon: <Settings className="w-5 h-5" />, label: "Cambiar contraseña" },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Centro de ayuda" },
    { icon: <Mail className="w-5 h-5" />, label: "Contáctanos" },
    { icon: <Info className="w-5 h-5" />, label: "Sobre iMirly" },
  ];
  return (
    <div>
      <header className="bg-brand-gradient text-primary-foreground px-5 pt-8 pb-12 rounded-b-[32px] text-center shadow-brand">
        <img src={logo} alt="" className="w-20 h-20 rounded-full mx-auto bg-white p-2 shadow-soft" />
        <h1 className="mt-3 text-xl font-extrabold">{user?.name ?? "Invitado"}</h1>
        <p className="text-sm opacity-80">{user?.email ?? "demo@imirly.com"}</p>
      </header>
      <div className="px-5 -mt-6 mb-4">
        <button onClick={onSaldo} className="w-full bg-card rounded-2xl shadow-soft p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Saldo disponible</p>
            <p className="text-2xl font-extrabold text-primary">{saldo.toFixed(2)}€</p>
          </div>
          <span className="text-xs bg-primary text-primary-foreground px-3 py-2 rounded-xl font-semibold">Gestionar</span>
        </button>
      </div>
      <div className="bg-card mx-5 rounded-2xl shadow-soft overflow-hidden mb-6">
        {items.map((it, i) => (
          <button key={i} onClick={it.onClick} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted text-left border-b border-border last:border-0">
            <span className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center">{it.icon}</span>
            <span className="flex-1 text-sm font-medium">{it.label}</span>
            {it.right ?? <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </button>
        ))}
      </div>
      <div className="px-5 pb-8">
        <button onClick={() => { logout(); onLogout(); }} className="w-full py-3 rounded-2xl border border-destructive text-destructive font-semibold flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}

/* ----------------------- Saldo (wallet) ----------------------- */
function SaldoScreen({ onBack }: { onBack: () => void }) {
  const { saldo, pendiente, transacciones, recargar } = useImirly();
  return (
    <div>
      <ScreenHeader title="Mi monedero" onBack={onBack} />
      <div className="px-5">
        <div className="bg-brand-gradient rounded-3xl p-6 text-primary-foreground shadow-brand">
          <p className="text-sm opacity-90">Saldo disponible</p>
          <p className="text-4xl font-extrabold mt-1">{saldo.toFixed(2)}€</p>
          <div className="flex gap-2 mt-5">
            <button onClick={() => recargar(20)} className="flex-1 bg-white text-primary rounded-xl py-2.5 text-sm font-bold">+20€</button>
            <button onClick={() => recargar(50)} className="flex-1 bg-white text-primary rounded-xl py-2.5 text-sm font-bold">+50€</button>
            <button onClick={() => recargar(100)} className="flex-1 bg-white text-primary rounded-xl py-2.5 text-sm font-bold">+100€</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-card rounded-2xl p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">Pendiente</p>
            <p className="text-lg font-bold">{pendiente.toFixed(2)}€</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">Este mes</p>
            <p className="text-lg font-bold text-success">+85.00€</p>
          </div>
        </div>
        <h2 className="text-sm font-bold mt-6 mb-2">Movimientos</h2>
        <div className="bg-card rounded-2xl shadow-soft divide-y divide-border mb-8">
          {transacciones.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{t.concepto}</p>
                <p className="text-xs text-muted-foreground">{t.fecha}</p>
              </div>
              <p className={`text-sm font-bold ${t.importe >= 0 ? "text-success" : "text-destructive"}`}>
                {t.importe >= 0 ? "+" : ""}{t.importe.toFixed(2)}€
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------- Shared ----------------------- */
function TopBar({ title }: { title: string }) {
  return (
    <header className="px-5 pt-7 pb-4">
      <h1 className="text-2xl font-extrabold">{title}</h1>
    </header>
  );
}
function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="px-4 py-3 flex items-center gap-3 border-b border-border bg-card sticky top-0 z-10">
      <button onClick={onBack} className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h1 className="font-bold text-base">{title}</h1>
    </header>
  );
}

// Anuncio type used in signatures — referenced via store
export type { Anuncio };