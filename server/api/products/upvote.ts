// server/api/products/upvote.ts
import { defineEventHandler, readBody } from "h3";
import { products } from "../products"; // Adjust path as needed if products is in memory

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = body;

  const product = products.find((p) => p.id === id);
  if (product) {
    product.upvotes += 1;
    return { success: true, upvotes: product.upvotes };
  }

  return { success: false, message: "Product not found" };
});
