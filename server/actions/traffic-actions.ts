"use server";

import * as trafficService from "@/server/services/traffic-service";

export async function logTrafficAction(
  input: unknown
): Promise<{ success: boolean }> {
  const result = await trafficService.createTrafficLog(input);
  return { success: result.success };
}
