import { pgTable, text, timestamp, uuid, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password"),
    avatar: text("avatar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const projects = pgTable("projects",{
    id: uuid("id").primaryKey(),
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