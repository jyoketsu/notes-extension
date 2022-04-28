import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { CardState } from "../types/CardState";
import api from "../../../utils/api";
import { ElMessage } from "element-plus";
import i18n from "../../../locales";
import { Tag } from "../../../interface/Tag";

const state: CardState = {
  cardList: [],
  card: null,
};

const mutations: MutationTree<CardState> = {
  setCardList(state, data) {
    state.cardList = data;
  },
  updateCardList(state, data) {
    const index = state.cardList.findIndex((card) => card._key === data._key);
    if (index !== -1) {
      state.cardList[index] = { ...state.cardList[index], ...data };
    }
  },
  setCard(state, data) {
    state.card = data;
  },
  addCard(state, data) {
    state.cardList.unshift(data);
  },
  updateCard(state, data) {
    const cardData = data.data;
    const index = state.cardList.findIndex(
      (card) => card._key === cardData._key
    );
    if (index !== -1) {
      state.cardList[index] = { ...state.cardList[index], ...cardData };
    }
    if (state.card && !data.editCardDetail) {
      state.card = { ...state.card, ...cardData };
    }
  },
  deleteCard(state, cardKey) {
    const index = state.cardList.findIndex((card) => card._key === cardKey);
    state.cardList.splice(index, 1);
  },
  toggleCardStar(state, cardKey) {
    if (state.card) {
      state.card.star = !state.card.star;
    }
    const index = state.cardList.findIndex((card) => card._key === cardKey);
    if (index !== -1) {
      state.cardList[index].star = !state.cardList[index].star;
    }
  },
};

const actions: ActionTree<CardState, RootState> = {
  async addCard(
    { commit },
    props: {
      title: string;
      icon?: string;
      color?: string;
      // 详情
      content?: string;
      // 摘要
      summary?: string;
      cover?: string;
      link?: string;
      // 标记：来源卡片key
      fromCardKey?: string;
      // 用正则定位标记位置
      digist?: string;
      memo?: string;
      hasShared?: boolean;
      allowEdit?: boolean;
      allowCopy?: boolean;
      needLogin?: boolean;
      shareTo?: string[];
      tagKeyArr?: string[];
    }
  ) {
    commit("common/setLoading", true, { root: true });
    const res: any = await api.card.addCard(props);
    commit("common/setLoading", false, { root: true });
    if (res.status === 200) {
      commit("addCard", res.data);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async editCard(
    { commit },
    props: {
      cardData: {
        cardKey: string;
        title?: string;
        icon?: string;
        color?: string;
        // 详情
        content?: string;
        // 摘要
        summary?: string;
        cover?: string;
        link?: string;
        // 标记：来源卡片key
        fromCardKey?: string;
        memo?: string;
        hasShared?: boolean;
        allowEdit?: boolean;
        allowCopy?: boolean;
        needLogin?: boolean;
        shareTo?: string[];
        tagKeyArr?: string[];
      };
      editCardDetail?: boolean;
    }
  ) {
    const res: any = await api.card.editCard(props.cardData);
    if (res.status === 200) {
      commit("updateCard", {
        data: { ...props.cardData, _key: props.cardData.cardKey },
        editCardDetail: props.editCardDetail,
      });
      // ElMessage.success(i18n.global.t("message.saveSuccess"));
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async deleteCard({ commit }, cardKey: string) {
    const res: any = await api.card.deleteCard(cardKey);
    if (res.status === 200) {
      ElMessage.success(i18n.global.t("message.deleteSuccess"));
      commit("deleteCard", cardKey);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async toggleStar({ commit }, cardKey: string) {
    const res: any = await api.card.toggleStar(cardKey);
    if (res.status === 200) {
      commit("toggleCardStar", cardKey);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async setCardTag(
    { commit },
    { cardKey, tagInfoArr }: { cardKey: string; tagInfoArr: Tag[] }
  ) {
    const tagKeyArr = [];
    for (let index = 0; index < tagInfoArr.length; index++) {
      const element = tagInfoArr[index];
      tagKeyArr.push(element._key);
    }
    const res: any = await api.card.setCardTag(cardKey, tagKeyArr);
    if (res.status === 200) {
      commit("updateCard", {
        data: { _key: cardKey, tagKeyArr, tagInfoArr },
      });
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async getCardDetail({ commit }, cardKey: string) {
    commit("common/setLoading", true, { root: true });
    const res: any = await api.card.getCardDetail(cardKey);
    commit("common/setLoading", false, { root: true });
    if (res.status === 200) {
      commit("setCard", res.data);
    } else if (res.status === 401) {
      commit("auth/clearUser", undefined, { root: true });
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async getCardDetailInList({ commit }, cardKey: string) {
    commit("common/setLoading", true, { root: true });
    const res: any = await api.card.getCardDetail(cardKey);
    commit("common/setLoading", false, { root: true });
    if (res.status === 200) {
      commit("updateCardList", res.data);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async getCardList(
    { commit },
    props: {
      page: number;
      limit: number;
      type?: "all" | "inbox" | "star" | "today" | "mark" | "shareBy";
      tagKey?: string;
      isTrash?: boolean;
    }
  ) {
    commit("common/setLoading", true, { root: true });
    const res: any = await api.card.getCardList(props);
    commit("common/setLoading", false, { root: true });
    if (res.status === 200) {
      commit("setCardList", res.data);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  clearCardList({ commit }) {
    commit("setCardList", []);
  },
  async restore({ commit }, cardKey: string) {
    const res: any = await api.card.restore(cardKey);
    if (res.status === 200) {
      ElMessage.success(i18n.global.t("message.restoreSuccess"));
      commit("deleteCard", cardKey);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async dump({ commit }) {
    const res: any = await api.card.dump();
    if (res.status === 200) {
      ElMessage.success(i18n.global.t("message.dumpSuccess"));
      commit("setCardList", []);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
