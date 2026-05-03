import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, Trash2 } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "default";
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="surface border-white/10 shadow-2xl max-w-[400px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
        
        <AlertDialogHeader className="pt-2">
          <div className="flex items-center gap-4 mb-2">
            <div className={cn(
              "h-12 w-12 rounded-2xl flex items-center justify-center border transition-all",
              variant === "danger" ? "bg-destructive/10 border-destructive/20 text-destructive shadow-[0_0_15px_rgba(239,68,68,0.1)]" : 
              variant === "warning" ? "bg-warning/10 border-warning/20 text-warning shadow-[0_0_15px_rgba(245,158,11,0.1)]" :
              "bg-primary/10 border-primary/20 text-primary shadow-[0_0_15px_rgba(0,255,255,0.1)]"
            )}>
              {variant === "danger" ? <Trash2 className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
            </div>
            <AlertDialogTitle className="font-display text-xl font-bold text-foreground">
              {title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-muted-foreground text-sm leading-relaxed px-1">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-8 gap-3">
          <AlertDialogCancel 
            onClick={onClose}
            className="rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all h-11 px-6 font-semibold"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className={cn(
              "rounded-xl h-11 px-6 font-semibold transition-all shadow-glow min-w-[120px]",
              variant === "danger" ? "bg-destructive hover:bg-destructive/90 text-white border-0" : 
              "bg-primary hover:bg-primary/90 text-primary-foreground border-0"
            )}
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
