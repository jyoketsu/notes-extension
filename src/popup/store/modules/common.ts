import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { CommonState } from "../types/CommonState";

const state: CommonState = {
  locale: localStorage.getItem("LOCALE") || "zh-cn",
  dark: localStorage.getItem("DARK") ? true : false,
  theme: localStorage.getItem("THEME") || "#409eff",
  menuVisible: false,
  loading: false,
};

const mutations: MutationTree<CommonState> = {
  setDark(state, data) {
    if (data) {
      localStorage.setItem("DARK", data);
    } else {
      localStorage.removeItem("DARK");
    }
    state.dark = data;
  },
  setTheme(state, data) {
    localStorage.setItem("THEME", data);
    state.theme = data;
  },
  setMenuVisible(state, data) {
    state.menuVisible = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
  setLocale(state, data) {
    state.locale = data;
  },
};

const actions: ActionTree<CommonState, RootState> = {
  // async getIconList({ commit }) {
  //   const res: any = await api.auth.getIcons(1, 1000);
  //   if (res.status === 200) {
  //     commit("setIconList", res.data);
  //   } else {
  //     const $toast = useToast();
  //     $toast({ message: res.msg, position: "top" });
  //   }
  // },
  changeLocale({ commit }, locale) {
    localStorage.setItem("LOCALE", locale);
    document.querySelector("html")?.setAttribute("lang", locale);
    commit("setLocale", locale);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
