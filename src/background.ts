import api from "./utils/api";

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.removeAll(function () {
    // 创建右键菜单
    createContextMenus("保存正文", "clip-content");
    createContextMenus("保存选中", "clip-selected");
    createContextMenus("保存网址", "clip-url");
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // 右键获取网页相关内容
  chrome.storage.local.get(["user"], async function (result) {
    const user = result.user;
    const token = user ? user.token : null;
    if (!token) {
      return createNotification("请登录", "插件登录后才能进行此操作！");
    } else {
      api.setToken(token);
    }

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "clip",
            clipType: info.menuItemId,
            title: tabs[0].title,
            url: tabs[0].url,
            favIconUrl: tabs[0].favIconUrl,
          });
        }
      }
    );
  });
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "createNotification") {
    createNotification(message.options.title, message.options.message);
  }
  if (message.type === "createClip") {
    const res: any = await api.card.addCard(message.options);
    if (res.status === 200) {
      createNotification("提示", "采集成功！");
    } else {
      createNotification("提示", res.msg);
    }
  }
  sendResponse({ successed: true });
});

function createContextMenus(title: string, id: string) {
  // 创建右键事件
  chrome.contextMenus.create(
    {
      type: "normal",
      title: title,
      id: id,
      contexts: ["all"],
    },
    function () {
      console.log("contextMenus are create " + id);
    }
  );
}

function createNotification(title: string, message: any) {
  // 消息通知
  chrome.notifications.create("", {
    type: "basic",
    iconUrl: "icons/128.png",
    title,
    message,
  });
}
