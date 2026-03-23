import { cn } from "@/lib/utils";

type StatsEmptyStateProps = {
  className?: string;
  message?: string;
};

export function StatsEmptyState({
  className,
  message = "Veri bulunamadı",
}: StatsEmptyStateProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "text-muted-foreground flex min-h-[180px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-4 py-8 text-center text-sm",
        className
      )}
      role="status"
    >
      {message}
    </div>
  );
}
