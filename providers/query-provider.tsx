"use client"

import type { IRootLayout } from '@/types'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function QueryProvider({ children }: IRootLayout) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
        staleTime: Infinity
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}