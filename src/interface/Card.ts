import { Tag } from "./Tag";

export interface Card {
  _key: string;
  title: string;
  icon?: string;
  color?: string;
  // 详情
  content?: string;
  // 摘要
  summary?: string;
  cover?: string;
  link?: string;
  star?: boolean;
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
  tagInfoArr?: Tag[];
  creator: string;
  updateTime: number;
}
