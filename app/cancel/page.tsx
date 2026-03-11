'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CancelPage() {
  const searchParams = useSearchParams()
  const [reason, setReason] = useState<string | null>(null)

  useEffect(() => {
    setReason(searchParams.get('reason'))
  }, [searchParams])

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Cancel Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-6">
            <svg
              className="h-24 w-24 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Cancel Message */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pagamento Cancelado
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            O processo de pagamento foi cancelado.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nenhuma cobrança foi realizada.
          </p>
        </div>

        {/* Reason */}
        {reason && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Motivo
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {reason}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <a
            href="/"
            className="block w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            Tentar Novamente
          </a>
          
          <a
            href="/planos"
            className="block w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
          >
            Ver Outros Planos
          </a>
        </div>

        {/* Support Info */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Encontrou algum problema?{' '}
            <a href="/suporte" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Fale com nosso suporte
            </a>
          </p>
        </div>

        {/* Why Cancel Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Por que escolher nossos planos?
          </h3>
          <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1 text-left">
            <li>✓ 7 dias de teste grátis</li>
            <li>✓ Cancele quando quiser</li>
            <li>✓ Suporte dedicado</li>
            <li>✓ Sem taxas ocultas</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
