import { AppLayout } from "@/components/AppLayout";
import { CheckCircle2, Clock, AlertCircle, ListTodo, ArrowUpRight, MoreHorizontal, Plus, Activity } from "lucide-react";
import { activity, initialTasks, projects, members } from "@/lib/mock-data";
import { UserAvatar, AvatarStack } from "@/components/UserAvatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const kpis = [
  { label: "Total tasks", value: "128", trend: "+12%", icon: ListTodo, color: "175 100% 50%" }, // Cyan
  { label: "Completed", value: "84", trend: "+8%", icon: CheckCircle2, color: "150 100% 50%" }, // Emerald
  { label: "In progress", value: "32", trend: "+3%", icon: Clock, color: "35 100% 55%" }, // Amber
  { label: "Overdue", value: "12", trend: "-2%", icon: AlertCircle, color: "0 100% 65%" }, // Red
];

const chartData = [
  { d: "Mon", v: 12 }, { d: "Tue", v: 18 }, { d: "Wed", v: 14 }, { d: "Thu", v: 22 },
  { d: "Fri", v: 28 }, { d: "Sat", v: 16 }, { d: "Sun", v: 24 },
];

const Dashboard = () => {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-3">
          <span>Good morning, Alex</span>
          <span className="text-xl px-2 py-1 bg-white/5 rounded-lg border border-white/10 text-muted-foreground animate-pulse-slow">👋</span>
        </div>
      }
      subtitle="Here's what's happening across your workspace today."
      action={
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-glow h-11 px-5 rounded-xl transition-all">
          <Plus className="h-4 w-4 mr-2" />New task
        </Button>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((k) => (
          <div key={k.label} className="surface p-5 hover:shadow-glow transition-all group cursor-default">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors" style={{ background: `hsl(${k.color} / 0.05)` }} />
            <div className="flex items-start justify-between relative z-10">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center shadow-inner border border-white/5"
                style={{ background: `hsl(${k.color} / 0.1)`, color: `hsl(${k.color})` }}>
                <k.icon className="h-6 w-6" />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${k.trend.startsWith("+") ? "bg-success/10 text-success border border-success/20" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
                {k.trend}
              </span>
            </div>
            <p className="text-4xl font-display font-bold mt-6 tracking-tight relative z-10">{k.value}</p>
            <p className="text-sm font-medium text-muted-foreground mt-1 relative z-10">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Chart */}
        <div className="surface p-6 lg:col-span-2 flex flex-col group">
          <div className="absolute top-0 right-1/4 w-64 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="flex items-start justify-between mb-8 relative z-10">
            <div>
              <h3 className="font-display text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" /> Task Velocity
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Tasks completed over the last 7 days</p>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground bg-white/[0.02] border border-white/5 rounded-lg">
              This week <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>
          <div className="flex-1 min-h-[240px] w-full relative z-10 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 500 }} dy={10} />
                <Tooltip 
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 13, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                  itemStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                  cursor={{ stroke: "hsl(var(--primary) / 0.2)", strokeWidth: 2, strokeDasharray: "4 4" }}
                />
                <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#g1)" activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity */}
        <div className="surface p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="font-display text-xl font-bold">Live Activity</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5"><MoreHorizontal className="h-5 w-5 text-muted-foreground" /></Button>
          </div>
          <div className="space-y-5 relative z-10">
            {activity.map((a, i) => (
              <div key={a.id} className="flex gap-4 group">
                <div className="relative">
                  <UserAvatar member={a.user} size="sm" className="ring-2 ring-background z-10 relative" />
                  {i !== activity.length - 1 && (
                    <div className="absolute top-8 bottom-[-20px] left-1/2 w-px bg-white/10 -translate-x-1/2" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm leading-snug">
                    <span className="font-semibold text-foreground">{a.user.name}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium text-foreground">{a.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1 font-medium">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent tasks + Projects */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6 pb-6">
        <div className="surface p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="font-display text-xl font-bold">Recent Tasks</h3>
            <Link to="/tasks" className="text-sm font-medium text-primary hover:text-glow transition-all">View all</Link>
          </div>
          <div className="space-y-1 relative z-10">
            {initialTasks.slice(0, 5).map((t) => (
              <div key={t.id} className="p-3 flex items-center gap-4 hover:bg-white/[0.03] rounded-xl transition-all cursor-pointer group border border-transparent hover:border-white/5">
                <div className={`h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor] ${t.status === "done" ? "bg-success text-success" : t.status === "in-progress" ? "bg-warning text-warning" : "bg-muted-foreground/40 text-transparent"}`} />
                <p className="flex-1 text-sm font-medium truncate group-hover:text-primary transition-colors">{t.title}</p>
                <div className="flex items-center gap-2">
                  {t.labels.map((l) => (
                    <span key={l.name} className="text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-wide border border-current/10" style={{ background: `hsl(${l.color} / 0.1)`, color: `hsl(${l.color})` }}>{l.name}</span>
                  ))}
                </div>
                <span className="text-xs font-medium text-muted-foreground hidden md:inline w-16 text-right group-hover:text-foreground transition-colors">{t.dueDate}</span>
                <UserAvatar member={t.assignee} size="sm" className="opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        <div className="surface p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="font-display text-xl font-bold">Active Projects</h3>
            <Link to="/projects" className="text-sm font-medium text-primary hover:text-glow transition-all">All projects</Link>
          </div>
          <div className="space-y-4 relative z-10">
            {projects.slice(0, 3).map((p) => {
              const pct = Math.round((p.completedTasks / p.totalTasks) * 100);
              return (
                <Link key={p.id} to={`/projects/${p.id}`} className="block group bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all hover:bg-primary/[0.02]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-md shadow-[0_0_8px_currentColor]" style={{ background: `hsl(${p.color})`, color: `hsl(${p.color})` }} />
                      <span className="text-sm font-bold group-hover:text-primary transition-colors">{p.name}</span>
                    </div>
                    <AvatarStack members={p.members} size="xs" max={3} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={pct} className="h-2 bg-white/5" />
                    <span className="text-xs font-semibold text-muted-foreground tabular-nums w-9 text-right">{pct}%</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
