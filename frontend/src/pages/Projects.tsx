import { AppLayout } from "@/components/AppLayout";
import { projects } from "@/lib/mock-data";
import { Plus, MoreHorizontal, Search, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarStack } from "@/components/UserAvatar";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-3">
          <FolderKanban className="w-8 h-8 text-primary" />
          <span>Projects</span>
        </div>
      }
      subtitle="Organize, track and ship work across your team."
      action={
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-glow h-11 px-5 rounded-xl transition-all">
          <Plus className="h-4 w-4 mr-2" />Create project
        </Button>
      }
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Filter projects by name, status, or assignee…" 
            className="pl-10 h-11 bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all w-full" 
          />
        </div>
        <div className="flex items-center gap-1 w-full sm:w-auto rounded-xl border border-white/5 p-1 bg-white/[0.02] backdrop-blur-md">
          <button className="px-4 py-1.5 rounded-lg bg-white/10 text-white font-medium text-sm shadow-sm transition-all flex-1 sm:flex-none">Grid</button>
          <button className="px-4 py-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 text-sm transition-all flex-1 sm:flex-none">List</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((p) => {
          const pct = Math.round((p.completedTasks / p.totalTasks) * 100);
          return (
            <Link key={p.id} to={`/projects/${p.id}`} className="surface p-6 group hover:shadow-glow transition-all duration-300 block relative cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-500 opacity-50" style={{ background: `hsl(${p.color} / 0.1)` }} />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white shadow-inner border border-white/10"
                  style={{ background: `linear-gradient(135deg, hsl(${p.color}), hsl(${p.color} / 0.5))` }}>
                  {p.name.charAt(0)}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 hover:bg-white/10 rounded-lg border border-white/5" onClick={(e) => e.preventDefault()}>
                  <MoreHorizontal className="h-4 w-4 text-white" />
                </Button>
              </div>
              
              <h3 className="font-display text-xl font-bold mt-5 group-hover:text-glow transition-all relative z-10">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 h-10 relative z-10">{p.description}</p>

              <div className="mt-6 relative z-10">
                <div className="flex items-center justify-between text-xs font-medium mb-2">
                  <span className="text-muted-foreground group-hover:text-white/80 transition-colors">{p.completedTasks}/{p.totalTasks} tasks</span>
                  <span className="text-foreground tabular-nums bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{pct}%</span>
                </div>
                <Progress value={pct} className="h-1.5 bg-white/5" />
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
                <AvatarStack members={p.members} size="sm" max={4} />
                <span className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider group-hover:text-muted-foreground transition-colors">Updated 2h ago</span>
              </div>
            </Link>
          );
        })}

        <button className="surface p-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all min-h-[280px] bg-transparent hover:bg-white/[0.02] group">
          <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/5 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
            <Plus className="h-6 w-6 group-hover:text-primary transition-colors" />
          </div>
          <p className="font-display font-bold text-lg text-foreground group-hover:text-glow transition-all">Create new project</p>
          <p className="text-sm mt-1.5 text-center px-4">Start from scratch or choose a predefined template</p>
        </button>
      </div>
    </AppLayout>
  );
};

export default Projects;
