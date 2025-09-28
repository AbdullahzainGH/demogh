import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="mx-auto max-w-4xl flex items-center justify-between py-6 px-4">
        <Link href="/" className="font-semibold text-lg">
          Portfolio
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

