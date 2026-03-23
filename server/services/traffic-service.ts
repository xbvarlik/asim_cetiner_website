import { prisma } from "@/lib/prisma";
import type { ServiceResult } from "@/types";
import { trafficLogPayloadSchema } from "@/lib/validations/traffic-log-validation";

export async function createTrafficLog(
  data: unknown
): Promise<ServiceResult<{ id: string }>> {
  const parsed = trafficLogPayloadSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid payload",
    };
  }

  try {
    const created = await prisma.trafficLog.create({
      data: {
        source: parsed.data.source,
        path: parsed.data.path,
        utmMedium: parsed.data.utmMedium ?? null,
        utmCampaign: parsed.data.utmCampaign ?? null,
      },
    });
    return { success: true, data: { id: created.id } };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}
