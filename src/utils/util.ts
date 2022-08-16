/**
 * <p><img src=\"https://psnine.com/img/drdeceiver-1655889496.png\" class=\"imgclick\" /></p> 形式的代码，tiptap无法识别出图片，故去除两端的p
 * @param html 原始html字符串
 * @returns res 处理后的html字符串
 */
export const removeImgP = (html: string) => {
  let res = html;
  // 去除标签之间的空格（包含全角）
  const tagSpaceReg = /(>\s+<)|(>[　]+<)/gi;
  res = res.replace(tagSpaceReg, "><");
  // 匹配被p包裹的img
  const pimgReg = /<p><img.*?(?:>|\/>)<\/p>/gi;
  const arr = res.match(pimgReg);
  if (!arr) return res;
  for (let index = 0; index < arr.length; index++) {
    const original = arr[index];
    const fixed = original.replace(/<\/{0,1}p>/g, "");
    res = res.replace(original, fixed);
  }
  return res;
};
