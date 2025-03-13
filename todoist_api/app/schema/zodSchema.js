import zod from "zod";

const projectSchema = zod.object({
  name: zod.string(),
  color: zod.string(),
  is_favorite: zod.boolean(),
});

const taskSchema = zod.object({
  content: zod.string(),
  description: zod.string(),
  due_date: zod.string(),
  is_completed: zod.boolean(),
  created_at: zod.string(),
  project_id: zod.number(),
});
export { taskSchema, projectSchema };
