import { createApp } from "vue";
import Popup from "./Popup.vue";
import i18n from "../locales";

const app = createApp(Popup);
app.use(i18n).mount("#app");
