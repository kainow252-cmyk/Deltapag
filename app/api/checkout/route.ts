import { NextRequest, NextResponse } from 'next/server'

// Tipos para a API DeltaPag
interface CheckoutRequest {
  planId: string
  amount: number
}

interface DeltaPagCheckoutPayload {
  amount: number
  currency: string
  description: string
  customer_name?: string
  customer_email?: string
  customer_document?: string
  payment_method: string
  subscription: boolean
  subscription_interval?: string
  return_url: string
  cancel_url: string
  metadata?: {
    plan_id: string
  }
}

interface DeltaPagCheckoutResponse {
  id: string
  status: string
  checkout_url: string
  amount: number
  created_at: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()
    const { planId, amount } = body

    // Validação básica
    if (!planId || !amount) {
      return NextResponse.json(
        { error: 'planId e amount são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar valores permitidos
    const allowedAmounts = [19.90, 29.90, 39.90, 49.90]
    if (!allowedAmounts.includes(amount)) {
      return NextResponse.json(
        { error: 'Valor inválido. Valores permitidos: 19.90, 29.90, 39.90, 49.90' },
        { status: 400 }
      )
    }

    // Configuração da API DeltaPag
    const apiKey = process.env.DELTAPAG_API_KEY
    const apiUrl = process.env.DELTAPAG_API_URL || 'https://api.deltapag.com/v1'

    if (!apiKey) {
      console.error('DELTAPAG_API_KEY não configurada')
      return NextResponse.json(
        { error: 'Configuração de API incompleta' },
        { status: 500 }
      )
    }

    // Mapear planos para descrições
    const planNames: Record<string, string> = {
      basic: 'Plano Básico',
      standard: 'Plano Padrão',
      premium: 'Plano Premium',
      enterprise: 'Plano Empresarial'
    }

    // Preparar dados do checkout
    const checkoutData: DeltaPagCheckoutPayload = {
      amount: amount,
      currency: 'BRL',
      description: `Assinatura ${planNames[planId] || 'Mensal'}`,
      payment_method: 'all', // Aceitar todos os métodos de pagamento
      subscription: true,
      subscription_interval: 'monthly',
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/cancel`,
      metadata: {
        plan_id: planId
      }
    }

    // Fazer requisição para API DeltaPag
    const response = await fetch(`${apiUrl}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(checkoutData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Erro DeltaPag:', errorData)
      
      return NextResponse.json(
        { 
          error: 'Erro ao criar checkout',
          details: errorData 
        },
        { status: response.status }
      )
    }

    const checkoutResponse: DeltaPagCheckoutResponse = await response.json()

    // Retornar URL do checkout
    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutResponse.checkout_url,
      checkoutId: checkoutResponse.id,
      amount: checkoutResponse.amount,
      planId: planId
    })

  } catch (error) {
    console.error('Erro no checkout:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

// Método GET para verificar status do checkout
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const checkoutId = searchParams.get('id')

  if (!checkoutId) {
    return NextResponse.json(
      { error: 'ID do checkout não fornecido' },
      { status: 400 }
    )
  }

  try {
    const apiKey = process.env.DELTAPAG_API_KEY
    const apiUrl = process.env.DELTAPAG_API_URL || 'https://api.deltapag.com/v1'

    const response = await fetch(`${apiUrl}/checkout/${checkoutId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro ao consultar checkout' },
        { status: response.status }
      )
    }

    const checkoutData = await response.json()

    return NextResponse.json({
      success: true,
      data: checkoutData
    })

  } catch (error) {
    console.error('Erro ao consultar checkout:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
