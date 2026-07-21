import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { InternshipTrack } from '@prisma/client';

export class CreateApplicantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    example: 'Mekuannent Biyazn',
  })
  fullName: string;

  @IsEmail()
  @ApiProperty({
    example: 'mekuannent@gmail.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  @ApiPropertyOptional({
    example: '0912345678',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiPropertyOptional({
    example: 'Debre Tabor University',
  })
  university?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiPropertyOptional({
    example: 'Computer Science',
  })
  department?: string;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    example: 2026,
  })
  graduationYear?: number;

  @IsEnum(InternshipTrack)
  @ApiProperty({
    enum: InternshipTrack,
    example: InternshipTrack.BACKEND,
  })
  track: InternshipTrack;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @ApiPropertyOptional({
    example: 'Excellent backend fundamentals',
  })
  notes?: string;
}
