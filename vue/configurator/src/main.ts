import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(ElementPlus, { size: "small", zIndex: 3000 })
  .use(router)
  .mount("#app");
