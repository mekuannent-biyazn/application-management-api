import { Injectable } from '@nestjs/common';
import { ApplicantStatus, InternshipTrack } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const where = {
      deletedAt: null,
    };

    const [
      totalApplicants,
      pending,
      shortlisted,
      accepted,
      rejected,
      frontend,
      backend,
      mobile,
      uiux,
      dataAnalytics,
    ] = await Promise.all([
      this.prisma.applicant.count({ where }),

      this.prisma.applicant.count({
        where: {
          ...where,
          status: ApplicantStatus.PENDING,
        },
      }),

      this.prisma.applicant.count({
        where: {
          ...where,
          status: ApplicantStatus.SHORTLISTED,
        },
      }),

      this.prisma.applicant.count({
        where: {
          ...where,
          status: ApplicantStatus.ACCEPTED,
        },
      }),

      this.prisma.applicant.count({
        where: {
          ...where,
          status: ApplicantStatus.REJECTED,
        },
      }),

      this.prisma.applicant.count({
        where: {
          ...where,
          track: InternshipTrack.FRONTEND,
        },
      }),

      this.prisma.applicant.count({
        where: {
          ...where,
          track: InternshipTrack.BACKEND,
        },
      }),

      this.prisma.applicant.count({
        where: {
          ...where,
          track: InternshipTrack.MOBILE,
        },
      }),

      this.prisma.applicant.count({
        where: {
          ...where,
          track: InternshipTrack.UI_UX,
        },
      }),

      this.prisma.applicant.count({
        where: {
          ...where,
          track: InternshipTrack.DATA_ANALYTICS,
        },
      }),
    ]);

    return {
      success: true,
      data: {
        totalApplicants,

        byStatus: {
          pending,
          shortlisted,
          accepted,
          rejected,
        },

        byTrack: {
          frontend,
          backend,
          mobile,
          uiux,
          dataAnalytics,
        },
      },
    };
  }
}
