import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApplicantStatus, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { QueryApplicantDto } from './dto/query-applicant.dto';

@Injectable()
export class ApplicantsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateApplicantDto) {
    const existingApplicant = await this.prisma.applicant.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingApplicant) {
      throw new BadRequestException('Applicant email already exists');
    }

    const applicant = await this.prisma.applicant.create({
      data: dto,
    });

    return {
      success: true,
      message: 'Applicant created successfully',
      data: applicant,
    };
  }

  async findOne(id: string) {
    const applicant = await this.prisma.applicant.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    return {
      success: true,
      data: applicant,
    };
  }

  async update(id: string, dto: UpdateApplicantDto) {
    await this.findOne(id);

    const applicant = await this.prisma.applicant.update({
      where: {
        id,
      },
      data: dto,
    });

    return {
      success: true,
      message: 'Applicant updated successfully',
      data: applicant,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.applicant.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Applicant deleted successfully',
    };
  }

  async updateNotes(id: string, dto: UpdateNotesDto) {
    await this.findOne(id);

    const applicant = await this.prisma.applicant.update({
      where: {
        id,
      },
      data: {
        notes: dto.notes,
      },
    });

    return {
      success: true,
      message: 'Notes updated successfully',
      data: applicant,
    };
  }

  async updateStatus(id: string, dto: UpdateStatusDto) {
    const applicant = await this.prisma.applicant.findUnique({
      where: {
        id,
      },
    });

    if (!applicant || applicant.deletedAt) {
      throw new NotFoundException('Applicant not found');
    }

    if (
      applicant.status === ApplicantStatus.REJECTED &&
      dto.status === ApplicantStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        'Rejected applicants cannot move directly to Accepted',
      );
    }

    const updated = await this.prisma.applicant.update({
      where: {
        id,
      },
      data: {
        status: dto.status,
      },
    });

    return {
      success: true,
      message: 'Status updated successfully',
      data: updated,
    };
  }

  async findAll(query: QueryApplicantDto) {
    const {
      page = '1',
      limit = '10',
      search,
      status,
      track,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    const currentPage = Number(page);
    const perPage = Number(limit);

    const skip = (currentPage - 1) * perPage;

    const where: Prisma.ApplicantWhereInput = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        {
          fullName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (track) {
      where.track = track;
    }

    const [applicants, total] = await this.prisma.$transaction([
      this.prisma.applicant.findMany({
        where,
        skip,
        take: perPage,
        orderBy: {
          [sortBy]: order,
        },
      }),

      this.prisma.applicant.count({
        where,
      }),
    ]);

    return {
      success: true,

      data: applicants,

      pagination: {
        total,

        page: currentPage,

        limit: perPage,

        lastPage: Math.ceil(total / perPage),

        hasNextPage: currentPage < Math.ceil(total / perPage),

        hasPreviousPage: currentPage > 1,
      },
    };
  }
}
