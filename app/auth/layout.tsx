import { ShieldCheck, Zap, BadgeCheck, Globe } from "lucide-react";
import { GateAuthLogo } from "@/components/auth/GateAuthLogo";

const features = [
  { icon: ShieldCheck, text: "Bank-grade AES-256 encryption" },
  { icon: Zap,         text: "Sub-100ms authentication latency" },
  { icon: BadgeCheck,  text: "SOC 2 Type II compliant" },
  { icon: Globe,       text: "99.99% uptime SLA" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col lg:flex-row">
      {/* ── Left panel: branding (hidden on mobile) ── */}
      <aside
        className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-shrink-0 flex-col justify-between p-10 xl:p-14 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1C3D3B 0%, #2D605C 45%, #3D827E 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #81C4C0, transparent)" }} />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #BADEDC, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #E9F5F4, transparent)" }} />

        {/* Logo */}
        <div className="relative z-10">
          <GateAuthLogo variant="light" iconSize={36} />
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight">
              Every door,<br />
              <span style={{ color: "#81C4C0" }}>elegantly handled.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#A4D4D1" }}>
              Enterprise authentication infrastructure trusted by 10,000+ developers worldwide.
            </p>
          </div>

          <ul className="space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(186,222,220,0.15)" }}
                >
                  <Icon size={16} style={{ color: "#81C4C0" }} strokeWidth={1.8} />
                </span>
                <span className="text-sm font-medium" style={{ color: "#BADEDC" }}>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs" style={{ color: "#4BA19C" }}>
            © {new Date().getFullYear()} GateAuth Inc. · Privacy · Terms
          </p>
        </div>
      </aside>

      {/* ── Right panel: form ── */}
      <main
        className="flex-1 flex flex-col min-h-dvh lg:min-h-0 overflow-y-auto"
        style={{ background: "#F4FAFA" }}
      >
        {/* Mobile header */}
        <header
          className="lg:hidden flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "#E4ECEC", background: "#FFFFFF" }}
        >
          <GateAuthLogo iconSize={28} />
        </header>

        {/* Centered form area */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          <div className="w-full max-w-[440px] animate-fade-in-up">
            {children}
          </div>
        </div>

        {/* Mobile footer */}
        <footer className="lg:hidden text-center py-4 px-5">
          <p className="text-xs" style={{ color: "#7A9E9C" }}>
            © {new Date().getFullYear()} GateAuth Inc.
          </p>
        </footer>
      </main>
    </div>
  );
}
