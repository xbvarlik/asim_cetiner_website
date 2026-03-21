import * as officeService from "@/server/services/office-service";

export type ContactOfficeOption = {
  id: number;
  name: string;
};

export async function getContactFormOffices(): Promise<ContactOfficeOption[]> {
  const result = await officeService.getAll({ page: 1, pageSize: 100 });
  if (!result.success) {
    return [];
  }
  return result.data.data.map((o) => ({ id: o.id, name: o.name }));
}
