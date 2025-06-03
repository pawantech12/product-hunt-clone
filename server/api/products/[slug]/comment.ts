import { defineEventHandler, readBody, createError } from "h3";
import { products } from "../../products";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug param is required",
    });
  }

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }

  const body = await readBody(event);
  const { user, message } = body;

  if (!user || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name and message are required",
    });
  }

  const newComment = {
    id: uuidv4(),
    text: message,
    user: { name: user },
    createdAt: new Date().toISOString(),
  };

  product.comments = product.comments || [];
  product.comments.push(newComment);

  return { success: true, comments: product.comments };
});
