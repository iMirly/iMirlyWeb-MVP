import { ImirlyProvider } from "@/lib/imirly/store";
import { MobileFrame } from "@/components/imirly/MobileFrame";
import { AppFlow } from "@/components/imirly/screens/AppFlow";

export default function App() {
  return (
    <ImirlyProvider>
      <MobileFrame>
        <AppFlow />
      </MobileFrame>
    </ImirlyProvider>
  );
}
