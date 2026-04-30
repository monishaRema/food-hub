import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center px-6 py-16">
      <div className="w-full text-center rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
       <h2 className="text-center text-7xl text-orange-500">404</h2>
       <h2 className="text-center text-3xl text-stone-950">Not Found</h2>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
          The page you requested does not exist
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          The link may be broken, or the resource may have been removed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-800"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
