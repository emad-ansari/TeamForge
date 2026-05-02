import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
  Plus,
  Search,
  Bell,
  ChevronsLeft,
  Command,
} from "lucide-react";
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { members } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { ProjectModal } from "./ProjectModal";
import { CreateTaskModal } from "./CreateTaskModal";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import { useTaskModal } from "@/contexts/TaskModalContext";
import { Input } from "./ui/input";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/team", label: "Team", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const AppLayout = ({
  children,
  title,
  subtitle,
  action,
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isOpen: isProjectModalOpen, openProjectModal, closeProjectModal } = useProjectModal();
  const { isCreateTaskOpen, openCreateTaskModal, closeCreateTaskModal } = useTaskModal();
  const location = useLocation();
  const me = members[0];

  return (
    <div className="min-h-screen flex w-full bg-background selection:bg-primary/30 selection:text-primary-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-white/5 bg-[#09090b]/40 backdrop-blur-3xl transition-all duration-300 relative z-40",
          collapsed ? "w-[80px]" : "w-[260px]",
        )}
      >
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
        
        <div
          className={cn(
            "h-20 flex items-center px-6",
            collapsed && "justify-center px-2",
          )}
        >
          {collapsed ? (
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success shadow-glow">
               <Command className="w-5 h-5 text-primary-foreground" />
            </div>
          ) : (
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-success shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                <Command className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold tracking-tight text-lg text-white/90 group-hover:text-glow transition-all duration-300">TeamForge</span>
            </div>
          )}
        </div>

        <div className="px-4 py-6">
          {!collapsed ? (
            <Button 
              onClick={openCreateTaskModal}
              className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 h-11 rounded-xl"
            >
              <Plus className="h-4 w-4" /> New task
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={openCreateTaskModal}
              className="w-12 h-12 mx-auto bg-primary hover:bg-primary/90 shadow-glow border-0 rounded-xl flex items-center justify-center"
            >
              <Plus className="h-5 w-5" />
            </Button>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {!collapsed && (
            <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              Workspace
            </p>
          )}
          {nav.map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to === "/projects" &&
                location.pathname.startsWith("/projects"));
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group relative overflow-hidden",
                  active
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  collapsed && "justify-center px-2",
                )}
              >
                {active && !collapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full" />
                )}
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}

          {!collapsed && (
            <div className="pt-8">
              <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center justify-between">
                Projects
                <Plus 
                  className="w-3.5 h-3.5 hover:text-foreground cursor-pointer transition-colors" 
                  onClick={openProjectModal}
                />
              </p>
              <div className="space-y-1">
                {[
                  { c: "175 100% 50%", n: "Bioluminescent UI", id: "p1" },
                  { c: "150 100% 50%", n: "Backend Sync", id: "p2" },
                  { c: "35 100% 55%", n: "Marketing Launch", id: "p3" },
                ].map((p) => (
                  <NavLink
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all group",
                        isActive
                          ? "text-foreground bg-white/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]",
                      )
                    }
                  >
                    <span
                      className="h-2 w-2 rounded-full shadow-[0_0_10px_currentColor] opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ background: `hsl(${p.c})`, color: `hsl(${p.c})` }}
                    />
                    <span className="truncate">{p.n}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all group",
              collapsed && "justify-center px-0",
            )}
          >
            <ChevronsLeft
              className={cn(
                "h-5 w-5 transition-transform group-hover:-translate-x-1",
                collapsed && "rotate-180 group-hover:translate-x-1",
              )}
            />
            {!collapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <header className="h-20 border-b border-white/5 bg-background/50 backdrop-blur-2xl sticky top-0 z-30 supports-[backdrop-filter]:bg-background/20">
          <div className="h-full px-8 flex items-center gap-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks, projects, commands... (Press ⌘K)"
                className="pl-10 h-11 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:bg-white/[0.05] rounded-xl transition-all font-medium text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative hover:bg-white/5 rounded-full w-10 h-10">
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              </Button>
              <div className="h-8 w-px bg-white/10 mx-1" />
              <div className="flex items-center gap-3 pl-1 cursor-pointer group">
                <div className="hidden lg:flex flex-col items-end">
                  <p className="text-sm font-semibold leading-none group-hover:text-glow transition-colors">
                    {me.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {me.role}
                  </p>
                </div>
                <div className="ring-2 ring-transparent group-hover:ring-primary/50 rounded-full transition-all">
                   <UserAvatar member={me} size="sm" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {(title || action) && (
          <div className="px-8 pt-10 pb-4 flex items-end justify-between gap-4 flex-wrap relative z-10 animate-fade-in">
            <div>
              {title && (
                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-muted-foreground text-lg mt-2">{subtitle}</p>
              )}
            </div>
            {action}
          </div>
        )}

        <main className="flex-1 px-8 py-6 relative z-10 animate-slide-up-delayed-1">{children}</main>
      </div>
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={closeProjectModal} 
      />
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={closeCreateTaskModal}
      />
    </div>
  );
};
