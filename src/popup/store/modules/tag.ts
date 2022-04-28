import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { TagState } from "../types/TagState";
import api from "../../../utils/api";
import { ElMessage } from "element-plus";
import i18n from "../../../locales";

const state: TagState = {
  tagList: [],
  tag: null,
  addedTag: null,
};

const mutations: MutationTree<TagState> = {
  setTagList(state, data) {
    state.tagList = data;
  },
  setTag(state, data) {
    state.tag = data;
  },
  addTag(state, data) {
    state.tagList.push(data);
    state.addedTag = data;
  },
  updateTag(state, data: { tagKey: string; name: string }) {
    const index = state.tagList.findIndex((tag) => tag._key === data.tagKey);
    if (index !== -1) {
      state.tagList[index] = {
        ...state.tagList[index],
        ...{ name: data.name },
      };
    }
  },
  deleteTag(state, tagKey) {
    const index = state.tagList.findIndex((card) => card._key === tagKey);
    if (index !== -1) {
      state.tagList.splice(index, 1);
    }
  },
};

const actions: ActionTree<TagState, RootState> = {
  async addTag({ commit }, name: string) {
    const res: any = await api.tag.addTag(name);
    if (res.status === 200) {
      commit("addTag", res.data);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async getTagList({ commit }, name?: string) {
    const res: any = await api.tag.getTagList(name);
    if (res.status === 200) {
      commit("setTagList", res.data);
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async deleteTag({ commit }, tagKey: string) {
    const res: any = await api.tag.deleteTag(tagKey);
    if (res.status === 200) {
      commit("deleteTag", tagKey);
      // todo message
    } else {
      ElMessage.error(i18n.global.t("message.error"));
    }
  },
  async editTag({ commit }, props: { tagKey: string; name: string }) {
    const res: any = await api.tag.editTag(props.tagKey, props.name);
    if (res.status === 200) {
      commit("updateTag", { tagKey: props.tagKey, name: props.name });
      // todo message
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
