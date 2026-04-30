"use client";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-16">
      <div className="w-full rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600">
          Page error
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
          This page could not be loaded
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          {error.digest
            ? `Reference: ${error.digest}`
            : "Please try the request again."}
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
  );
}
