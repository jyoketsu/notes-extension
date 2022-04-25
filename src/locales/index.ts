import { createI18n } from "vue-i18n"; //引入vue-i18n组件
import zhCn from "./zh-cn"; // 中文语言包
import zhTw from "./zh-tw";
import en from "./en"; // 英文语言包
import ja from "./ja";

const defaultLocale = localStorage.getItem("LOCALE") || "zh-cn";

// 实例化I18n
const i18n = createI18n({
  locale: defaultLocale, // 初始化配置语言
  messages: {
    "zh-cn": zhCn,
    "zh-tw": zhTw,
    en,
    ja,
  },
});

export default i18n;
