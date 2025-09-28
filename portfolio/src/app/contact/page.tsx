"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });
    const json = await res.json();
    setLoading(false);
    setStatus(json.ok ? "Message sent!" : json.error || "Failed to send");
    if (json.ok) form.reset();
  }

  return (
    <section className="py-8">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <form onSubmit={onSubmit} className="max-w-xl grid gap-4">
        <input name="name" placeholder="Your name" required className="border rounded p-2" />
        <input name="email" type="email" placeholder="Your email" required className="border rounded p-2" />
        <textarea name="message" placeholder="Your message" required rows={6} className="border rounded p-2" />
        <button
          disabled={loading}
          className="rounded bg-black text-white dark:bg-white dark:text-black py-2 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </section>
  );
}

