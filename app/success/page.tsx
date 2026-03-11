'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [checkoutId, setCheckoutId] = useState<string | null>(null)

  useEffect(() => {
    const id = searchParams.get('checkout_id') || searchParams.get('id')
    setCheckoutId(id)
  }, [searchParams])

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-6">
            <svg
              className="h-24 w-24 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pagamento Realizado!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Sua assinatura foi processada com sucesso.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Em breve você receberá um email de confirmação com todos os detalhes.
          </p>
        </div>

        {/* Checkout ID */}
        {checkoutId && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              ID da Transação
            </p>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
              {checkoutId}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <a
            href="/"
            className="block w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            Voltar ao Início
          </a>
          
          <a
            href="/dashboard"
            className="block w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
          >
            Acessar Dashboard
          </a>
        </div>

        {/* Support Info */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Precisa de ajuda?{' '}
            <a href="/suporte" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Entre em contato com o suporte
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
