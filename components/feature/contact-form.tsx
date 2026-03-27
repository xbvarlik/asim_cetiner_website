"use client";

import { Suspense, useActionState, useRef, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RevealSection } from "@/components/feature/motion/reveal-section";
import { createLeadAction } from "@/server/actions/lead-actions";
import { readAttributionSource } from "@/lib/attribution-storage";
import type { ContactFormState } from "@/types";

type ContactFormProps = {
  offices: Array<{ id: number; name: string }>;
};

const INITIAL_STATE: ContactFormState = { success: false };

const contactControlClass =
  "h-11 min-h-11 px-3 py-2 text-base md:text-base rounded-xl";
const contactTextareaClass =
  "min-h-[7.5rem] px-3 py-3 text-base md:text-base rounded-xl resize-y";
const contactSelectTriggerClass =
  "h-11 min-h-11 w-full justify-between px-3 text-base data-[size=default]:h-11";

function ContactFormInner({ offices }: ContactFormProps): React.JSX.Element {
  const [state, formAction, pending] = useActionState(
    createLeadAction,
    INITIAL_STATE
  );
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [utmSource, setUtmSource] = useState("");

  useEffect(() => {
    // Sync session attribution to hidden field after client navigation.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- external storage, not derivable on server
    setUtmSource(readAttributionSource() ?? "");
  }, [pathname, searchParams]);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- refresh attribution after successful submit
      setUtmSource(readAttributionSource() ?? "");
    }
  }, [state]);

  return (
    <RevealSection className="block w-full">
    <section id="iletisim" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            İletişime Geçin
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Randevu almak veya bilgi edinmek için formu doldurun, en kısa sürede
            size dönüş yapacağım.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          {state.success && (
            <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 p-4 text-center text-sm font-medium text-primary">
              Mesajınız başarıyla gönderildi. En kısa sürede size dönüş
              yapacağız.
            </div>
          )}

          {state.error && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center text-sm font-medium text-destructive">
              {state.error}
            </div>
          )}

          <form ref={formRef} action={formAction} className="space-y-5">
            <input type="hidden" name="utmSource" value={utmSource} />
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            />

            <div className="space-y-1.5">
              <Label htmlFor="name">Ad Soyad *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Adınız ve soyadınız"
                className={contactControlClass}
                aria-invalid={!!state.fieldErrors?.name}
              />
              {state.fieldErrors?.name && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.name[0]}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber">Telefon *</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                placeholder="+90 (5XX) XXX XX XX"
                className={contactControlClass}
                aria-invalid={!!state.fieldErrors?.phoneNumber}
              />
              {state.fieldErrors?.phoneNumber && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.phoneNumber[0]}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ornek@email.com"
                className={contactControlClass}
                aria-invalid={!!state.fieldErrors?.email}
              />
              {state.fieldErrors?.email && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="officeId">Ofis *</Label>
              {offices.length > 0 ? (
                <Select name="officeId" required>
                  <SelectTrigger
                    id="officeId"
                    className={contactSelectTriggerClass}
                    aria-invalid={!!state.fieldErrors?.officeId}
                  >
                    <SelectValue placeholder="Ofis seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {offices.map((office) => (
                      <SelectItem
                        key={office.id}
                        value={String(office.id)}
                      >
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Ofis seçimi şu anda kullanılamıyor.
                </p>
              )}
              {state.fieldErrors?.officeId && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.officeId[0]}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Mesaj</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Mesajınızı buraya yazabilirsiniz (isteğe bağlı)"
                className={contactTextareaClass}
                aria-invalid={!!state.fieldErrors?.message}
              />
              {state.fieldErrors?.message && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.message[0]}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full"
              size="lg"
            >
              {pending ? "Gönderiliyor..." : "Mesaj Gönder"}
            </Button>
          </form>
        </div>
      </div>
    </section>
    </RevealSection>
  );
}

export function ContactForm(props: ContactFormProps): React.JSX.Element {
  return (
    <Suspense fallback={<ContactFormFallback offices={props.offices} />}>
      <ContactFormInner {...props} />
    </Suspense>
  );
}

function ContactFormFallback({
  offices,
}: ContactFormProps): React.JSX.Element {
  return (
    <RevealSection className="block w-full">
    <section id="iletisim" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            İletişime Geçin
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm">
            Form yükleniyor…
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-xl text-center text-muted-foreground text-sm">
          {offices.length === 0 ? "Ofis bilgisi yok." : null}
        </div>
      </div>
    </section>
    </RevealSection>
  );
}
