import { IsString, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotesDto {
  @IsString()
  @MaxLength(1000)
  @ApiProperty({
    example: 'Very good communication skill',
  })
  notes: string;
}
