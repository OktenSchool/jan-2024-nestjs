import { TagEntity } from '../../../database/entities/tag.entity';
import { TagResDto } from '../dto/res/tag.res.dto';

export class TagMapper {
  public static toResponseListDTO(entities: TagEntity[]): TagResDto[] {
    return entities.map(this.toResponseDTO);
  }

  public static toResponseDTO(entity: TagEntity): TagResDto {
    return {
      name: entity.name,
      articleCount: entity.articleCount,
    };
  }
}
