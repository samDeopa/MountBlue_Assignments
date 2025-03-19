import {
  mysqlTable,
  mysqlSchema,
  index,
  foreignKey,
  int,
  text,
  timestamp,
  varchar,
  date,
  tinyint,
} from "drizzle-orm/mysql-core";

export const comments = mysqlTable(
  "comments",
  {
    id: int().autoincrement().notNull(),
    content: text().notNull(),
    postedAt: timestamp("posted_at", { mode: "string" }).default(
      "current_timestamp()"
    ),
    user_id: int("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    project_id: int("project_id")
      .default("NULL")
      .references(() => projects.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    task_id: int("task_id")
      .default("NULL")
      .references(() => tasks.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
  },
  (table) => [
    index("project_id").on(table.project_id),
    index("task_id").on(table.task_id),
    index("user_id").on(table.user_id),
  ]
);

export const projects = mysqlTable("projects", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  color: varchar({ length: 255 }).notNull(),
  isFavorite: tinyint("is_favorite").notNull(),
  user_id: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" }),
});

export const tasks = mysqlTable(
  "tasks",
  {
    id: int().autoincrement().notNull(),
    content: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dueDate: date("due_date", { mode: "string" }).notNull(),
    isCompleted: tinyint("is_completed").notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    createdAt: date("created_at", { mode: "string" }).notNull(),
    project_id: int("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
  },
  (table) => [index("project_id").on(table.project_id)]
);

export const users = mysqlTable("users", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
});
