import { pgTable, text, timestamp, uuid, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password"),
    avatar: text("avatar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const projects = pgTable("projects",{
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    status: text("status").default("active").notNull(),
    themeColor: text("theme_color").default("#fff").notNull(),
    createdBy: uuid("created_by").notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const tasks = pgTable("tasks",{
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: text("status").default("todo").notNull(),
    projectId: uuid("project_id").notNull().references(() => projects.id),
    assigneeId: uuid("assignee_id").references(() => users.id),
    label: text("Design"),
    dueDate: timestamp("due_date").notNull(),
    createdBy: uuid("created_by").notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})


export const projectMembers = pgTable("project_members", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),

  role: text("role")
    .notNull()
    .default("MEMBER"), // ADMIN | MEMBER

  joinedAt: timestamp("joined_at")
    .defaultNow()
    .notNull(),
}, (table) => {
  return {
    uniqueUserProject: unique().on(table.userId, table.projectId),
  };
});


export const projectInvites = pgTable("project_invites", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email").notNull(),

  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),

  invitedBy: uuid("invited_by")
    .notNull()
    .references(() => users.id),

  role: text("role").default("MEMBER").notNull(),

  status: text("status") // pending, accepted, expired
    .default("pending")
    .notNull(),

  token: text("token").notNull().unique(),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),

  action: text("action").notNull(), 
  // e.g. "TASK_CREATED", "TASK_UPDATED"

  message: text("message").notNull(), 
  // human readable text

  projectId: uuid("project_id")
    .references(() => projects.id),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  taskId: uuid("task_id")
    .references(() => tasks.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});