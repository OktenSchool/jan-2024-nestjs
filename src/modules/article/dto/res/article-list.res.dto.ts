import { ArticleListQueryDto } from '../req/article-list.query.dto';
import { ArticleListItemResDto } from './article-list-item.res.dto';

export class ArticleListResDto extends ArticleListQueryDto {
  data: ArticleListItemResDto[];
  total: number;
}
