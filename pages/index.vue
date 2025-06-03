<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Hero Section -->
      <section class="text-center space-y-6">
        <h1 class="text-4xl sm:text-5xl font-bold text-slate-900">
          Discover the Best Products on the Web
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore curated collections of trending apps, tools, and tech. Upvote
          your favorites and join the community.
        </p>
        <NuxtLink
          to="/submit"
          class="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-xl font-medium transition hover:bg-teal-700 shadow-md"
        >
          Submit Your Product
        </NuxtLink>
      </section>

      <!-- Trending Products -->
      <section class="mt-20">
        <h2 class="text-3xl font-bold text-slate-900 mb-6 text-center">
          Trending Products
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(product, index) in allProducts.slice(0, 6)"
            :key="index"
            class="bg-white border border-slate-200 rounded-2xl shadow hover:shadow-md transition overflow-hidden"
          >
            <NuxtLink :to="`/product/${product.slug}`">
              <div class="aspect-video overflow-hidden">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div class="p-4 space-y-2">
                <h3 class="text-lg font-semibold text-slate-900">
                  {{ product.name }}
                </h3>
                <p class="text-slate-600 text-sm">
                  {{ product.tagline }}
                </p>
                <div class="flex items-center justify-between text-sm pt-2">
                  <span
                    class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full"
                    >{{ product.category }}</span
                  >
                  <span class="text-amber-500 font-medium">⭐ 4.8</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="mt-6 text-center">
          <NuxtLink
            to="/explore"
            class="bg-teal-500 font-medium hover:bg-teal-600 text-white px-6 py-2 rounded-lg"
            >Explore more</NuxtLink
          >
        </div>
      </section>

      <!-- Call to Action -->
      <section class="mt-24 text-center">
        <h3 class="text-2xl font-bold text-slate-900">
          Join 10,000+ Product Lovers
        </h3>
        <p class="text-slate-600 mt-2">
          Get weekly updates on trending products.
        </p>
        <form @submit.prevent class="mt-4 flex justify-center gap-2 flex-wrap">
          <input
            type="email"
            placeholder="Enter your email"
            class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 w-64"
          />
          <button
            type="submit"
            class="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const allProducts = ref([]);

const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    allProducts.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

watchEffect(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Add any additional shadcn-based or custom styles here if needed */
</style>
