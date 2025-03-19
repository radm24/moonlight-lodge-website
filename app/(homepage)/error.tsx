"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-300 text-primary-800 px-6 py-3 text-lg hover:bg-accent-400 transition-all"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
