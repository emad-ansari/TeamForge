import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Mail, UserPlus, Sparkles, ShieldAlert, Users, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

export const InviteModal = ({ isOpen, onClose, projectName }: InviteModalProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Admin" | "Member">("Member");
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inviting:", { email, role, projectName });
    onClose();
    setEmail("");
    setRole("Member");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-white/10 bg-[#09090b]/95 backdrop-blur-3xl shadow-glow sm:rounded-[2rem]">
        <div className="relative p-8">
          {/* Ambient background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
          
          <DialogHeader className="relative z-10 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col items-start">
                <DialogTitle className="font-display text-2xl font-bold tracking-tight text-white">
                  Invite to Project
                </DialogTitle>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  Add new members to <span className="text-primary">{projectName}</span>
                </p>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Email Address
              </Label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                  id="email"
                  type="email"
                  placeholder="teammate@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-11 bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Project Role
              </Label>
              <button
                type="button"
                onClick={() => setIsRoleOpen(!isRoleOpen)}
                className="w-full flex items-center justify-between h-12 bg-white/[0.02] border border-white/5 hover:border-primary/30 rounded-xl px-4 text-sm font-medium transition-all outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-1.5 rounded-lg",
                    role === "Admin" ? "bg-primary/10 text-primary" : "bg-white/5 text-muted-foreground"
                  )}>
                    {role === "Admin" ? <ShieldAlert className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                  </div>
                  <span>{role}</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isRoleOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isRoleOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute z-50 top-full left-0 w-full mt-2 bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1"
                  >
                    {[
                      { id: "Admin", label: "Admin", desc: "Full project control", icon: ShieldAlert },
                      { id: "Member", label: "Member", desc: "Can view and edit tasks", icon: Users },
                    ].map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => { setRole(r.id as any); setIsRoleOpen(false); }}
                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className={cn(
                          "p-2 rounded-xl",
                          role === r.id ? "bg-primary/10 text-primary" : "bg-white/5 text-muted-foreground"
                        )}>
                          <r.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold">{r.label}</p>
                          <p className="text-[10px] text-muted-foreground">{r.desc}</p>
                        </div>
                        {role === r.id && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1 h-12 rounded-xl border border-white/5 hover:bg-white/5 text-muted-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-[1.5] h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 font-bold tracking-tight"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
