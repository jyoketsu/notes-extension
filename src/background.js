chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // 右键获取网页相关内容
  console.log(info, tab);
});
