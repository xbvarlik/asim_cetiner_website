import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  OfficeType,
  PaginatedResult,
  PaginationParams,
  ServiceResult,
} from "@/types";
import { createOfficeSchema, updateOfficeSchema } from "@/lib/validations/office-validation";

export async function getAll(
  params: PaginationParams
): Promise<ServiceResult<PaginatedResult<OfficeType>>> {
  try {
    const skip = (params.page - 1) * params.pageSize;
    const [data, total] = await Promise.all([
      prisma.office.findMany({ skip, take: params.pageSize }),
      prisma.office.count(),
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
  id: number
): Promise<ServiceResult<OfficeType | null>> {
  try {
    const office = await prisma.office.findUnique({ where: { id } });
    return { success: true, data: office };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function create(
  data: unknown
): Promise<ServiceResult<OfficeType>> {
  const parsed = createOfficeSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const office = await prisma.office.create({ data: parsed.data });
    return { success: true, data: office };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, error: "An office with this name already exists" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function update(
  id: number,
  data: unknown
): Promise<ServiceResult<OfficeType>> {
  const parsed = updateOfficeSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const office = await prisma.office.update({
      where: { id },
      data: parsed.data,
    });
    return { success: true, data: office };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, error: "An office with this name already exists" };
      }
      if (error.code === "P2025") {
        return { success: false, error: "Office not found" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function remove(
  id: number
): Promise<ServiceResult<OfficeType>> {
  try {
    const office = await prisma.office.delete({ where: { id } });
    return { success: true, data: office };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return { success: false, error: "Cannot delete office with associated leads" };
      }
      if (error.code === "P2025") {
        return { success: false, error: "Office not found" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
