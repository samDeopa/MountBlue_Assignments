import { relations } from "drizzle-orm/relations";
import { projects, comments, tasks, users } from "./schema";

export const commentsRelations = relations(comments, ({ one }) => ({
  project: one(projects, {
    fields: [comments.project_id],
    references: [projects.id],
  }),
  task: one(tasks, {
    fields: [comments.task_id],
    references: [tasks.id],
  }),
  user: one(users, {
    fields: [comments.user_id],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  comments: many(comments),
  user: one(users, {
    fields: [projects.user_id],
    references: [users.id],
  }),
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  comments: many(comments),
  project: one(projects, {
    fields: [tasks.project_id],
    references: [projects.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  comments: many(comments),
  projects: many(projects),
}));
