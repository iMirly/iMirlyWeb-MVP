import { useState } from "react";
import { useImirly } from "@/lib/imirly/store";
import { LoginScreen, OnboardingFlow, RegisterScreen } from "@/components/imirly/screens/AuthScreens";
import { MainApp } from "@/components/imirly/screens/MainApp";

type Stage = "onboarding" | "login" | "register" | "app";

export function AppFlow() {
  const { user } = useImirly();
  const [stage, setStage] = useState<Stage>(user ? "app" : "onboarding");

  if (stage === "onboarding") return <OnboardingFlow onDone={() => setStage("login")} />;
  if (stage === "login") return <LoginScreen onLogin={() => setStage("app")} onRegister={() => setStage("register")} />;
  if (stage === "register") return <RegisterScreen onDone={() => setStage("app")} onBackToLogin={() => setStage("login")} />;
  return <MainApp onLogout={() => setStage("login")} />;
}
