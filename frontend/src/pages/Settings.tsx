import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/UserAvatar";
import { members } from "@/lib/mock-data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Camera, Settings2, Shield, User, Palette, AlertOctagon } from "lucide-react";

const Section = ({ title, desc, icon: Icon, children }: { title: string; desc: string; icon: any; children: React.ReactNode }) => (
  <div className="grid md:grid-cols-3 gap-8 py-10 border-b border-white/5 last:border-0 relative">
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-muted-foreground">
           <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-display font-bold text-lg text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs">{desc}</p>
    </div>
    <div className="md:col-span-2 space-y-6 relative z-10">{children}</div>
  </div>
);

const Settings = () => {
  const me = members[0];
  return (
    <AppLayout 
      title={
        <div className="flex items-center gap-3">
          <Settings2 className="w-8 h-8 text-primary" />
          <span>Settings</span>
        </div>
      } 
      subtitle="Manage your profile, security, and workspace preferences."
    >
      <div className="surface px-8 lg:px-12 py-4 max-w-5xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/5 rounded-full blur-[100px] pointer-events-none" />

        <Section title="Profile Information" desc="This is how others will see you across the TeamForge workspace." icon={User}>
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="relative group cursor-pointer">
              <UserAvatar member={me} size="lg" className="w-20 h-20 ring-4 ring-background shadow-xl group-hover:opacity-50 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 <Camera className="w-6 h-6 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground border-2 border-background shadow-glow flex items-center justify-center hover:scale-110 transition-transform">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <p className="font-bold text-lg">{me.name}</p>
              <p className="text-sm text-muted-foreground">We support PNG, JPG or GIF up to 5MB.</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full name</Label>
              <Input id="name" defaultValue={me.name} className="h-11 bg-white/[0.02] border-white/10 focus:border-primary/50 focus:bg-white/[0.04] transition-all" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email address</Label>
              <Input id="email" defaultValue={me.email} className="h-11 bg-white/[0.02] border-white/10 focus:border-primary/50 focus:bg-white/[0.04] transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Biography</Label>
            <Textarea id="bio" placeholder="Tell your team a bit about yourself…" className="min-h-[100px] bg-white/[0.02] border-white/10 focus:border-primary/50 focus:bg-white/[0.04] transition-all resize-none" />
          </div>
          <div className="flex justify-end pt-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-glow h-10 px-6 rounded-lg transition-all">Save changes</Button>
          </div>
        </Section>

        <Section title="Security" desc="Update your password and configure advanced security features to keep your account safe." icon={Shield}>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="cp" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current password</Label>
            <Input id="cp" type="password" placeholder="••••••••" className="h-11 bg-white/[0.02] border-white/10 focus:border-primary/50 focus:bg-white/[0.04] transition-all" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="np" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">New password</Label>
              <Input id="np" type="password" placeholder="••••••••" className="h-11 bg-white/[0.02] border-white/10 focus:border-primary/50 focus:bg-white/[0.04] transition-all" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnp" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm new password</Label>
              <Input id="cnp" type="password" placeholder="••••••••" className="h-11 bg-white/[0.02] border-white/10 focus:border-primary/50 focus:bg-white/[0.04] transition-all" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="outline" className="h-10 px-6 bg-white/[0.02] border-white/10 hover:bg-white/5 hover:text-foreground transition-all">Update password</Button>
          </div>
        </Section>

        <Section title="Appearance" desc="Customize how TeamForge looks on this device." icon={Palette}>
          <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div>
              <p className="font-bold text-base">Interface Theme</p>
              <p className="text-sm text-muted-foreground mt-1">Select your preferred color scheme.</p>
            </div>
            <ThemeToggle />
          </div>
        </Section>

        <Section title="Danger Zone" desc="Permanently delete your account and all associated data. This action is irreversible." icon={AlertOctagon}>
          <div className="flex items-center justify-between p-6 rounded-2xl border border-destructive/30 bg-destructive/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-destructive/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="relative z-10">
              <p className="font-bold text-base text-destructive">Delete Account</p>
              <p className="text-sm text-destructive/70 mt-1">Once you delete your account, there is no going back.</p>
            </div>
            <Button variant="destructive" className="relative z-10 shadow-[0_0_15px_rgba(255,0,0,0.3)] border-0">Delete completely</Button>
          </div>
        </Section>
      </div>
    </AppLayout>
  );
};

export default Settings;
