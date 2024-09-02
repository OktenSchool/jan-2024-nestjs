import { PickType } from '@nestjs/swagger';

import { BaseArticleResDto } from './base-article.res.dto';

export class ArticleListItemResDto extends PickType(BaseArticleResDto, [
  'id',
  'title',
  'description',
  'created',
  'tags',
]) {}
