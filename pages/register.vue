<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center px-4"
  >
    <Card
      class="w-full max-w-md shadow-xl border border-gray-200 rounded-2xl animate-fade-in"
    >
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold text-gray-800"
          >Create an Account</CardTitle
        >
        <p class="text-sm text-gray-500">Start your journey with us</p>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="register" class="space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Name</label
            >
            <Input v-model="form.name" placeholder="John Doe" class="w-full" />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <Input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              class="w-full"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <Input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full"
            />
          </div>

          <!-- Register Button -->
          <Button
            type="submit"
            class="w-full mt-2 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Register
          </Button>
        </form>

        <!-- OR Divider -->
        <div class="my-6 flex items-center text-gray-400 text-sm">
          <div class="flex-grow h-px bg-gray-200"></div>
          <span class="mx-4 whitespace-nowrap">or continue with</span>
          <div class="flex-grow h-px bg-gray-200"></div>
        </div>

        <!-- Social Login Buttons -->
        <div class="flex items-center flex-wrap gap-3">
          <Button
            variant="outline"
            class="w-full flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 488 512">
              <path
                d="M488 261.8c0-17.8-1.6-35-4.7-51.6H249v97.8h134.3c-5.8 31.5-23 58.2-49 76.2l79 61c46.1-42.5 72.7-105.1 72.7-183.4z"
                fill="#4285F4"
              />
              <path
                d="M249 492c66.3 0 121.9-21.8 162.5-59.1l-79-61c-21.9 14.6-50 23.2-83.5 23.2-64.1 0-118.3-43.2-137.8-101.3l-80.7 62.4C65.1 436.3 150.8 492 249 492z"
                fill="#34A853"
              />
              <path
                d="M111.2 293.8c-4.8-14.6-7.6-30.1-7.6-46.2s2.8-31.6 7.6-46.2l-80.7-62.4C17.3 169.9 0 207.2 0 247.6s17.3 77.7 45.5 108.6l65.7-62.4z"
                fill="#FBBC05"
              />
              <path
                d="M249 99.6c36.1 0 68.5 12.4 94 36.6l70.6-70.6C370.9 25.2 314.3 0 249 0 150.8 0 65.1 55.7 45.5 139.6l80.7 62.4c19.5-58.1 73.7-101.3 137.8-101.3z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            variant="outline"
            class="w-full flex items-center justify-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 
         2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
         0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
         -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 
         1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78
         -.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82
         -2.15-.08-.2-.36-1.02.08-2.12 0 0 .67
         -.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 
         1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 
         1.1.16 1.92.08 2.12.51.56.82 1.27.82 
         2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 
         1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55
         .38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
            Continue with GitHub
          </Button>
        </div>

        <!-- Already have an account? -->
        <div class="mt-6 text-center text-sm text-gray-500">
          Already registered?
          <NuxtLink to="/login" class="text-blue-600 hover:underline"
            >Login</NuxtLink
          >
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import api from "~/utils/api";
import { useAuth } from "~/composables/useAuth";

const router = useRouter();
const form = reactive({
  name: "",
  email: "",
  password: "",
});

const { setToken, setUser } = useAuth();

const register = async () => {
  try {
    const res = await api.post("/auth/register", form);
    setToken(res.data.token);
    setUser({
      id: res.data.user.id,
      name: form.name,
      email: form.email,
    });
    router.push("/explore");
  } catch (e) {
    alert("Registration failed");
  }
};
</script>
