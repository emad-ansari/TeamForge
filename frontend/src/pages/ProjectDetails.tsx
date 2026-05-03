import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import {
  initialTasks,
  projects,
  type Task,
  type TaskStatus,
  type Member,
} from "@/lib/mock-data";
import { UserAvatar, AvatarStack } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Filter,
  LayoutGrid,
  Clock,
  CheckCircle2,
  Plus,
  MoreHorizontal,
  CheckSquare as CheckIcon,
  Trash2,
  Users,
  Search,
  UserPlus,
  Mail,
  ShieldAlert,
  ArrowLeftRight,
} from "lucide-react";
import { useTaskModal } from "@/contexts/TaskModalContext";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { InviteModal } from "@/components/InviteModal";
import { motion, AnimatePresence } from "motion/react";

const columns: {
  id: TaskStatus;
  title: string;
  color: string;
  icon: any;
  bg: string;
}[] = [
  {
    id: "todo",
    title: "To do",
    color: "175 100% 50%",
    icon: CheckIcon,
    bg: "bg-primary/10",
  },
  {
    id: "in-progress",
    title: "In progress",
    color: "35 100% 55%",
    icon: Clock,
    bg: "bg-warning/10",
  },
  {
    id: "done",
    title: "Done",
    color: "150 100% 50%",
    icon: CheckCircle2,
    bg: "bg-success/10",
  },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) || projects[0];
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<TaskStatus | null>(null);
  const { openCreateTaskModal } = useTaskModal();
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"board" | "team">("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectMembers, setProjectMembers] = useState<Member[]>(project.members);

  const filteredMembers = projectMembers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onDrop = (status: TaskStatus) => {
    if (!draggedId) return;
    setTasks((ts) =>
      ts.map((t) => (t.id === draggedId ? { ...t, status } : t)),
    );
    setDraggedId(null);
    setOverCol(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((ts) => ts.filter((t) => t.id !== taskId));
    setDeleteTaskId(null);
  };

  const handleRemoveMember = (memberId: string) => {
    setProjectMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const handleChangeRole = (memberId: string, newRole: "Admin" | "Member") => {
    setProjectMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  return (
    <AppLayout>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div className="flex items-center gap-5">
          <div
            className="h-16 w-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl text-white shadow-glow relative"
            style={{
              background: `linear-gradient(135deg, hsl(${project.color}), hsl(${project.color} / 0.5))`,
            }}
          >
            <div className="absolute inset-0 bg-white/10 rounded-2xl border border-white/20" />
            <span className="relative z-10 text-shadow-sm">
              {project.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-glow">
              {project.name}
            </h1>
            <p className="text-muted-foreground text-base mt-1 font-medium">
              {project.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/5 p-1 rounded-full border border-white/10">
            <AvatarStack members={projectMembers} size="sm" max={5} />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsInviteModalOpen(true)}
            className="bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all rounded-xl h-10 font-semibold"
          >
            <UserPlus className="h-4 w-4 mr-1.5" />
            Invite
          </Button>
          <Button
            onClick={() => openCreateTaskModal()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-glow rounded-xl h-10 px-5 font-semibold transition-all"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add task
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab("board")}
          className={cn(
            "font-bold rounded-lg transition-all",
            activeTab === "board" ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          )}
        >
          <LayoutGrid className="h-4 w-4 mr-2" />
          Board
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab("team")}
          className={cn(
            "font-bold rounded-lg transition-all",
            activeTab === "team" ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          )}
        >
          <Users className="h-4 w-4 mr-2" />
          Team Members
        </Button>
        
        <div className="ml-auto flex items-center gap-2">
          {activeTab === "board" ? (
            <Button
              variant="outline"
              size="sm"
              className="bg-white/[0.02] border-white/10 hover:bg-white/5 rounded-lg"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          ) : (
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input 
                placeholder="Search members..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 bg-white/[0.02] border-white/5 focus:border-primary/50 text-xs rounded-lg" 
              />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "board" ? (
          <motion.div
            key="board"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {columns.map((col) => {
              const colTasks = tasks.filter((t) => t.status === col.id);
              return (
                <div
                  key={col.id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setOverCol(col.id);
                  }}
                  onDragLeave={() => setOverCol((c) => (c === col.id ? null : c))}
                  onDrop={() => onDrop(col.id)}
                  className={cn(
                    "rounded-3xl bg-white/[0.01] border border-white/5 p-4 transition-all min-h-[500px] flex flex-col relative",
                    overCol === col.id &&
                      "bg-white/[0.03] ring-1 ring-primary/50 shadow-[inset_0_0_20px_rgba(0,255,255,0.05)]",
                  )}
                >
                  <div className="flex items-center justify-between mb-4 px-1 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${col.bg}`}>
                        <col.icon
                          className="h-4 w-4"
                          style={{ color: `hsl(${col.color})` }}
                        />
                      </div>
                      <h3 className="font-display text-lg font-bold">
                        {col.title}
                      </h3>
                      <span className="text-xs font-semibold text-muted-foreground bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                        {colTasks.length}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10 flex-1">
                    {colTasks.map((t) => (
                      <div key={t.id} className="relative group">
                        <button
                          draggable
                          onDragStart={() => setDraggedId(t.id)}
                          onDragEnd={() => {
                            setDraggedId(null);
                            setOverCol(null);
                          }}
                          onClick={() => openCreateTaskModal(t)}
                          className={cn(
                            "w-full text-left rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/5 p-4 shadow-bento hover:bg-white/[0.04] hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing",
                            draggedId === t.id && "opacity-40 rotate-2 scale-95",
                          )}
                        >
                          {t.labels.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {t.labels.map((l) => (
                                <span
                                  key={l.name}
                                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-current/10"
                                  style={{
                                    background: `hsl(${l.color} / 0.1)`,
                                    color: `hsl(${l.color})`,
                                  }}
                                >
                                  {l.name}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="text-[15px] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors pr-8">
                            {t.title}
                          </p>
                          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                                <Calendar className="h-3.5 w-3.5" />
                                {t.dueDate}
                              </span>
                            </div>
                            <UserAvatar
                              member={t.assignee}
                              size="xs"
                              className="ring-2 ring-transparent group-hover:ring-white/10 transition-all"
                            />
                          </div>
                        </button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 h-7 w-7 opacity-0 group-hover:opacity-100 transition-all bg-destructive/10 hover:bg-destructive text-destructive hover:text-white rounded-lg border border-destructive/20 z-20 shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTaskId(t.id);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    <button
                      onClick={() => openCreateTaskModal()}
                      className="w-full rounded-2xl border-2 border-dashed border-white/10 bg-transparent hover:bg-white/[0.02] py-4 text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center gap-2 group"
                    >
                      <div className="p-1 rounded-md bg-white/5 group-hover:bg-primary/20 transition-colors">
                        <Plus className="h-4 w-4 group-hover:text-primary transition-colors" />
                      </div>
                      Add task
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="surface overflow-hidden border border-white/10 bg-white/[0.01] shadow-bento"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    <th className="px-6 py-4">Member Info</th>
                    <th className="px-6 py-4 hidden md:table-cell">Email Address</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <UserAvatar member={m} size="md" className="ring-2 ring-transparent group-hover:ring-primary/20 transition-all" />
                          <div>
                            <p className="font-bold text-[15px] group-hover:text-primary transition-colors">{m.name}</p>
                            <p className="text-[10px] text-muted-foreground md:hidden mt-0.5">{m.email}</p>
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
                            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                              <ShieldAlert className="w-3 h-3" />
                              Admin
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground border border-white/5">
                              Member
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                            onClick={() => handleChangeRole(m.id, m.role === "Admin" ? "Member" : "Admin")}
                          >
                            <ArrowLeftRight className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
                            onClick={() => handleRemoveMember(m.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={() => deleteTaskId && handleDeleteTask(deleteTaskId)}
        variant="danger"
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete Task"
      />

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        projectName={project.name}
      />
    </AppLayout>
  );
};

export default ProjectDetails;
