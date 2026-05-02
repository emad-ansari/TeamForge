import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/UserAvatar";
import { Calendar as CalendarIcon, Tag, CheckSquare, MessageSquare, Paperclip, MoreHorizontal, Maximize2 } from "lucide-react";
import type { Task } from "@/lib/mock-data";
import { members } from "@/lib/mock-data";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const TaskModal = ({ task, onClose }: { task: Task | null; onClose: () => void }) => {
  const [status, setStatus] = useState<string>(task?.status || "todo");
  if (!task) return null;
  const statusMap = {
    "todo": { label: "To do", color: "175 100% 50%" },
    "in-progress": { label: "In progress", color: "35 100% 55%" },
    "done": { label: "Done", color: "150 100% 50%" },
  } as const;
  const cur = statusMap[status as keyof typeof statusMap];

  return (
    <Dialog open={!!task} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0 border border-white/10 bg-[#09090b]/95 backdrop-blur-3xl shadow-glow sm:rounded-[2rem]">
        <div className="grid md:grid-cols-[1fr,300px] max-h-[85vh]">
          {/* Main */}
          <div className="p-8 overflow-y-auto border-r border-white/5 relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 relative z-10">
              <span className="hover:text-foreground cursor-pointer transition-colors">Mobile App Redesign</span>
              <span>/</span>
              <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">TASK-{task.id.toUpperCase()}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground relative z-10">{task.title}</h2>

            <div className="mt-8 relative z-10">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                Description
              </p>
              <Textarea
                defaultValue={task.description || "Add a more detailed description…"}
                className="min-h-[120px] resize-none border-white/5 bg-white/[0.02] focus:bg-white/[0.04] focus:border-primary/50 transition-all rounded-xl text-[15px]"
              />
            </div>

            <div className="mt-8 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                  <CheckSquare className="h-4 w-4 text-primary" />
                </div>
                <p className="font-display text-lg font-bold">Subtasks</p>
                <span className="text-xs font-semibold text-muted-foreground ml-auto bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                  {(task.subtasks?.filter(s => s.done).length || 0)}/{task.subtasks?.length || 0}
                </span>
              </div>
              <div className="space-y-2">
                {(task.subtasks || [{title:"Define scope",done:true},{title:"Build prototype",done:false}]).map((s, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                    <Checkbox defaultChecked={s.done} className="border-white/20 data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=checked]:text-success-foreground" />
                    <span className={`text-[15px] font-medium transition-colors ${s.done ? "line-through text-muted-foreground/50" : "text-foreground group-hover:text-primary"}`}>{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <p className="font-display text-lg font-bold">Comments</p>
              </div>
              <div className="space-y-6">
                {(task.comments || [{author: members[0], text:"Let's sync on this tomorrow.", time:"1h ago"}]).map((c, i) => (
                  <div key={i} className="flex gap-4">
                    <UserAvatar member={c.author} size="sm" className="ring-2 ring-white/5 mt-1" />
                    <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[15px] font-bold">{c.author.name}</p>
                        <p className="text-xs font-medium text-muted-foreground">{c.time}</p>
                      </div>
                      <p className="text-[15px] text-muted-foreground leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 pt-2">
                  <UserAvatar member={members[0]} size="sm" className="ring-2 ring-primary/20 mt-1" />
                  <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-2 focus-within:border-primary/50 focus-within:bg-white/[0.04] transition-all">
                    <Textarea placeholder="Write a comment…" className="min-h-[80px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 text-[15px]" />
                    <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5"><Paperclip className="h-4 w-4 text-muted-foreground" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5"><Maximize2 className="h-4 w-4 text-muted-foreground" /></Button>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 font-semibold rounded-lg px-5">Comment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side */}
          <div className="p-8 bg-black/40 border-l border-white/5 overflow-y-auto relative z-10">
            <div className="flex items-center justify-end mb-6">
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-white/[0.02] border border-white/5 hover:bg-white/10 rounded-xl"><MoreHorizontal className="h-4 w-4 text-foreground" /></Button>
            </div>
            <div className="space-y-8 text-sm">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">Status</p>
                <div className="relative">
                  <select value={status} onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[15px] font-semibold focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all cursor-pointer">
                    {Object.entries(statusMap).map(([k, v]) => (
                      <option key={k} value={k} className="bg-[#09090b]">{v.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                     <span className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: `hsl(${cur.color})`, color: `hsl(${cur.color})` }} />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Assignee</p>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-colors cursor-pointer group">
                  <UserAvatar member={task.assignee} size="sm" className="ring-2 ring-transparent group-hover:ring-white/10 transition-all" />
                  <span className="font-semibold text-[15px]">{task.assignee.name}</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Due date</p>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-colors text-left group">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-semibold text-[15px]">{task.dueDate}, 2026</span>
                </button>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Labels</p>
                <div className="flex flex-wrap gap-2">
                  {task.labels.map((l) => (
                    <span key={l.name} className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md border border-current/10"
                      style={{ background: `hsl(${l.color} / 0.1)`, color: `hsl(${l.color})` }}>{l.name}</span>
                  ))}
                  <button className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md border border-dashed border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors flex items-center">
                    <Tag className="h-3 w-3 mr-1" />Add
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider space-y-2">
                <p>Created 3 days ago by Alex</p>
                <p className="text-white/40">Updated just now</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
