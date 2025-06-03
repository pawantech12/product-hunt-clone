import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;

  // Simulate user registration
  const token = crypto.randomUUID();
  const user = {
    id: Date.now(),
    name,
    email,
  };

  return { token, user };
});
