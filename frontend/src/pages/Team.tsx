import { AppLayout } from "@/components/AppLayout";
import { members as allMembers, projects, type Member } from "@/lib/mock-data";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Users, 
  ShieldAlert, 
  Trash2, 
  UserPlus,
  ArrowLeftRight,
  Sparkles,
  ChevronDown,
  Check
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export const Team = () => {
  const { id } = useParams();
  const project = useMemo(() => projects.find(p => p.id === id) || projects[0], [id]);
  const [projectMembers, setProjectMembers] = useState<Member[]>(project.members);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  
  // Invite form state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Member">("Member");
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const filteredMembers = projectMembers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inviting:", { email: inviteEmail, role: inviteRole, projectId: id });
    setIsInviteOpen(false);
    setInviteEmail("");
    setInviteRole("Member");
  };

  const handleRemoveMember = (memberId: string) => {
    setProjectMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const handleChangeRole = (memberId: string, newRole: "Admin" | "Member") => {
    setProjectMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  return (
    <AppLayout
      title={
        <div className="flex items-center gap-4">
          <div 
            className="p-2 rounded-xl bg-primary/10 border border-primary/20 shadow-glow-sm"
            style={{ color: `hsl(${project.color})`, borderColor: `hsl(${project.color} / 0.2)` }}
          >
            <Users className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground mb-0.5">Project Team</span>
            <span className="font-display font-bold">{project.name}</span>
          </div>
        </div>
      }
      subtitle="Manage members, roles, and access controls for this project."
      action={
        <Button 
          onClick={() => setIsInviteOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-glow h-11 px-5 rounded-xl transition-all"
        >
          <UserPlus className="h-4 w-4 mr-2" />Invite member
        </Button>
      }
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search team members…" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all" 
          />
        </div>
        <div className="ml-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-sm font-medium">
          <Users className="w-4 h-4 text-primary" />
          <span>{projectMembers.length} members</span>
        </div>
      </div>

      <div className="surface overflow-hidden border border-white/10 bg-white/[0.01] shadow-bento">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-[11px] uppercase tracking-widest text-muted-foreground font-bold">
                <th className="px-6 py-4">Member Info</th>
                <th className="px-6 py-4 hidden md:table-cell">Email Address</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 hidden lg:table-cell">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((m, i) => (
                <tr key={m.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <UserAvatar member={m} size="md" className="ring-2 ring-transparent group-hover:ring-primary/20 transition-all" />
                      <div>
                        <p className="font-bold text-[15px] group-hover:text-primary transition-colors">{m.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden mt-0.5">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground flex items-center gap-2 group-hover:text-white/80 transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
                      {m.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {m.role === "Admin" ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-glow-sm">
                          <ShieldAlert className="w-3 h-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/5 text-muted-foreground border border-white/5">
                          Member
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-sm font-medium text-muted-foreground group-hover:text-white/60 transition-colors">
                    {["Jan 12, 2024", "Mar 04, 2024", "Apr 22, 2024", "Jun 18, 2024", "Aug 09, 2024", "Oct 30, 2024"][i % 6]}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                        onClick={() => handleChangeRole(m.id, m.role === "Admin" ? "Member" : "Admin")}
                        title="Change Role"
                      >
                        <ArrowLeftRight className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
                        onClick={() => handleRemoveMember(m.id)}
                        title="Remove from Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden border border-white/10 bg-[#09090b]/95 backdrop-blur-3xl shadow-glow sm:rounded-[2rem]">
          <div className="relative p-8">
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
                    Add new members to <span className="text-primary">{project.name}</span>
                  </p>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleInvite} className="space-y-6 relative z-10">
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
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
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
                      inviteRole === "Admin" ? "bg-primary/10 text-primary" : "bg-white/5 text-muted-foreground"
                    )}>
                      {inviteRole === "Admin" ? <ShieldAlert className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                    </div>
                    <span>{inviteRole}</span>
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
                          onClick={() => { setInviteRole(r.id as any); setIsRoleOpen(false); }}
                          className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                        >
                          <div className={cn(
                            "p-2 rounded-xl",
                            inviteRole === r.id ? "bg-primary/10 text-primary" : "bg-white/5 text-muted-foreground"
                          )}>
                            <r.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold">{r.label}</p>
                            <p className="text-[10px] text-muted-foreground">{r.desc}</p>
                          </div>
                          {inviteRole === r.id && <Check className="h-4 w-4 text-primary" />}
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
                  onClick={() => setIsInviteOpen(false)}
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
    </AppLayout>
  );
};

export default Team;
