export type Member = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member";
  avatar: string;
  initials: string;
  color: string;
};

export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignee: Member;
  dueDate: string;
  labels: { name: string; color: string }[];
  projectId: string;
  comments?: { author: Member; text: string; time: string }[];
  subtasks?: { title: string; done: boolean }[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  color: string;
  members: Member[];
  totalTasks: number;
  completedTasks: number;
};

export const members: Member[] = [
  { id: "u1", name: "Alex Morgan", email: "alex@taskly.io", role: "Admin", avatar: "", initials: "AM", color: "246 83% 60%" },
  { id: "u2", name: "Sara Chen", email: "sara@taskly.io", role: "Member", avatar: "", initials: "SC", color: "158 64% 42%" },
  { id: "u3", name: "Marco Diaz", email: "marco@taskly.io", role: "Member", avatar: "", initials: "MD", color: "38 92% 50%" },
  { id: "u4", name: "Jules Park", email: "jules@taskly.io", role: "Admin", avatar: "", initials: "JP", color: "0 72% 55%" },
  { id: "u5", name: "Priya Nair", email: "priya@taskly.io", role: "Member", avatar: "", initials: "PN", color: "265 83% 65%" },
  { id: "u6", name: "Tomás Reyes", email: "tomas@taskly.io", role: "Member", avatar: "", initials: "TR", color: "190 80% 45%" },
];

export const projects: Project[] = [
  { id: "p1", name: "Mobile App Redesign", description: "Refresh the iOS and Android apps with the new design system.", color: "246 83% 60%", members: [members[0], members[1], members[2]], totalTasks: 24, completedTasks: 14 },
  { id: "p2", name: "Marketing Website", description: "Launch the new marketing site with updated brand guidelines.", color: "158 64% 42%", members: [members[3], members[4]], totalTasks: 18, completedTasks: 9 },
  { id: "p3", name: "Q3 Product Launch", description: "Coordinate the cross-functional product launch for Q3.", color: "38 92% 50%", members: [members[0], members[3], members[5]], totalTasks: 32, completedTasks: 20 },
  { id: "p4", name: "Customer Onboarding", description: "Streamline onboarding flows and improve activation.", color: "265 83% 65%", members: [members[1], members[2], members[4], members[5]], totalTasks: 12, completedTasks: 4 },
  { id: "p5", name: "Internal Tools", description: "Modernize internal admin and analytics tools.", color: "190 80% 45%", members: [members[2], members[5]], totalTasks: 16, completedTasks: 11 },
  { id: "p6", name: "Brand Refresh", description: "Update logo system, typography and visual identity.", color: "0 72% 55%", members: [members[3], members[4], members[0]], totalTasks: 9, completedTasks: 6 },
];

export const initialTasks: Task[] = [
  { id: "t1", title: "Design new onboarding flow", description: "Sketch and prototype the new onboarding experience for new sign-ups.", status: "todo", assignee: members[1], dueDate: "May 12", labels: [{ name: "Design", color: "246 83% 60%" }], projectId: "p1",
    subtasks: [{ title: "User research", done: true }, { title: "Wireframes", done: false }, { title: "High-fidelity mockups", done: false }],
    comments: [{ author: members[0], text: "Let's align on the user flow before mocks.", time: "2h ago" }] },
  { id: "t2", title: "Audit current navigation", status: "todo", assignee: members[2], dueDate: "May 10", labels: [{ name: "Research", color: "265 83% 65%" }], projectId: "p1" },
  { id: "t3", title: "Set up component library", status: "todo", assignee: members[0], dueDate: "May 15", labels: [{ name: "Frontend", color: "190 80% 45%" }], projectId: "p1" },
  { id: "t4", title: "Implement login screen", status: "in-progress", assignee: members[2], dueDate: "May 8", labels: [{ name: "Frontend", color: "190 80% 45%" }, { name: "Auth", color: "38 92% 50%" }], projectId: "p1" },
  { id: "t5", title: "API: tasks endpoint", status: "in-progress", assignee: members[5], dueDate: "May 9", labels: [{ name: "Backend", color: "158 64% 42%" }], projectId: "p1" },
  { id: "t6", title: "Brand color exploration", status: "done", assignee: members[1], dueDate: "May 2", labels: [{ name: "Design", color: "246 83% 60%" }], projectId: "p1" },
  { id: "t7", title: "Competitor analysis", status: "done", assignee: members[3], dueDate: "Apr 28", labels: [{ name: "Research", color: "265 83% 65%" }], projectId: "p1" },
  { id: "t8", title: "Kickoff meeting notes", status: "done", assignee: members[0], dueDate: "Apr 25", labels: [{ name: "Docs", color: "0 72% 55%" }], projectId: "p1" },
];

export const activity = [
  { id: "a1", user: members[1], action: "completed", target: "Brand color exploration", time: "12m ago" },
  { id: "a2", user: members[2], action: "commented on", target: "Implement login screen", time: "1h ago" },
  { id: "a3", user: members[0], action: "created project", target: "Mobile App Redesign", time: "3h ago" },
  { id: "a4", user: members[3], action: "assigned", target: "Audit current navigation", time: "5h ago" },
  { id: "a5", user: members[5], action: "updated", target: "API: tasks endpoint", time: "Yesterday" },
];
