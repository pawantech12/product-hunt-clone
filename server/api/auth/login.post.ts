import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  // Simulate user validation
  if (email === "demo@email.com" && password === "password") {
    // Generate a fake token (no JWT)
    const token = crypto.randomUUID();
    const user = {
      id: 1,
      name: "Demo User",
      email,
    };

    return {
      statusCode: 200,
      statusMessage: "Success",
      token,
      user,
    };
  }

  return {
    statusCode: 401,
    statusMessage: "Invalid credentials",
  };
});
