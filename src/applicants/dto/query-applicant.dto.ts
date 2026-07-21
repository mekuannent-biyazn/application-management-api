import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

import { ApplicantStatus, InternshipTrack } from '@prisma/client';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryApplicantDto {
  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({
    example: 1,
  })
  page?: string = '1';

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({
    example: 10,
  })
  limit?: string = '10';

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'meku',
  })
  search?: string;

  @IsOptional()
  @IsEnum(ApplicantStatus)
  @ApiPropertyOptional({
    enum: ApplicantStatus,
  })
  status?: ApplicantStatus;

  @IsOptional()
  @IsEnum(InternshipTrack)
  @ApiPropertyOptional({
    enum: InternshipTrack,
  })
  track?: InternshipTrack;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'createdAt',
  })
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'desc',
  })
  order?: 'asc' | 'desc' = 'desc';
}
