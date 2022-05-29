interface LikeListItem {
  isMeLiked: boolean;
  likesCount: number;
}

export type LikeListResponse = Promise<LikeListItem>;

export type LikeSetResponse = Promise<null>;
