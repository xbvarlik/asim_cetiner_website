import {
  PRACTITIONER_FULL_NAME,
} from "@/lib/seo/constants";

/**
 * Condensed education lines from docs/info.md (About). Single source for llms.txt + JSON-LD.
 */
export const AUTHORITY_EDUCATION_SNIPPET =
  "Lisans eğitimi Doğuş Üniversitesi %100 İngilizce Psikoloji Bölümü’nde (onur derecesi); yüksek lisans Arel Üniversitesi Klinik Psikoloji programında (yüksek onur derecesi) tamamlanmıştır.";

/** JSON-LD description fragment (Turkish, compact). */
export const AUTHORITY_JSONLD_SNIPPET =
  "Lisans: Doğuş Üniversitesi %100 İngilizce Psikoloji (onur derecesi). Yüksek lisans: Arel Üniversitesi Klinik Psikoloji programı (yüksek onur derecesi).";

export function buildLlmsIntroSummary(): string {
  return `Bu site, ${PRACTITIONER_FULL_NAME} için bilgilendirici bir tanıtım kaynağıdır. Kadıköy merkezli uygulamada yüz yüze ve çevrim içi danışmanlık seçenekleri sunulmaktadır; bireysel, aile ve çift danışmanlığı çerçevesinde bilimsel temelli destek hedeflenmektedir.

Akademik arka plan: ${AUTHORITY_EDUCATION_SNIPPET}`;
}
