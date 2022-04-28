import { Tag } from "../../../interface/Tag";

export interface TagState {
  tagList: Tag[];
  tag: Tag | null;
  addedTag: Tag | null;
}
