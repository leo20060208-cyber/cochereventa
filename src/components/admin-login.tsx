"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

interface AdminLoginProps {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === "Farners 19") {
      // Guardar en sessionStorage para mantener la sesión
      sessionStorage.setItem("admin_authenticated", "true")
      onLogin()
    } else {
      setError(true)
      setPassword("")
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-500 p-4 rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Panel de Admin</h1>
            <p className="text-white/70 text-center">
              Introduce la contraseña para acceder
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  error ? "border-red-500" : "border-white/20"
                } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                placeholder="Introduce tu contraseña"
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-400"
                >
                  Contraseña incorrecta. Inténtalo de nuevo.
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
            >
              Iniciar Sesión
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Acceso restringido solo para administradores
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
