<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <!-- Filters & Pagination Header -->
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
    >
      <!-- Filters -->
      <div class="flex flex-wrap gap-4">
        <Select v-model="filters.category">
          <SelectTrigger
            class="w-44 rounded-lg shadow-sm bg-white dark:bg-zinc-900"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem v-for="cat in categories" :key="cat" :value="cat">{{
              cat
            }}</SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="filters.sort">
          <SelectTrigger
            class="w-44 rounded-lg shadow-sm bg-white dark:bg-zinc-900"
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Pagination Controls -->
      <div class="flex items-center gap-3 text-sm">
        <Button
          variant="outline"
          @click="prevPage"
          :disabled="page === 1"
          class="rounded-full px-4 py-1 text-gray-600 dark:text-gray-300"
        >
          Prev
        </Button>
        <span class="font-medium text-gray-700 dark:text-gray-200"
          >Page {{ page }}</span
        >
        <Button
          variant="outline"
          @click="nextPage"
          :disabled="page === maxPage"
          class="rounded-full px-4 py-1 text-gray-600 dark:text-gray-300"
        >
          Next
        </Button>
      </div>
    </div>

    <!-- Product List -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="product in products"
        :key="product.id"
        class="transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer rounded-xl border dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
        @click="navigateTo(`/product/${product.slug}`)"
      >
        <CardHeader class="flex gap-4 items-start p-0 pb-3">
          <img
            :src="product.image || 'https://via.placeholder.com/64'"
            alt="product image"
            class="object-cover w-full h-48 rounded-t-xl border border-gray-200 dark:border-zinc-700 shadow-sm"
          />
          <div class="px-5">
            <CardTitle class="text-lg font-bold text-zinc-900 dark:text-white">
              {{ product.name }}
            </CardTitle>
            <CardDescription class="text-sm text-zinc-500 dark:text-zinc-400">
              {{ product.tagline }}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent
          class="px-5 pt-0 pb-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-3"
        >
          <div class="flex items-center justify-between">
            <p class="flex items-center gap-2">
              🔥 Upvotes:
              <span class="font-semibold text-zinc-900 dark:text-white">{{
                product.upvotes
              }}</span>
            </p>

            <p class="flex items-center gap-2">
              📁 Category:
              <span
                class="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white capitalize shadow-sm"
              >
                {{ product.category }}
              </span>
            </p>
          </div>

          <!-- Upvote / Unvote Button (conditionally rendered) -->
          <div class="pt-2">
            <Button
              v-if="!isUpvoted(product.id)"
              @click.stop="upvote(product.id)"
              variant="outline"
              class="w-full flex items-center justify-center gap-2 text-sm group hover:bg-blue-500 hover:text-white transition"
            >
              <svg
                class="w-5 h-5 text-blue-500 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C10.9 2 10 2.9 10 4v5H5.4c-.7 0-1.3.5-1.4 1.1L3 16.6c-.1.8.5 1.4 1.3 1.4h5.5v2.9c0 .6.4 1.1 1 1.1s1-.5 1-1.1V18h6c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1h-6V4c0-1.1-.9-2-2-2z"
                />
              </svg>
              Upvote
            </Button>

            <Button
              v-else
              @click.stop="unvote(product.id)"
              variant="outline"
              class="w-full flex items-center justify-center gap-2 text-sm group hover:bg-red-500 hover:text-white transition"
            >
              <svg
                class="w-5 h-5 text-red-500 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 22c1.1 0 2-.9 2-2v-5h4.6c.7 0 1.3-.5 1.4-1.1L21 7.4c.1-.8-.5-1.4-1.3-1.4h-5.5V3.1c0-.6-.4-1.1-1-1.1s-1 .5-1 1.1V6H6c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h6v5c0 1.1.9 2 2 2z"
                />
              </svg>
              Unvote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import api from "~/utils/api";

interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
  category: string;
  slug: string;
  upvotes: number;
  createdAt: Date;
}

const categories = ["AI", "Productivity", "Design", "Dev Tools", "Games"];

const filters = ref({
  category: "all",
  sort: "latest",
});

const page = ref(1);
const limit = 6;
const router = useRouter();

const products = ref<Product[]>([]);
const allProducts = ref<Product[]>([]);
const filteredProducts = ref<Product[]>([]);

const maxPage = computed(() =>
  Math.ceil(filteredProducts.value.length / limit)
);

// Track which products are upvoted by the user
const upvotedIds = ref<Set<string>>(new Set());
const isLoggedIn = ref(false);

if (process.client) {
  const token = localStorage.getItem("token");
  isLoggedIn.value = !!token;
}
const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    allProducts.value = res.data;

    // Assume API returns which products are upvoted by the user, e.g. res.data.upvotedProductIds
    // If not, you can fetch separately or manage locally.
    // For demo, let's say allProducts.value contains userUpvoted info:
    // We'll mock like this for now:
    upvotedIds.value = new Set(
      res.data.filter((p: any) => p.isUpvoted).map((p: any) => p.id)
    );

    applyFilters();
  } catch (error) {
    console.error(error);
  }
};

const isUpvoted = (productId: string) => {
  return upvotedIds.value.has(productId);
};

const upvote = async (productId: string) => {
  if (!isLoggedIn.value) {
    alert("You need to login to unvote!");
    router.push("/login"); // redirect to login page
    return;
  }
  try {
    const res = await api.post("/products/upvote", { id: productId });
    if (res.data.success) {
      // Update the upvote count
      const updatedProduct = products.value.find((p) => p.id === productId);
      if (updatedProduct) {
        updatedProduct.upvotes = res.data.upvotes;
      }
      const originalProduct = allProducts.value.find((p) => p.id === productId);
      if (originalProduct) {
        originalProduct.upvotes = res.data.upvotes;
      }

      // Mark as upvoted
      upvotedIds.value.add(productId);

      applyFilters();
    }
  } catch (error) {
    console.error("Failed to upvote:", error);
  }
};

const unvote = async (productId: string) => {
  if (!isLoggedIn.value) {
    alert("You need to login to unvote!");
    router.push("/login"); // redirect to login page
    return;
  }
  try {
    const res = await api.post("/products/unvote", { id: productId });
    if (res.data.success) {
      // Update the upvote count
      const updatedProduct = products.value.find((p) => p.id === productId);
      if (updatedProduct) {
        updatedProduct.upvotes = res.data.upvotes;
      }
      const originalProduct = allProducts.value.find((p) => p.id === productId);
      if (originalProduct) {
        originalProduct.upvotes = res.data.upvotes;
      }

      // Remove from upvoted
      upvotedIds.value.delete(productId);

      applyFilters();
    }
  } catch (error) {
    console.error("Failed to unvote:", error);
  }
};

const applyFilters = () => {
  let filtered = [...allProducts.value];

  if (filters.value.category !== "all") {
    filtered = filtered.filter((p) => p.category === filters.value.category);
  }

  if (filters.value.sort === "latest") {
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (filters.value.sort === "trending") {
    filtered.sort((a, b) => b.upvotes - a.upvotes);
  }

  filteredProducts.value = filtered;

  if (page.value > maxPage.value) {
    page.value = maxPage.value || 1;
  }

  const start = (page.value - 1) * limit;
  const end = start + limit;
  products.value = filtered.slice(start, end);
};

watchEffect(fetchProducts);
watchEffect(applyFilters);

function nextPage() {
  if (page.value < maxPage.value) {
    page.value++;
    applyFilters();
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--;
    applyFilters();
  }
}

// Dummy navigation function
const navigateTo = (url: string) => {
  window.location.href = url;
};
</script>
