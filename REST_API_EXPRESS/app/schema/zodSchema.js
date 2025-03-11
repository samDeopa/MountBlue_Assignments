const zod = require("zod");

const tutorialSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  published: zod.boolean(),
});
const signinSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
module.exports = { userSchema, updateSchema, signinSchema };
