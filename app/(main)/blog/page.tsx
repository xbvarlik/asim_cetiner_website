import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Psikoloji, ruh sağlığı ve terapi üzerine yazılar. Blog içerikleri yakında yayında olacaktır.",
};

export default function BlogPage(): React.JSX.Element {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Blog</h1>
        <p className="mt-4 text-muted-foreground">
          Yazılarımız çok yakında burada olacak. Güncel duyurular için iletişim
          sayfamızı ziyaret edebilirsiniz.
        </p>
      </div>
    </section>
  );
}
