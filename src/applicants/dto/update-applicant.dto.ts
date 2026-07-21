import { CreateApplicantDto } from './create-applicant.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {}
