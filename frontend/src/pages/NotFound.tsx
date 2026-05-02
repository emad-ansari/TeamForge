import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Command, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background relative overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-md w-full px-6 flex flex-col items-center animate-slide-up-delayed-1">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10 shadow-bento mb-8">
          <Command className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="font-display text-7xl md:text-8xl font-black tracking-tight mb-2 text-glow">
          404
        </h1>
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
          Page not found
        </h2>
        <p className="text-muted-foreground text-[15px] mb-10 leading-relaxed max-w-sm mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button asChild variant="outline" className="w-full sm:w-auto h-11 px-6 bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all rounded-xl font-semibold gap-2">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" /> Go back
            </button>
          </Button>
          <Button asChild className="w-full sm:w-auto h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 transition-all rounded-xl font-semibold gap-2">
            <Link to="/">
              <Home className="w-4 h-4" /> Return home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
