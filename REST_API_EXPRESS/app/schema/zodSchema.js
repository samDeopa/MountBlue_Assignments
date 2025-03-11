import zod from "zod";

const tutorialSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  published: zod.boolean(),
});

const updateSchema = zod.object({
  title: zod.string().optional(),
  description: zod.string().optional(),
  published: zod.boolean().optional(),
});
export { tutorialSchema, updateSchema };
