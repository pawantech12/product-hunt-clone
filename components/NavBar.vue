<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-2xl font-bold text-primary"
        >Product<span class="text-teal-600">Hunt</span></NuxtLink
      >

      <!-- Navigation Links (Desktop) -->
      <nav class="hidden md:flex gap-6 font-medium">
        <NuxtLink to="/" class="hover:text-primary transition text-base"
          >Home</NuxtLink
        >
        <NuxtLink to="/explore" class="hover:text-primary transition text-base"
          >Explore</NuxtLink
        >
        <NuxtLink to="/" class="hover:text-primary transition text-base"
          >About</NuxtLink
        >
        <NuxtLink to="/" class="hover:text-primary transition text-base"
          >Contact</NuxtLink
        >
      </nav>

      <!-- Action Buttons -->
      <!-- Action Buttons -->
      <div class="hidden md:flex items-center gap-4">
        <template v-if="!user">
          <NuxtLink to="/login" class="text-base font-medium hover:text-primary"
            >Login</NuxtLink
          >
          <NuxtLink
            to="/register"
            class="bg-teal-500 font-medium text-white text-base px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
            >Sign Up</NuxtLink
          >
        </template>
        <template v-else>
          <div class="relative">
            <Button
              @click="toggleProfileDropdown"
              class="bg-transparent p-0 hover:bg-transparent rounded-full border"
            >
              <!-- Profile Image -->
              <img
                :src="'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740'"
                alt="Profile"
                class="w-full h-full rounded-full object-cover"
              />
            </Button>

            <div
              v-if="isProfileDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
            >
              <div class="px-4 py-2 text-sm text-gray-700 font-medium">
                Hello, {{ user.name }}
              </div>
              <NuxtLink
                to="/profile"
                class="block px-4 py-2 text-sm hover:bg-gray-100"
                >Profile</NuxtLink
              >
              <button
                @click="logout"
                class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileNav" class="md:hidden focus:outline-none">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->

    <Transition
      enter-active-class="transition-[max-height] duration-300 ease-out overflow-hidden"
      enter-from-class="max-h-0"
      enter-to-class="max-h-96"
      leave-active-class="transition-[max-height] duration-200 ease-in overflow-hidden"
      leave-from-class="max-h-96"
      leave-to-class="max-h-0"
    >
      <div
        v-if="isMobileNavOpen"
        class="md:hidden px-4 pb-4 space-y-2 bg-white"
      >
        <NuxtLink to="/" class="block hover:text-primary text-base"
          >Home</NuxtLink
        >
        <NuxtLink to="/explore" class="block hover:text-primary text-base"
          >Explore</NuxtLink
        >
        <NuxtLink to="/" class="block hover:text-primary text-base"
          >About</NuxtLink
        >
        <NuxtLink to="/" class="block hover:text-primary text-base"
          >Contact</NuxtLink
        >
        <template v-if="!user">
          <NuxtLink to="/login" class="text-base font-medium hover:text-primary"
            >Login</NuxtLink
          >
          <NuxtLink
            to="/register"
            class="bg-teal-500 font-medium text-white text-base px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
            >Sign Up</NuxtLink
          >
        </template>
        <template v-else>
          <Button
            @click="logout"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </Button>
        </template>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";
import { Button } from "@/components/ui/button"; // shadcn button

const isMobileNavOpen = ref(false);
const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
};

const isProfileDropdownOpen = ref(false);
const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
};

const { user, fetchUser, logout } = useAuth();

onMounted(() => {
  fetchUser();
});
</script>
