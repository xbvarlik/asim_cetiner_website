import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { ServiceResult } from "@/types";
import {
  createOrUpdateLegalDocumentSchema,
  type LegalDocumentId,
} from "@/lib/validations/legal-document-validation";

export type LegalDocumentType = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getById(
  id: LegalDocumentId
): Promise<ServiceResult<LegalDocumentType | null>> {
  try {
    const doc = await prisma.legalDocument.findUnique({ where: { id } });
    return { success: true, data: doc };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getAll(): Promise<ServiceResult<LegalDocumentType[]>> {
  try {
    const docs = await prisma.legalDocument.findMany({
      orderBy: { id: "asc" },
    });
    return { success: true, data: docs };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function upsert(
  data: unknown
): Promise<ServiceResult<LegalDocumentType>> {
  const parsed = createOrUpdateLegalDocumentSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { id, title, content } = parsed.data;

  try {
    const doc = await prisma.legalDocument.upsert({
      where: { id },
      update: { title, content },
      create: { id, title, content },
    });
    return { success: true, data: doc };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: `Database error: ${error.code}` };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function remove(
  id: LegalDocumentId
): Promise<ServiceResult<LegalDocumentType>> {
  try {
    const doc = await prisma.legalDocument.delete({ where: { id } });
    return { success: true, data: doc };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, error: "Document not found" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
