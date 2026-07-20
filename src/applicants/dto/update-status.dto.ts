import { IsEnum } from 'class-validator';
import { ApplicantStatus } from '@prisma/client';

export class UpdateStatusDto {
  @IsEnum(ApplicantStatus)
  status: ApplicantStatus;
}
