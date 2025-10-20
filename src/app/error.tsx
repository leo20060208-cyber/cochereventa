"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">500</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-white/90 mb-6">
          Algo salió mal
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <Home className="h-5 w-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
