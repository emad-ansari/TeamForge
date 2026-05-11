import { cn } from "@/lib/utils";


export const UserAvatar = ({ member, size = "md", className }: { member: any; size?: "xs" | "sm" | "md" | "lg"; className?: string }) => {
  const sizes = { xs: "h-5 w-5 text-[9px]", sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-12 w-12 text-sm" };
  
  const initials = member.initials || member.name?.split(" ").map((n: any) => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  const color = member.color || "246 83% 60%";

  return (
    <div
      className={cn("rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-card shrink-0", sizes[size], className)}
      style={{ background: `linear-gradient(135deg, hsl(${color}), hsl(${color} / 0.7))` }}
      title={member.name}
    >
      {initials}
    </div>
  );
};

export const AvatarStack = ({ members, max = 4, size = "sm" }: { members: any[]; max?: number; size?: "xs" | "sm" | "md" }) => {
  const visible = members.slice(0, max);
  const extra = members.length - visible.length;
  return (
    <div className="flex -space-x-2">
      {visible.map((m) => <UserAvatar key={m.id} member={m} size={size} />)}
      {extra > 0 && (
        <div className={cn("rounded-full bg-muted text-muted-foreground font-semibold flex items-center justify-center ring-2 ring-card",
          size === "xs" ? "h-5 w-5 text-[9px]" : size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs")}>
          +{extra}
        </div>
      )}
    </div>
  );
};
