import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  LayoutDashboard,
  RefreshCw,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { toast } from "sonner";

type InviteState = "loading" | "success" | "error";

const InvitePage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();

  const [state, setState] = useState<InviteState>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const hasCalledAPI = useRef(false);

  const acceptInvite = async () => {
    if (!token || hasCalledAPI.current) return;

    hasCalledAPI.current = true;
    setState("loading");
    setErrorMessage("");

    try {
      // Simulate API call delay for better UX
      // In a real app, you might not want this, but it makes the loader visible
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await api.post("/invite/accept", { token });

      setState("success");
      setProjectId(response.data.projectId);
      toast.success("Successfully joined the project!");

      if (response.data.projectId) {
        // Auto redirect after 2 seconds
        setTimeout(() => {
          navigate(`/projects/${response.data.projectId}`);
        }, 2000);
      }
    } catch (error: any) {
      console.error("Invite acceptance failed:", error);
      setState("error");
      
      const message = error.response?.data?.message || "Something went wrong";
      
      if (message.toLowerCase().includes("invalid")) {
        setErrorMessage("Invalid invite link");
      } else if (message.toLowerCase().includes("expired")) {
        setErrorMessage("This invite has expired");
      } else if (message.toLowerCase().includes("already")) {
        setErrorMessage("You have already joined this project");
      } else {
        setErrorMessage(message);
      }
    } finally {
      // Reset ref only if we want to allow retries
      // If we don't reset, the user can't click retry.
      // But we set it back to false in the retry handler.
    }
  };

  const handleRetry = () => {
    hasCalledAPI.current = false;
    acceptInvite();
  };

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      // Redirect to login with the current path as redirect param
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    if (token) {
      acceptInvite();
    } else {
      setState("error");
      setErrorMessage("No invitation token found.");
    }
  }, [isAuthenticated, authLoading, token, navigate, location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden items-center justify-center selection:bg-primary/30 selection:text-primary-foreground">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-success/5 blur-[120px] pointer-events-none" />

      {/* Mesh Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[450px] px-6">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-success shadow-glow mb-4">
            <Command className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold tracking-tight text-2xl text-glow">
            TeamForge
          </h1>
        </div>

        <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-[#09090b]/80 relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <AnimatePresence mode="wait">
            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center py-4"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                  <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
                </div>
                <h2 className="text-xl font-bold mb-2">Joining project...</h2>
                <p className="text-muted-foreground text-sm font-medium">
                  We're adding you to the team. This will only take a moment.
                </p>
              </motion.div>
            )}

            {state === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-4"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-success/20 blur-xl rounded-full" />
                  <CheckCircle2 className="w-14 h-14 text-success relative z-10 animate-bounce-short" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-glow-success">
                  Welcome to the team!
                </h2>
                <p className="text-muted-foreground text-sm font-medium mb-8">
                  You have successfully joined the project. Redirecting you
                  now...
                </p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="h-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  />
                </div>
              </motion.div>
            )}

            {state === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center py-2"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full" />
                  <XCircle className="w-14 h-14 text-destructive relative z-10" />
                </div>
                <h2 className="text-xl font-bold mb-2">Invitation Failed</h2>
                <p className="text-muted-foreground text-sm font-medium mb-8">
                  {errorMessage}
                </p>

                <div className="grid grid-cols-1 gap-3 w-full">
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="h-11 gap-2 font-semibold bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4" /> Try Again
                  </Button>
                  <Button
                    asChild
                    className="group h-11 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 font-semibold rounded-xl transition-all"
                  >
                    <Link to="/dashboard">
                      Go to Dashboard
                      <LayoutDashboard className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p
          className="mt-8 text-xs font-medium text-muted-foreground/60 text-center animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          By joining, you agree to the project's workspace policies and terms of
          service.
        </p>
      </div>
    </div>
  );
};

export default InvitePage;
