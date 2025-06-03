<template>
  <footer class="bg-gray-100 text-gray-600 py-10 mt-10 border-t">
    <div
      class="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
    >
      <!-- Logo + Description -->
      <div>
        <NuxtLink to="/" class="text-xl font-bold text-primary"
          >Product<span class="text-teal-600">Hunt</span></NuxtLink
        >
        <p class="mt-2 text-base">Your trusted place for explore products.</p>
      </div>

      <!-- Links -->
      <div>
        <h3 class="text-base font-semibold text-gray-800 mb-2">Quick Links</h3>
        <ul class="space-y-1 text-sm">
          <li><NuxtLink to="/" class="hover:text-primary">Home</NuxtLink></li>
          <li>
            <NuxtLink to="/explore" class="hover:text-primary"
              >Explore</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/" class="hover:text-primary">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="hover:text-primary">Contact</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h3 class="text-base font-semibold text-gray-800 mb-2">Legal</h3>
        <ul class="space-y-1 text-sm">
          <li>
            <NuxtLink to="/" class="hover:text-primary"
              >Privacy Policy</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/" class="hover:text-primary"
              >Terms & Conditions</NuxtLink
            >
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h3 class="text-base font-semibold text-gray-800 mb-2">Newsletter</h3>
        <p class="text-sm mb-3">Subscribe for updates and exclusive deals.</p>
        <form class="flex items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            class="bg-teal-600 text-white px-4 py-2 text-sm rounded-xl shadow hover:shadow-md transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    <div class="mt-10 border-t pt-4 text-center text-sm text-gray-500">
      © {{ new Date().getFullYear() }} ProductHunt. All rights reserved.
    </div>
  </footer>
</template>
