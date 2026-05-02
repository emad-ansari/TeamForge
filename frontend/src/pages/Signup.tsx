import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "./Login";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const checks = [
    { label: "8+ characters", ok: pw.length >= 8 },
    { label: "1 number", ok: /\d/.test(pw) },
    { label: "1 uppercase", ok: /[A-Z]/.test(pw) },
  ];
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start managing your team's work in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-foreground font-semibold hover:text-primary hover:text-glow transition-colors">
            Log in to workspace
          </Link>
        </>
      }
    >
      <Button variant="outline" className="w-full h-11 gap-2 font-semibold bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all rounded-xl">
        <GoogleIcon /> Sign up with Google
      </Button>
      <div className="my-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
        <div className="h-px flex-1 bg-white/10" />
        or with email
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full name
          </Label>
          <Input id="name" placeholder="Alex Morgan" className="h-11 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:bg-white/[0.05] transition-all rounded-xl" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Work email
          </Label>
          <Input id="email" type="email" placeholder="you@company.com" className="h-11 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:bg-white/[0.05] transition-all rounded-xl" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="h-11 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:bg-white/[0.05] transition-all rounded-xl"
            required
          />
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
            {checks.map((c) => (
              <div
                key={c.label}
                className={`text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                  c.ok ? "text-success" : "text-muted-foreground/70"
                }`}
              >
                <span
                  className={`inline-flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                    c.ok ? "bg-success/20 text-success border border-success/30" : "bg-white/5 text-muted-foreground/30 border border-white/5"
                  }`}
                >
                  <Check className="h-2.5 w-2.5" />
                </span>
                {c.label}
              </div>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          className="group w-full h-11 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 font-semibold rounded-xl transition-all"
        >
          Create account
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <p className="text-[11px] font-medium text-muted-foreground/60 text-center pt-3 leading-relaxed">
          By signing up you agree to our{" "}
          <a className="underline-offset-2 hover:text-foreground transition-colors" href="#">
            Terms
          </a>{" "}
          &{" "}
          <a className="underline-offset-2 hover:text-foreground transition-colors" href="#">
            Privacy
          </a>
          .
        </p>
      </form>
    </AuthShell>
  );
};

export default Signup;
