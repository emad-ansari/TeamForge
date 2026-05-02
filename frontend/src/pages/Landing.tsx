import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  LayoutDashboard,
  Zap,
  Shield,
  Sparkles,
  CircleCheckBig,
  Command,
  Workflow,
  BarChart3,
  Globe
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import { members } from "@/lib/mock-data";
import { FaGithub } from "react-icons/fa";
import { Navbar1 } from "@/components/ui/navbar-1";
import { HeroSection } from "@/components/ui/hero-section-1";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground overflow-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-success/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[60%] h-[60%] rounded-full bg-gradient-hero blur-[100px] animate-pulse-slow opacity-60" />
        
        {/* Subtle Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Nav */}
      <div className="fixed top-0 w-full z-50">
        <Navbar1 />
      </div>

      <main className="relative z-10">
        {/* Hero */}
        <HeroSection />

        {/* Features Bento Grid */}
        <section id="features" className="py-24 md:py-32 relative">
          <div className="container">
            <div className="max-w-3xl mb-16">
              <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
                <Workflow className="w-4 h-4" /> The Execution Engine
              </h2>
              <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Designed for speed.<br />Built for scale.
              </h3>
              <p className="text-xl text-muted-foreground">
                Everything you need to orchestrate complex projects, without the bloated interface of legacy tools.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 auto-rows-[280px]">
              {/* Feature 1 - Large */}
              <div className="md:col-span-2 glass-card rounded-3xl p-8 group relative flex flex-col justify-between">
                <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
                <div className="relative z-10 max-w-sm">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-2xl font-bold mb-3">Keyboard-first Navigation</h4>
                  <p className="text-muted-foreground">Navigate, assign, and update tasks entirely from your keyboard with our powerful command palette. Fly through your workflow.</p>
                </div>
                <div className="mt-8 relative h-32 overflow-hidden rounded-xl border border-white/10 bg-black/50">
                   <div className="absolute inset-x-4 top-4 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center px-4">
                     <span className="text-primary mr-2">{'>'}</span>
                     <span className="text-white/80 typing-animation">Assign "Q3 Launch" to @sarah...</span>
                   </div>
                </div>
              </div>

              {/* Feature 2 - Small */}
              <div className="glass-card rounded-3xl p-8 group flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-success">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl font-bold mb-3">Real-time Velocity</h4>
                <p className="text-muted-foreground mb-auto">Auto-generated sprint reports and burn-down charts that actually make sense.</p>
                <div className="flex items-end gap-2 mt-6 h-16">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-success/20 to-success rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* Feature 3 - Small */}
              <div className="glass-card rounded-3xl p-8 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-warning">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl font-bold mb-3">Global Sync</h4>
                <p className="text-muted-foreground">Multi-region database replication ensures sub-50ms latency no matter where your team is.</p>
              </div>

              {/* Feature 4 - Large */}
              <div className="md:col-span-2 glass-card rounded-3xl p-8 group relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="flex flex-col md:flex-row gap-8 relative z-10 h-full">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="font-display text-2xl font-bold mb-3">AI Context Engine</h4>
                    <p className="text-muted-foreground">Our AI automatically surfaces relevant docs, past decisions, and code PRs precisely when you open a task.</p>
                  </div>
                  <div className="flex-1 bg-black/40 rounded-xl border border-white/10 p-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
                    <div className="space-y-3 relative z-10">
                      <div className="flex gap-3 items-start p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-white/90">Based on this ticket, you might need:</p>
                          <div className="mt-2 flex gap-2">
                            <span className="text-xs bg-white/10 px-2 py-1 rounded">auth-api.ts</span>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded">PR #402</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative">
          <div className="container">
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#09090b] p-12 md:p-24 text-center glass-card">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.15),transparent_50%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent" />
              
              <div className="relative z-10">
                <Command className="w-12 h-12 mx-auto text-primary mb-8" />
                <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight mb-6">
                  Ready to move <span className="hero-text-gradient">faster?</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                  Join the elite teams building the future on TeamForge. Set up in minutes. Free for up to 10 users.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow border-0 h-14 px-8 text-base rounded-full w-full sm:w-auto"
                  >
                    <Link to="/signup">
                      Start your workspace
                    </Link>
                  </Button>
                  <span className="text-sm text-muted-foreground px-4">No credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-background relative z-10">
        <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative flex h-6 w-6 items-center justify-center rounded bg-linear-to-br from-primary to-success">
              <Command className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold tracking-tight text-white/90">TeamForge</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Product</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">Security</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
