import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { TagResDto } from './dto/res/tag.res.dto';
import { TagMapper } from './services/tag.mapper';
import { TagService } from './services/tag.service';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly service: TagService) {}

  @SkipAuth()
  @Get('popular')
  public async getPopular(): Promise<TagResDto[]> {
    const result = await this.service.getPopular();
    return TagMapper.toResponseListDTO(result);
  }
}
