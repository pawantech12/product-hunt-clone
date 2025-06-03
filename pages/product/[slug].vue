<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Product Header -->
          <div
            class="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden"
          >
            <div
              class="aspect-video bg-gradient-to-br from-emerald-400 to-teal-600 relative"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 left-4">
                <span
                  class="bg-white/90 backdrop-blur text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ product.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h1 class="text-3xl font-bold text-slate-900 mb-2">
                    {{ product.name }}
                  </h1>
                  <p class="text-slate-600 text-lg">{{ product.tagline }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="flex items-center text-amber-500 font-medium">
                    ⭐ 4.8
                  </span>
                  <span class="text-slate-400">•</span>
                  <span class="text-slate-600"
                    >{{ product.comments.length }} comments</span
                  >
                </div>
              </div>

              <a
                :href="product.website"
                target="_blank"
                class="inline-flex items-center bg-teal-600 text-sm text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg"
              >
                Visit Product
              </a>
              <div class="pt-2">
                <Button
                  v-if="!product.hasUpvoted"
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
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-2xl shadow border border-slate-200 p-6">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">
              About this product
            </h2>
            <p class="text-slate-700 leading-relaxed mb-4">
              {{ product.description }}
            </p>
          </div>

          <!-- Comment Section -->
          <div class="bg-white rounded-2xl shadow border border-slate-200 p-6">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">Comments</h2>

            <!-- Comment Form -->
            <!-- Comment Form -->
            <form @submit.prevent="addComment" class="mt-6 space-y-4">
              <input
                v-model="comment.user"
                type="text"
                placeholder="Your name"
                class="w-full border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <textarea
                v-model="comment.message"
                rows="3"
                placeholder="Write a comment..."
                class="w-full border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              ></textarea>
              <button
                type="submit"
                class="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
              >
                Post Comment
              </button>
            </form>

            <!-- Comments List -->
            <div v-if="product.comments.length > 0" class="space-y-6 mt-5">
              <div
                v-for="(comment, index) in product.comments"
                :key="index"
                class="flex items-start space-x-4"
              >
                <!-- Avatar -->
                <img
                  :src="`https://avatar.iran.liara.run/public/${index + 1}`"
                  alt="avatar"
                  class="w-10 h-10 rounded-full"
                />
                <div class="bg-slate-100 px-4 py-3 rounded-xl w-full">
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium text-slate-800">
                      {{ comment.user.name }}
                    </h4>
                    <span class="text-xs text-slate-500">
                      {{ new Date(comment.createdAt).toLocaleString() }}
                    </span>
                  </div>
                  <p class="text-slate-700 text-sm mt-1">
                    {{ comment.text }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="text-slate-600 text-center py-3">
              No comments yet.
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Submitted By -->
          <div class="bg-white rounded-2xl shadow border border-slate-200 p-6">
            <h3 class="text-lg font-semibold text-slate-900 mb-4">
              Submitted by
            </h3>
            <div class="flex items-center space-x-3 mb-4">
              <img
                :src="`https://avatar.iran.liara.run/public/35`"
                :alt="product.user.name"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <h4 class="font-medium text-slate-900">
                  {{ product.user.name }}
                </h4>
              </div>
            </div>
            <div
              class="flex items-center justify-between text-sm text-slate-600 mb-4"
            >
              <span>3 products</span>
              <span>200 followers</span>
            </div>
            <button
              class="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800"
            >
              Follow
            </button>
          </div>

          <!-- Product Stats -->
          <div class="bg-white rounded-2xl shadow border border-slate-200 p-6">
            <h3 class="text-lg font-semibold text-slate-900 mb-4">
              Product Stats
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-slate-600">Comments</span>
                <span class="font-medium text-slate-900">{{
                  product.comments.length
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-600">Upvotes</span>
                <span class="font-medium text-slate-900">{{
                  product.upvotes
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-600">Submitted</span>
                <span class="font-medium text-slate-900">{{
                  new Date(product.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}</span>
              </div>
            </div>
          </div>

          <!-- Related Products -->
          <div class="bg-white rounded-2xl shadow border border-slate-200 p-6">
            <h3 class="text-lg font-semibold text-slate-900 mb-4">
              Related Products
            </h3>
            <div class="space-y-3">
              <div
                v-for="related in relatedProducts.slice(0, 5)"
                :key="related.id"
                class="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition"
              >
                <img
                  :src="related.image"
                  :alt="related.name"
                  class="w-10 h-10 rounded-lg"
                />
                <div>
                  <h4 class="font-medium text-slate-900 text-sm">
                    {{ related.name }}
                  </h4>
                  <p class="text-slate-600 text-xs">{{ related.category }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const product = ref({
  id: "",
  name: "",
  tagline: "",
  description: "",
  website: "",
  category: "",
  slug: "",
  image: "",
  upvotes: 300,
  createdAt: new Date("2025-05-01T00:00:00Z"),
  hasUpvoted: false, // optional, default false
  user: {
    name: "",
  },
  comments: [],
});
const relatedProducts = ref([]);

import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const slug = route.params.slug;
const comment = reactive({
  message: "",
  user: "",
});

const fetchProductDetail = async () => {
  try {
    const response = await api.get(`/products/${slug}`);
    product.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const isLoggedIn = ref(false);

if (process.client) {
  const token = localStorage.getItem("token");
  isLoggedIn.value = !!token;
}
const addComment = async () => {
  try {
    const response = await api.post(`/products/${slug}/comment`, comment);
    // Instead of replacing the whole product, update comments directly:
    product.value.comments = response.data.comments || product.value.comments;
    // Clear the input fields after adding comment
    comment.message = "";
    comment.user = "";
  } catch (error) {
    console.error(error);
  }
};
const upvote = async (productId) => {
  if (!isLoggedIn.value) {
    alert("You need to login to upvote!");
    router.push("/login"); // redirect to login page
    return;
  }
  try {
    const res = await api.post("/products/upvote", { id: productId });
    if (res.data.success) {
      product.value.upvotes = res.data.upvotes;
      product.value.hasUpvoted = true;
    }
  } catch (error) {
    console.error("Failed to upvote:", error);
  }
};

const unvote = async (productId) => {
  if (!isLoggedIn.value) {
    alert("You need to login to unvote!");
    router.push("/login"); // redirect to login page
    return;
  }
  try {
    const res = await api.post("/products/unvote", { id: productId });
    if (res.data.success) {
      product.value.upvotes = res.data.upvotes;
      product.value.hasUpvoted = false;
    }
  } catch (error) {
    console.error("Failed to unvote:", error);
  }
};

const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    relatedProducts.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

watchEffect(() => {
  fetchProductDetail();
  fetchProducts();
});
</script>
