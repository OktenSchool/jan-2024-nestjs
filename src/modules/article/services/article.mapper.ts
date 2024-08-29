import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleResDto } from '../dto/res/article.res.dto';

export class ArticleMapper {
  public static toResponseDTO(entity: ArticleEntity): ArticleResDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      body: entity.body,
      created: entity.created,
      updated: entity.updated,
      tags: entity.tags.map((tag) => tag.name),
    };
  }
}
