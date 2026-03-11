import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DeltaPag - Planos de Assinatura',
  description: 'Escolha o plano ideal para você',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
