import Link from "next/link";
import { allProjects } from ".contentlayer/generated";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = allProjects
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="py-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div key={project._id} className="rounded border p-4">
            <h2 className="text-xl font-semibold">
              <Link href={project.url} className="hover:underline">
                {project.title}
              </Link>
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{project.summary}</p>
            <div className="mt-3 flex gap-3 text-sm">
              {project.demoUrl && (
                <a href={project.demoUrl} className="underline" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} className="underline" target="_blank" rel="noreferrer">
                  Source Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

