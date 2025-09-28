import { notFound } from "next/navigation";
import { allProjects } from ".contentlayer/generated";
import MDX from "@/components/MDX";

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <article className="prose dark:prose-invert max-w-none py-8">
      <h1 className="mb-2">{project.title}</h1>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {new Date(project.date).toLocaleDateString()} • {Math.ceil(project.readingTime.minutes)} min read
      </div>
      <MDX code={project.body.code} />
    </article>
  );
}

