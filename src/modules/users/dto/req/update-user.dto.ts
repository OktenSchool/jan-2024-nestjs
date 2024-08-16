import { IsOptional } from 'class-validator';

import { AgeValid } from '../../decorators/age-valid.decorator';

export class UpdateUserDto {
  name?: string;

  @AgeValid()
  @IsOptional()
  public readonly age?: number;

  phone?: string;
}
