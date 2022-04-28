import { createApp } from "vue";
import Popup from "./Popup.vue";
import { store, key } from "./store";
import i18n from "../locales";

const app = createApp(Popup);
app.use(store, key).use(i18n).mount("#app");
