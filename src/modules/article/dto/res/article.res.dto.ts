import { PickType } from '@nestjs/swagger';

import { BaseArticleResDto } from './base-article.res.dto';

export class ArticleResDto extends PickType(BaseArticleResDto, [
  'id',
  'title',
  'description',
  'body',
  'created',
  'updated',
  'tags',
  'isLiked',
  'user',
]) {}
