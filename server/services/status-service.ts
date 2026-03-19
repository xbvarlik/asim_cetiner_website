import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  StatusType,
  PaginatedResult,
  PaginationParams,
  ServiceResult,
} from "@/types";
import { createStatusSchema, updateStatusSchema } from "@/lib/validations/status-validation";

export async function getAll(
  params: PaginationParams
): Promise<ServiceResult<PaginatedResult<StatusType>>> {
  try {
    const skip = (params.page - 1) * params.pageSize;
    const [data, total] = await Promise.all([
      prisma.status.findMany({ skip, take: params.pageSize }),
      prisma.status.count(),
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
): Promise<ServiceResult<StatusType | null>> {
  try {
    const status = await prisma.status.findUnique({ where: { id } });
    return { success: true, data: status };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function create(
  data: unknown
): Promise<ServiceResult<StatusType>> {
  const parsed = createStatusSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const status = await prisma.status.create({ data: parsed.data });
    return { success: true, data: status };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, error: "A status with this name already exists" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function update(
  id: number,
  data: unknown
): Promise<ServiceResult<StatusType>> {
  const parsed = updateStatusSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const status = await prisma.status.update({
      where: { id },
      data: parsed.data,
    });
    return { success: true, data: status };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, error: "A status with this name already exists" };
      }
      if (error.code === "P2025") {
        return { success: false, error: "Status not found" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function remove(
  id: number
): Promise<ServiceResult<StatusType>> {
  try {
    const status = await prisma.status.delete({ where: { id } });
    return { success: true, data: status };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return { success: false, error: "Cannot delete status with associated leads" };
      }
      if (error.code === "P2025") {
        return { success: false, error: "Status not found" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
