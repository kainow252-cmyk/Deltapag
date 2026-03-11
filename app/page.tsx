'use client'

import { useState } from 'react'

const plans = [
  {
    id: 'basic',
    name: 'Básico',
    price: 19.90,
    features: [
      'Acesso básico à plataforma',
      'Suporte por email',
      '1 GB de armazenamento',
      'Relatórios mensais'
    ],
    popular: false
  },
  {
    id: 'standard',
    name: 'Padrão',
    price: 29.90,
    features: [
      'Acesso completo à plataforma',
      'Suporte prioritário',
      '5 GB de armazenamento',
      'Relatórios semanais',
      'API de integração'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 39.90,
    features: [
      'Acesso ilimitado',
      'Suporte 24/7',
      '20 GB de armazenamento',
      'Relatórios diários',
      'API avançada',
      'Webhooks personalizados'
    ],
    popular: false
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: 49.90,
    features: [
      'Recursos empresariais',
      'Suporte dedicado',
      'Armazenamento ilimitado',
      'Relatórios em tempo real',
      'API completa',
      'Webhooks customizados',
      'Gerente de conta dedicado'
    ],
    popular: false
  }
]

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async (planId: string, price: number) => {
    setLoading(planId)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          amount: price,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar checkout')
      }

      // Redirecionar para o link de checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      console.error('Erro:', err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Escolha Seu Plano
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Selecione o plano ideal para suas necessidades
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-medium">Erro</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  POPULAR
                </div>
              )}

              <div className="p-6">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    R$ {plan.price.toFixed(2)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
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
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(plan.id, plan.price)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-gray-800 hover:bg-gray-900'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processando...
                    </span>
                  ) : (
                    'Assinar Agora'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Todos os planos incluem 7 dias de teste grátis • Cancele quando quiser
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            Pagamento seguro processado por DeltaPag
          </p>
        </div>
      </div>
    </main>
  )
}
