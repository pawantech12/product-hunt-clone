<template>
  <div
    class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg dark:bg-gray-900"
  >
    <Card>
      <CardHeader>
        <CardTitle>Submit New Product</CardTitle>
        <CardDescription
          >Fill in the details to list your product</CardDescription
        >
      </CardHeader>

      <!-- Image Preview at top, full width, fixed height -->
      <div v-if="preview" class="w-full h-48 overflow-hidden mb-6 px-3">
        <img
          :src="preview"
          alt="Preview"
          class="object-cover w-full rounded-xl h-full transition-transform duration-300 hover:scale-105"
          draggable="false"
        />
      </div>

      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name -->
          <div>
            <Label for="name">Product Name</Label>
            <Input
              v-model="form.name"
              id="name"
              placeholder="Enter product name"
            />
          </div>

          <!-- Tagline -->
          <div>
            <Label for="tagline">Tagline</Label>
            <Input
              v-model="form.tagline"
              id="tagline"
              placeholder="Short catchy line"
            />
          </div>

          <!-- Description -->
          <div>
            <Label for="description">Description</Label>
            <Textarea
              v-model="form.description"
              id="description"
              placeholder="Tell us about the product"
              rows="4"
            />
          </div>

          <!-- Website URL -->
          <div>
            <Label for="website">Website URL</Label>
            <Input
              v-model="form.website"
              id="website"
              placeholder="https://example.com"
            />
          </div>

          <!-- Category -->
          <div>
            <Label for="category">Category</Label>
            <Select v-model="form.category">
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="cat in categories" :key="cat" :value="cat">{{
                  cat
                }}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Image Upload -->
          <div>
            <Label for="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
            />
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            class="w-full mt-4 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit Product
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import api from "~/utils/api";

import { useRouter } from "vue-router";

const router = useRouter();

const isLoggedIn = ref(false);

if (process.client) {
  const token = localStorage.getItem("token");
  isLoggedIn.value = !!token;
}

if (!isLoggedIn.value) {
  router.push("/login");
}

const categories = ["AI", "Productivity", "Design", "Dev Tools", "Games"];

const form = reactive({
  name: "",
  tagline: "",
  description: "",
  website: "",
  category: "",
  image: null as File | null,
});

const preview = ref<string | null>(null);

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.image = file;
    preview.value = URL.createObjectURL(file);
  }
}

async function handleSubmit() {
  try {
    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("tagline", form.tagline);
    payload.append("description", form.description);
    payload.append("website", form.website);
    payload.append("category", form.category);
    if (form.image) payload.append("image", form.image);

    // Replace with actual API
    const res = await api.post("/products", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.statusCode === 201 || res.data.statusCode === "201") {
      alert("Product submitted successfully!");
      router.push("/explore");
    } else {
      alert(res.data.statusMessage || "submit failed");
    }
  } catch (err) {
    alert("Something went wrong");
    console.error(err);
  }
}
</script>
