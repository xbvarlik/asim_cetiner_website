import { BlogCard } from "./blog-card";
import type { PublicBlogPost } from "@/types";

export type BlogListProps = {
  posts: PublicBlogPost[];
};

export function BlogList({ posts }: BlogListProps): React.JSX.Element {
  if (posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Henüz yazı paylaşılmadı.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
