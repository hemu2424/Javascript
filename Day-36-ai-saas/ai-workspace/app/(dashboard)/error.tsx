"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <h2 className="text-xl font-bold">
        Something went wrong
      </h2>

      <button
        onClick={() => reset()}
        className="mt-4 rounded-md border px-4 py-2"
      >
        Try again
      </button>
    </div>
  );
}