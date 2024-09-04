import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../users/user.mapper';
import { ArticleListQueryDto } from '../dto/req/article-list.query.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { ArticleListResDto } from '../dto/res/article-list.res.dto';
import { ArticleListItemResDto } from '../dto/res/article-list-item.res.dto';

export class ArticleMapper {
  public static toResponseListDTO(
    entities: ArticleEntity[],
    total: number,
    query: ArticleListQueryDto,
  ): ArticleListResDto {
    return {
      data: entities.map(this.toResponseListItemDTO),
      total,
      ...query,
    };
  }

  public static toResponseListItemDTO(
    entity: ArticleEntity,
  ): ArticleListItemResDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      created: entity.created,
      tags: entity.tags.map((tag) => tag.name),
      isLiked: entity.likes?.length > 0,
      user: UserMapper.toResponseDTO(entity.user),
    };
  }

  public static toResponseDTO(entity: ArticleEntity): ArticleResDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      body: entity.body,
      created: entity.created,
      updated: entity.updated,
      tags: entity.tags.map((tag) => tag.name),
      isLiked: entity.likes?.length > 0,
      user: UserMapper.toResponseDTO(entity.user),
    };
  }
}
