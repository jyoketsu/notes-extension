import { removeImgP } from "./utils/util";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type == "clip") {
    // 卡片参数
    let options: any = {
      title: message.title,
      link: message.url,
      icon: message.favIconUrlf,
    };

    // 使用Readability获得页面内容
    const documentClone = document.cloneNode(true);
    // @ts-ignore
    const article = new Readability(documentClone, {
      keepClasses: true,
    }).parse();

    // 摘要
    options.summary = article.excerpt;

    // 采集选中
    if (message.clipType === "clip-selected") {
      options.content = `<h1>${options.title}</h1>` + getSelectedContents();
    } else if (message.clipType === "clip-content") {
      // 采集全文
      const content = removeImgP(article.content);
      options.content = `<h1>${options.title}</h1>` + content;
    } else if (message.clipType === "clip-url") {
      // 保存网址
      options.content =
        `<h1>${options.title}</h1>` +
        `<a target="_blank" rel="url" href="${message.url}">${message.url}</a>`;
    }

    chrome.runtime.sendMessage({
      type: "createClip",
      options,
    });
  }
  sendResponse(message);
});

function getSelectedContents() {
  let html = "";
  let range = window.getSelection()?.getRangeAt(0);
  if (range) {
    let container = document.createElement("div");
    container.appendChild(range.cloneContents());
    html = container.innerHTML;
  }

  return html;
}
