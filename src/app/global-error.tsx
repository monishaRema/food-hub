"use client";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#fffaf4] text-stone-950">
        <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
          <div className="w-full rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600">
              Application error
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Something went wrong
            </h1>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              {error.digest
                ? `Reference: ${error.digest}`
                : "Please try loading the page again."}
            </p>
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="mt-6 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
