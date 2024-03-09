import { createRouter, createWebHistory } from "vue-router/auto";
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

export const router = createRouter({
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
