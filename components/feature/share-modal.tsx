"use client";

import { useCallback, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Link2,
  MessageCircle,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export type ShareModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type PlatformDef = {
  value: string;
  label: string;
  sourceId: string;
  Icon: React.ComponentType<{ className?: string }>;
  shareUrl: (pageUrl: string) => string;
};

function buildTaggedPageUrl(sourceId: string): string {
  if (typeof window === "undefined") {
    return "";
  }
  const u = new URL(window.location.href);
  u.searchParams.set("utm_source", sourceId);
  return u.toString();
}

const PLATFORMS: PlatformDef[] = [
  {
    value: "whatsapp",
    label: "WhatsApp",
    sourceId: "whatsapp",
    Icon: MessageCircle,
    shareUrl: (pageUrl) =>
      `https://wa.me/?text=${encodeURIComponent(pageUrl)}`,
  },
  {
    value: "instagram",
    label: "Instagram",
    sourceId: "instagram",
    Icon: Instagram,
    shareUrl: (pageUrl) => pageUrl,
  },
  {
    value: "facebook",
    label: "Facebook",
    sourceId: "facebook",
    Icon: Facebook,
    shareUrl: (pageUrl) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    sourceId: "linkedin",
    Icon: Linkedin,
    shareUrl: (pageUrl) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
  },
  {
    value: "x",
    label: "X",
    sourceId: "x",
    Icon: Twitter,
    shareUrl: (pageUrl) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`,
  },
];

export function ShareModal({
  open,
  onOpenChange,
}: ShareModalProps): React.JSX.Element {
  const [tab, setTab] = useState<string>("whatsapp");

  const copyForPlatform = useCallback(
    async (sourceId: string): Promise<void> => {
      const url = buildTaggedPageUrl(sourceId);
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Bağlantı kopyalandı");
      } catch {
        toast.error("Kopyalanamadı");
      }
    },
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>Paylaş</DialogTitle>
          <DialogDescription>
            Sayfayı kanala göre paylaşın; bağlantılarda{" "}
            <span className="font-medium">utm_source</span> etiketi eklenir.
          </DialogDescription>
        </DialogHeader>

        <TabsRoot
          value={tab}
          onValueChange={(v) => {
            if (v != null) {
              setTab(String(v));
            }
          }}
        >
          <TabsList className="h-auto min-h-9">
            {PLATFORMS.map((p) => (
              <TabsTrigger key={p.value} value={p.value} className="gap-1">
                <p.Icon className="size-3.5 shrink-0 sm:size-4" />
                <span className="hidden sm:inline">{p.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {PLATFORMS.map((p) => {
            const pageUrl = buildTaggedPageUrl(p.sourceId);
            const external = p.shareUrl(pageUrl);
            const isInstagram = p.value === "instagram";

            return (
              <TabsContent key={p.value} value={p.value} className="space-y-3">
                <p className="text-muted-foreground text-xs break-all">
                  {pageUrl}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      void copyForPlatform(p.sourceId);
                    }}
                  >
                    <Link2 className="size-4" />
                    Bağlantıyı kopyala
                  </Button>
                  {!isInstagram ? (
                    <a
                      href={external || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "default", size: "sm" }),
                        "gap-2"
                      )}
                    >
                      <p.Icon className="size-4" />
                      {p.label} ile aç
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-xs">
                      Instagram’da paylaşım için bağlantıyı kopyalayıp uygulamaya
                      yapıştırabilirsiniz.
                    </p>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </TabsRoot>
      </DialogContent>
    </Dialog>
  );
}
