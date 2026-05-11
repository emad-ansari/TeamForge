import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { CheckSquare, X, Sparkles, Calendar, User, Tag, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { members as mockMembers } from "@/lib/mock-data";
import type { Task, TaskStatus } from "@/types/task";
import { UserAvatar } from "./UserAvatar";
import { motion, AnimatePresence } from "motion/react";
import { useTaskModal } from "@/contexts/TaskModalContext";
import { useTaskStore } from "@/store/taskStore";
import { useMemberStore } from "@/store/memberStore";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AVAILABLE_LABELS = [
  { name: "Design", color: "246 83% 60%" },
  { name: "Frontend", color: "190 80% 45%" },
  { name: "Backend", color: "158 64% 42%" },
  { name: "Bug", color: "0 72% 55%" },
  { name: "Research", color: "265 83% 65%" },
];

const STATUS_OPTIONS = [
  { id: "todo", label: "To Do", color: "175 100% 50%" },
  { id: "in-progress", label: "In Progress", color: "35 100% 55%" },
  { id: "done", label: "Done", color: "150 100% 50%" },
] as const;

export const CreateTaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { id: projectId } = useParams();
  const { taskToEdit, closeCreateTaskModal } = useTaskModal();
  const { createTask, updateTask } = useTaskStore();
  const { members } = useMemberStore();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [label, setLabel] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setAssigneeId(taskToEdit.assigneeId);
      setStatus(taskToEdit.status);
      setLabel(taskToEdit.label || "");
      // Format date for input if needed, but let's keep it simple for now
      setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : "");
    } else {
      resetForm();
    }
  }, [taskToEdit, isOpen]);

  useEffect(() => {
    if (members.length > 0 && !assigneeId) {
      setAssigneeId(members[0].id);
    }
  }, [members, assigneeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    setIsSubmitting(true);
    const taskData = { 
      title, 
      description, 
      assigneeId, 
      status, 
      label, 
      dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString() 
    };

    try {
      if (taskToEdit) {
        await updateTask(projectId, taskToEdit.id, taskData);
        toast.success("Task updated successfully");
      } else {
        await createTask(projectId, taskData);
        toast.success("Task created successfully");
      }
      onClose();
      resetForm();
    } catch (error: any) {
      console.error("Failed to save task:", error);
      toast.error(error.response?.data?.message || "Failed to save task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    if (members.length > 0) setAssigneeId(members[0].id);
    setStatus("todo");
    setLabel("");
    setDueDate("");
  };

  const selectedAssignee = members.find(m => m.id === assigneeId) || members[0];
  const selectedStatus = STATUS_OPTIONS.find(s => s.id === status) || STATUS_OPTIONS[0];

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border border-white/10 bg-[#09090b]/95 backdrop-blur-3xl shadow-glow sm:rounded-[2rem]">
        <div className="relative p-8">
          {/* Ambient background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
          
          <DialogHeader className="relative z-10 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <CheckSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col items-start">
                <DialogTitle className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {taskToEdit ? "Edit Task" : "New Task"}
                </DialogTitle>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  {taskToEdit ? "Update task details and progress" : "Break down your project into actionable steps"}
                </p>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Task Title
              </Label>
              <Input
                id="title"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-12 bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Custom Assignee Dropdown */}
              <div className="space-y-2 relative">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Assignee
                </Label>
                <button
                  type="button"
                  onClick={() => { setIsAssigneeOpen(!isAssigneeOpen); setIsStatusOpen(false); }}
                  className="w-full flex items-center justify-between h-12 bg-white/[0.02] border border-white/5 hover:border-primary/30 rounded-xl px-4 text-sm font-medium transition-all outline-none"
                >
                  <div className="flex items-center gap-3">
                    {selectedAssignee && <UserAvatar member={selectedAssignee} size="xs" />}
                    <span>{selectedAssignee?.name || "Select Assignee"}</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isAssigneeOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isAssigneeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute z-50 top-full left-0 w-full mt-2 bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1"
                    >
                      {members.map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => { setAssigneeId(m.id); setIsAssigneeOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                        >
                          <UserAvatar member={m} size="xs" />
                          <span className="flex-1 text-sm font-medium">{m.name}</span>
                          {assigneeId === m.id && <Check className="h-4 w-4 text-primary" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Status Dropdown */}
              <div className="space-y-2 relative">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Status
                </Label>
                <button
                  type="button"
                  onClick={() => { setIsStatusOpen(!isStatusOpen); setIsAssigneeOpen(false); }}
                  className="w-full flex items-center justify-between h-12 bg-white/[0.02] border border-white/5 hover:border-primary/30 rounded-xl px-4 text-sm font-medium transition-all outline-none"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: `hsl(${selectedStatus.color})`, color: `hsl(${selectedStatus.color})` }} />
                    <span>{selectedStatus.label}</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isStatusOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isStatusOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute z-50 top-full left-0 w-full mt-2 bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1"
                    >
                      {STATUS_OPTIONS.map(s => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => { setStatus(s.id); setIsStatusOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: `hsl(${s.color})` }} />
                          <span className="flex-1 text-sm font-medium">{s.label}</span>
                          {status === s.id && <Check className="h-4 w-4 text-primary" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Due Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-12 pl-11 bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Add more context to this task…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] resize-none bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <Tag className="w-3 h-3" /> Label
              </Label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_LABELS.map(l => (
                  <button
                    key={l.name}
                    type="button"
                    onClick={() => setLabel(l.name)}
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all duration-200",
                      label === l.name 
                        ? "border-current shadow-glow-sm scale-105" 
                        : "border-white/5 bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10"
                    )}
                    style={{ 
                      color: label === l.name ? `hsl(${l.color})` : undefined,
                      borderColor: label === l.name ? `hsl(${l.color} / 0.5)` : undefined,
                      backgroundColor: label === l.name ? `hsl(${l.color} / 0.1)` : undefined
                    }}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
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
                disabled={isSubmitting}
                className="flex-[1.5] h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 font-bold tracking-tight"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? (taskToEdit ? "Updating..." : "Creating...") : (taskToEdit ? "Update Task" : "Create Task")}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
