import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { InternshipTrack } from '@prisma/client';

export class CreateApplicantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  university?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  department?: string;

  @IsOptional()
  @IsInt()
  graduationYear?: number;

  @IsEnum(InternshipTrack)
  track: InternshipTrack;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
