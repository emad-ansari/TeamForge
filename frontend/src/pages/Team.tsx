import { AppLayout } from "@/components/AppLayout";
import { members } from "@/lib/mock-data";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreHorizontal, Mail, Users, ShieldAlert } from "lucide-react";

const Team = () => {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <span>Team Directory</span>
        </div>
      }
      subtitle="Manage members, roles, and access controls for your workspace."
      action={
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-glow h-11 px-5 rounded-xl transition-all">
          <Plus className="h-4 w-4 mr-2" />Invite member
        </Button>
      }
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or email…" 
            className="pl-10 h-11 bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all" 
          />
        </div>
        <div className="ml-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-sm font-medium">
          <Users className="w-4 h-4 text-primary" />
          <span>{members.length} active members</span>
        </div>
      </div>

      <div className="surface overflow-hidden border border-white/10 bg-white/[0.01]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02] text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              <th className="text-left px-6 py-4">Member Info</th>
              <th className="text-left px-6 py-4 hidden md:table-cell">Contact</th>
              <th className="text-left px-6 py-4">Access Role</th>
              <th className="text-left px-6 py-4 hidden lg:table-cell">Date Joined</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((m, i) => (
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
                    <Mail className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary/50 transition-colors" />{m.email}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {m.role === "Admin" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                        <ShieldAlert className="w-3 h-3" />
                        Admin
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/5">
                        {m.role}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell text-sm font-medium text-muted-foreground group-hover:text-white/60 transition-colors">
                  {["Jan 12, 2024", "Mar 04, 2024", "Apr 22, 2024", "Jun 18, 2024", "Aug 09, 2024", "Oct 30, 2024"][i]}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-9 w-9 bg-white/[0.02] hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10 transition-all opacity-50 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default Team;
