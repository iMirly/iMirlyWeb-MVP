import { useState } from "react";
import { useImirly } from "@/lib/imirly/store";
import { ONBOARDING } from "@/lib/imirly/data";
import logo from "@/assets/imirly/logo.webp";
import ob1 from "@/assets/imirly/onboarding_1.png";
import ob2 from "@/assets/imirly/onboarding_2.png";
import ob3 from "@/assets/imirly/onboarding_3.png";
import { ArrowRight, Mail, Lock, User as UserIcon } from "lucide-react";

const obImages = [ob1, ob2, ob3];

export function OnboardingFlow({ onDone }: { onDone: () => void }) {
  const [page, setPage] = useState(0);
  const last = page === ONBOARDING.length - 1;
  return (
    <div className="h-full w-full bg-brand-gradient text-primary-foreground flex flex-col p-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        <img src={obImages[page]} alt="" className="w-56 h-56 object-contain drop-shadow-xl" />
        <div className="space-y-3">
          <h1 className="text-2xl font-extrabold leading-tight">{ONBOARDING[page].title}</h1>
          <p className="text-base opacity-90 leading-relaxed">{ONBOARDING[page].text}</p>
        </div>
      </div>
      <div className="flex justify-center gap-2 my-6">
        {ONBOARDING.map((_, i) => (
          <span key={i} className={`h-2 rounded-full transition-all ${i === page ? "w-8 bg-white" : "w-2 bg-white/50"}`} />
        ))}
      </div>
      <button
        onClick={() => (last ? onDone() : setPage(page + 1))}
        className="w-full py-4 rounded-2xl bg-white text-primary font-bold text-base flex items-center justify-center gap-2 shadow-soft active:scale-[0.98] transition"
      >
        {last ? "Empezar" : "Siguiente"} <ArrowRight className="w-5 h-5" />
      </button>
      {!last && (
        <button onClick={onDone} className="mt-3 text-sm text-white/80 underline-offset-2 hover:underline">
          Saltar
        </button>
      )}
    </div>
  );
}

export function LoginScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const { login } = useImirly();
  const [email, setEmail] = useState("demo@imirly.com");
  const [pass, setPass] = useState("demo1234");

  return (
    <div className="h-full w-full bg-brand-gradient flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-3 mb-8">
        <img src={logo} alt="iMirly" className="w-14 h-14 rounded-2xl" />
        <span className="text-4xl font-extrabold text-white tracking-tight">iMirly</span>
      </div>
      <div className="w-full bg-card rounded-[28px] p-7 shadow-brand">
        <h2 className="text-xl font-bold text-center">Iniciar sesión</h2>
        <p className="text-center text-sm text-muted-foreground mt-1">Demo: cualquier email funciona</p>
        <div className="mt-6 space-y-3">
          <Field icon={<Mail className="w-4 h-4" />} value={email} onChange={setEmail} placeholder="Email" />
          <Field icon={<Lock className="w-4 h-4" />} value={pass} onChange={setPass} placeholder="Contraseña" type="password" />
        </div>
        <button
          onClick={() => {
            login(email);
            onLogin();
          }}
          className="mt-6 w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold active:scale-[0.98] transition shadow-brand"
        >
          Iniciar sesión
        </button>
        <button onClick={onRegister} className="mt-4 w-full text-center text-sm font-semibold text-primary">
          ¿No tienes cuenta? <span className="underline">Crear cuenta</span>
        </button>
      </div>
    </div>
  );
}

export function RegisterScreen({ onDone, onBackToLogin }: { onDone: () => void; onBackToLogin: () => void }) {
  const { login } = useImirly();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className="h-full w-full bg-brand-gradient flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="iMirly" className="w-12 h-12 rounded-2xl" />
        <span className="text-3xl font-extrabold text-white">iMirly</span>
      </div>
      <div className="w-full bg-card rounded-[28px] p-7 shadow-brand">
        <h2 className="text-xl font-bold text-center">Crear cuenta</h2>
        <div className="mt-6 space-y-3">
          <Field icon={<UserIcon className="w-4 h-4" />} value={name} onChange={setName} placeholder="Nombre completo" />
          <Field icon={<Mail className="w-4 h-4" />} value={email} onChange={setEmail} placeholder="Email" />
          <Field icon={<Lock className="w-4 h-4" />} value={pass} onChange={setPass} placeholder="Contraseña" type="password" />
        </div>
        <button
          onClick={() => {
            login(email || "demo@imirly.com", name || "Tú");
            onDone();
          }}
          className="mt-6 w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-brand"
        >
          Crear cuenta
        </button>
        <button onClick={onBackToLogin} className="mt-4 w-full text-center text-sm font-semibold text-primary">
          ¿Ya tienes cuenta? <span className="underline">Inicia sesión</span>
        </button>
      </div>
    </div>
  );
}

function Field({ icon, value, onChange, placeholder, type = "text" }: { icon: React.ReactNode; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <label className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/40">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </label>
  );
}