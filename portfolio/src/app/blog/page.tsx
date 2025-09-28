import Link from "next/link";
import { allPosts } from ".contentlayer/generated";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = allPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="border-b pb-4">
            <Link href={post.url} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {new Date(post.date).toLocaleDateString()} • {Math.ceil(post.readingTime.minutes)} min read
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{post.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

