chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type == "clip") {
    // 卡片参数
    let options: any = {
      title: message.title,
      url: message.url,
      icon: message.favIconUrlf,
    };

    // 使用Readability获得页面内容
    const documentClone = document.cloneNode(true);
    // @ts-ignore
    const article = new Readability(documentClone).parse();

    // 摘要
    options.summary = article.excerpt;

    // 采集选中
    if (message.clipType === "clip-selected") {
      options.content = `<h1>${options.title}</h1>` + getSelectedContents();
    } else if (message.clipType === "clip-content") {
      // 采集全文
      options.content = `<h1>${options.title}</h1>` + article.content;
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
