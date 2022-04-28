const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const API_URL = import.meta.env.VITE_API_URL;
const app = import.meta.env.VITE_APP;
const appHigh = import.meta.env.VITE_APP_HIGH;
let token = "";

const request = {
  get(path: string, params?: any) {
    return new Promise(async function (resolve, reject) {
      try {
        let url = path;
        if (params) {
          const keys = Object.keys(params);
          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (index === 0) {
              url += `?${key}=${encodeURIComponent(params[key])}`;
            } else {
              url += `&${key}=${encodeURIComponent(params[key])}`;
            }
          }
        }

        const response = await fetch(url, {
          method: "get",
          mode: "cors",
          headers: {
            token: token,
          },
        });
        resolve(response.json());
      } catch (error) {
        reject(error);
      }
    });
  },
  post(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await fetch(path, {
          method: "post",
          mode: "cors",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        resolve(response.json());
      } catch (error) {
        reject(error);
      }
    });
  },
  patch(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await fetch(path, {
          method: "patch",
          mode: "cors",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        resolve(response.json());
      } catch (error) {
        reject(error);
      }
    });
  },
  delete(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await fetch(path, {
          method: "delete",
          mode: "cors",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        resolve(response.json());
      } catch (error) {
        reject(error);
      }
    });
  },
};

const auth = {
  // 登录
  login(props: { mobileArea: string; mobile: string; password: string }) {
    let param = {
      mobileArea: props.mobileArea,
      mobile: props.mobile,
      password: props.password,
      service: 3,
      app,
      appHigh,
      deviceType: "chrome-extension",
      deviceModel: "chrome-extension",
    };
    return request.get(AUTH_URL + "/account", param);
  },
  loginByToken(token: string) {
    return request.get(AUTH_URL + "/account/userinfo", { token: token });
  },
  // 获取七牛云uptoken
  getUptoken() {
    return request.get(AUTH_URL + "/upTokenQiniu/getQiNiuUpToken", {
      token: token,
      type: 2,
      bucketType: 7,
    });
  },
  getUptokenOverWrite(key: string) {
    return request.get(AUTH_URL + "/upTokenQiniu/getQiNiuUpTokenKey", {
      token: token,
      type: 2,
      key,
      bucketType: 7,
    });
  },
  // 同步用户
  syncUser(props: {
    userKey: string;
    userName: string;
    mobile: string;
    app: number;
    appHigh: number;
    userAvatar?: string;
    email?: string;
  }) {
    return request.patch(API_URL + "/user", props);
  },
  // 历史协作者
  getCollaboratorsHistory() {
    return request.get(API_URL + "/user/history");
  },
};

const card = {
  addCard(props: {
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
  }) {
    return request.post(API_URL + "/card", props);
  },
  editCard(props: {
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
  }) {
    return request.patch(API_URL + "/card", props);
  },
  deleteCard(cardKey: string) {
    return request.delete(API_URL + "/card", { cardKey });
  },
  toggleStar(cardKey: string) {
    return request.patch(API_URL + "/card/star", { cardKey });
  },
  setCardTag(cardKey: string, tagKeyArr: string[]) {
    return request.patch(API_URL + "/card/tag", { cardKey, tagKeyArr });
  },
  getCardDetail(cardKey: string) {
    return request.get(API_URL + "/card/detail", { cardKey });
  },
  getCardList(props: {
    page: number;
    limit: number;
    type?: "all" | "inbox" | "star" | "today" | "mark" | "shareBy";
    tagKey?: string;
    isTrash?: boolean;
  }) {
    return request.get(API_URL + "/card/list", props);
  },
  restore(cardKey: string) {
    return request.post(API_URL + "/trash/recover", { cardKey });
  },
  dump() {
    return request.post(API_URL + "/trash/clear ");
  },
};

const tag = {
  addTag(name: string) {
    return request.post(API_URL + "/tag", { name });
  },
  getTagList(name?: string) {
    return request.get(API_URL + "/tag", { name });
  },
  deleteTag(tagKey: string) {
    return request.delete(API_URL + "/tag", { tagKey });
  },
  editTag(tagKey: string, name: string) {
    return request.patch(API_URL + "/tag", { tagKey, name });
  },
};

export default {
  auth,
  card,
  tag,
  setToken: (_token: string) => {
    token = _token;
  },
};
