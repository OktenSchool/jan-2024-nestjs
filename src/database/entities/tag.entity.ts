import { Column, Entity, ManyToMany, VirtualColumn } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends CreateUpdateModel {
  @Column('text', { unique: true })
  name: string;

  @VirtualColumn({ query: () => 'NULL' })
  articleCount?: number;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];
}
