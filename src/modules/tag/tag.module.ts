import { Module } from '@nestjs/common';

import { TagService } from './services/tag.service';
import { TagController } from './tag.controller';

@Module({
  controllers: [TagController],
  providers: [TagService],
  exports: [],
})
export class TagModule {}
