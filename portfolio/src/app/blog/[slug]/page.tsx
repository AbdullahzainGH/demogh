import { notFound } from "next/navigation";
import { allPosts } from ".contentlayer/generated";
import MDX from "@/components/MDX";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <article className="prose dark:prose-invert max-w-none py-8">
      <h1 className="mb-2">{post.title}</h1>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {new Date(post.date).toLocaleDateString()} • {Math.ceil(post.readingTime.minutes)} min read
      </div>
      <MDX code={post.body.code} />
    </article>
  );
}

