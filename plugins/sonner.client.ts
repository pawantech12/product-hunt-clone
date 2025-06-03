import { Toaster } from "sonner";

export default defineNuxtPlugin((nuxtApp) => {
  // Register the toaster once globally
  nuxtApp.vueApp.component("Toaster", Toaster);
});
