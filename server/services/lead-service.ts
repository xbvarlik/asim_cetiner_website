import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  LeadType,
  PaginatedResult,
  PaginationParams,
  ServiceResult,
} from "@/types";
import { createLeadSchema, updateLeadSchema } from "@/lib/validations/lead-validation";

const softDeleteClient = prisma.$extends({
  query: {
    lead: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return query(args);
      },
      async findFirst({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return query(args);
      },
      async findUnique({ args, query }) {
        args.where = { ...args.where, deletedAt: null } as typeof args.where;
        return query(args);
      },
      async count({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return query(args);
      },
    },
  },
});

export async function getAll(
  params: PaginationParams
): Promise<ServiceResult<PaginatedResult<LeadType>>> {
  try {
    const skip = (params.page - 1) * params.pageSize;
    const [data, total] = await Promise.all([
      softDeleteClient.lead.findMany({ skip, take: params.pageSize }),
      softDeleteClient.lead.count(),
    ]);

    return {
      success: true,
      data: {
        data,
        pagination: {
          page: params.page,
          pageSize: params.pageSize,
          total,
          totalPages: Math.ceil(total / params.pageSize),
        },
      },
    };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getById(
  id: string
): Promise<ServiceResult<LeadType | null>> {
  try {
    const lead = await softDeleteClient.lead.findUnique({ where: { id } });
    return { success: true, data: lead };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function create(
  data: unknown
): Promise<ServiceResult<LeadType>> {
  const parsed = createLeadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const lead = await prisma.lead.create({ data: parsed.data });
    return { success: true, data: lead };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return { success: false, error: "Referenced office or status does not exist" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function update(
  id: string,
  data: unknown
): Promise<ServiceResult<LeadType>> {
  const parsed = updateLeadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: parsed.data,
    });
    return { success: true, data: lead };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return { success: false, error: "Referenced office or status does not exist" };
      }
      if (error.code === "P2025") {
        return { success: false, error: "Lead not found" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function remove(
  id: string
): Promise<ServiceResult<LeadType>> {
  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true, data: lead };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, error: "Lead not found" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
