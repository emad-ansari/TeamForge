import { AppLayout } from "@/components/AppLayout";
import { initialTasks } from "@/lib/mock-data";
import { UserAvatar } from "@/components/UserAvatar";
import { Calendar, CheckSquare, Clock, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { useTaskModal } from "@/contexts/TaskModalContext";

const Tasks = () => {
  const { openCreateTaskModal } = useTaskModal();
  const groups = [
    { label: "To do", icon: CheckSquare, color: "text-primary", bg: "bg-primary/10", items: initialTasks.filter((t) => t.status === "todo") },
    { label: "In progress", icon: Clock, color: "text-warning", bg: "bg-warning/10", items: initialTasks.filter((t) => t.status === "in-progress") },
    { label: "Done", icon: CheckCircle2, color: "text-success", bg: "bg-success/10", items: initialTasks.filter((t) => t.status === "done") },
  ];
  return (
    <AppLayout 
      title={
        <div className="flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-primary" />
          <span>My tasks</span>
        </div>
      } 
      subtitle="Everything assigned to you, organized by status for ultimate focus."
    >
      <div className="space-y-10 max-w-5xl">
        {groups.map((g) => (
          <div key={g.label} className="animate-slide-up">
            <div className="flex items-center gap-3 mb-4 pl-2">
              <div className={`p-1.5 rounded-lg ${g.bg}`}>
                <g.icon className={`w-4 h-4 ${g.color}`} />
              </div>
              <h3 className="font-display font-bold text-lg">{g.label}</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">{g.items.length}</span>
            </div>
            
            <div className="surface divide-y divide-white/5 shadow-bento">
              {g.items.length > 0 ? g.items.map((t) => (
                <div key={t.id} onClick={() => openCreateTaskModal(t)} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group cursor-pointer border-l-2 border-transparent hover:border-primary/50 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <Checkbox 
                    defaultChecked={t.status === "done"} 
                    className="relative z-10 border-white/20 data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=checked]:text-success-foreground" 
                  />
                  
                  <p className={`flex-1 text-[15px] font-medium relative z-10 transition-colors ${t.status === "done" ? "line-through text-muted-foreground/50" : "text-foreground group-hover:text-glow"}`}>
                    {t.title}
                  </p>
                  
                  <div className="flex items-center gap-2 relative z-10">
                    {t.labels.map((l) => (
                      <span key={l.name} className="text-[10px] px-2 py-0.5 rounded-md font-bold tracking-wide uppercase border border-current/10" style={{ background: `hsl(${l.color} / 0.1)`, color: `hsl(${l.color})` }}>
                        {l.name}
                      </span>
                    ))}
                  </div>
                  
                  <span className={`text-xs font-medium flex items-center gap-1.5 w-24 justify-end relative z-10 transition-colors ${t.status === "done" ? "text-muted-foreground/50" : "text-muted-foreground group-hover:text-foreground"}`}>
                    <Calendar className="h-3.5 w-3.5" />
                    {t.dueDate}
                  </span>
                  
                  <div className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity ml-2">
                    <UserAvatar member={t.assignee} size="sm" className="ring-2 ring-transparent group-hover:ring-white/10 transition-all" />
                  </div>
                </div>
              )) : (
                <div className="px-5 py-8 text-center text-muted-foreground/60 text-sm font-medium">
                  No tasks in this list. You're all caught up!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Tasks;
