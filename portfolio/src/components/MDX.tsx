import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

type MDXComponentsMap = Record<string, React.ComponentType<Record<string, unknown>>>;

type MDXProps = {
  code: string;
  components?: MDXComponentsMap;
};

const defaultComponents: MDXComponentsMap = {
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a {...props} className="underline hover:no-underline text-blue-600 dark:text-blue-400" />
  ),
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <pre {...props} className="bg-black/5 dark:bg-white/10 rounded p-4 overflow-x-auto" />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <code {...props} className="font-mono text-sm" />
  ),
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 {...props} className="text-3xl font-bold mt-8 mb-4" />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} className="text-2xl font-semibold mt-8 mb-3" />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props} className="text-xl font-semibold mt-6 mb-2" />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="list-disc pl-5 my-4" />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="list-decimal pl-5 my-4" />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="leading-7 my-4" />
  ),
};

export default function MDX({ code, components }: MDXProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...defaultComponents, ...components }} />;
}

