import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FolderKanban, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_COLORS = [
  "246 83% 60%", // Purple
  "158 64% 42%", // Green
  "38 92% 50%",  // Orange
  "265 83% 65%", // Violet
  "190 80% 45%", // Cyan
  "0 72% 55%",   // Red
];

export const ProjectModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd call an API here
    console.log("Creating project:", { name, description, color: selectedColor });
    onClose();
    setName("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-white/10 bg-[#09090b]/95 backdrop-blur-3xl shadow-glow sm:rounded-[2rem]">
        <div className="relative p-8">
          {/* Ambient background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/10 blur-3xl pointer-events-none" />
          
          <DialogHeader className="relative z-10 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <FolderKanban className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col items-start">
                <DialogTitle className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Create Project
                </DialogTitle>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  Launch a new workspace for your team
                </p>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Project Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Mobile App Redesign"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="What is this project about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] resize-none bg-white/[0.02] border-white/5 focus:border-primary/50 focus:bg-white/[0.04] rounded-xl transition-all"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Theme Color
              </Label>
              <div className="flex flex-wrap gap-3">
                {PROJECT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "group relative h-8 w-8 rounded-full transition-all duration-300 hover:scale-110",
                      selectedColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#09090b]" : "ring-1 ring-white/10"
                    )}
                    style={{ backgroundColor: `hsl(${color})` }}
                  >
                    {selectedColor === color && (
                      <div 
                        className="absolute inset-0 rounded-full blur-md opacity-60 animate-pulse"
                        style={{ backgroundColor: `hsl(${color})` }}
                      />
                    )}
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
                className="flex-[1.5] h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 font-bold tracking-tight"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Launch Project
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
