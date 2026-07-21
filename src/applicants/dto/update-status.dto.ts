import { IsEnum } from 'class-validator';
import { ApplicantStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @IsEnum(ApplicantStatus)
  @ApiProperty({
    enum: ApplicantStatus,
  })
  status: ApplicantStatus;
}
