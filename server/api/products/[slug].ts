import { defineEventHandler, createError } from "h3";
import { products } from "../products";

export default defineEventHandler((event) => {
  const params = event.context.params;

  if (!params || !params.slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug param is required",
    });
  }

  const slug = params.slug;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }

  return product;
});
