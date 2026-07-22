import { AlertCircle } from "lucide-react";

function ErrorMessage({ message }) {
  return <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-red-700 transition-colors duration-300 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"><AlertCircle size={42} className="mb-4" /><h2 className="text-xl font-bold">Unable to load news</h2><p className="mt-2 max-w-md text-sm text-red-600 dark:text-red-300">{message}</p></div>;
}

export default ErrorMessage;