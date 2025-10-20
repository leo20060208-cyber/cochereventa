"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #1e293b, #7f1d1d, #1e293b)"
        }}>
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <h1 style={{ fontSize: "4rem", fontWeight: "bold", color: "white", marginBottom: "1rem" }}>
              Error
            </h1>
            <h2 style={{ fontSize: "2rem", color: "rgba(255,255,255,0.9)", marginBottom: "1.5rem" }}>
              Algo salió mal
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>
              Lo sentimos, ha ocurrido un error inesperado.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
