import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Command, Loader2 } from "lucide-react";

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
    />
  </svg>
);

export const AuthShell = ({
  children,
  title,
  subtitle,
  footer,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer: React.ReactNode;
}) => (
  <div className="relative min-h-screen flex flex-col bg-background overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
    {/* Ambient background */}
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-success/10 blur-[150px] pointer-events-none" />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage:
          "radial-gradient(ellipse at center, black 10%, transparent 70%)",
      }}
    />

    {/* Header */}
    <header className="relative z-10 px-6 md:px-10 py-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-success shadow-glow">
          <Command className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold tracking-tight text-lg group-hover:text-glow transition-all duration-300">TeamForge</span>
      </Link>
      <div className="text-sm font-medium text-muted-foreground">
        Need help?{" "}
        <a
          href="#"
          className="text-foreground hover:text-primary transition-colors"
        >
          Contact us
        </a>
      </div>
    </header>

    {/* Centered card */}
    <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[420px] animate-slide-up-delayed-1">
        <div className="text-center mb-8">
          <h1 className="font-display text-[2rem] leading-tight font-black tracking-tight hero-text-gradient">
            {title}
          </h1>
          <p className="text-muted-foreground mt-2 text-[15px] font-medium">{subtitle}</p>
        </div>

        <div className="glass-card p-7 md:p-8 rounded-3xl border border-white/10 bg-[#09090b]/80 relative overflow-hidden shadow-bento">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          {children}
        </div>

        <p className="mt-8 text-sm font-medium text-muted-foreground text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {footer}
        </p>
      </div>
    </main>

    <footer className="relative z-10 px-6 md:px-10 py-6 flex items-center justify-between text-xs font-medium text-muted-foreground/70">
      <span>© 2026 TeamForge</span>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-foreground transition-colors">
          Privacy
        </a>
        <a href="#" className="hover:text-foreground transition-colors">
          Terms
        </a>
      </div>
    </footer>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue to your workspace."
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-foreground font-semibold hover:text-primary hover:text-glow transition-all"
          >
            Sign up for free
          </Link>
        </>
      }
    >
      <Button variant="outline" className="w-full h-11 gap-2 font-semibold bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all rounded-xl">
        <GoogleIcon /> Continue with Google
      </Button>
      <div className="my-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
        <div className="h-px flex-1 bg-white/10" />
        or with email
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-11 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:bg-white/[0.05] transition-all rounded-xl"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Password
            </Label>
            <a
              href="#"
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-11 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:bg-white/[0.05] transition-all rounded-xl"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="group w-full h-11 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 font-semibold rounded-xl transition-all"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Log in to workspace
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;
