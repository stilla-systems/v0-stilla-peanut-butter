"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, type ReactNode } from "react"

interface SearchParamsWrapperProps {
  children: (searchParams: URLSearchParams) => ReactNode
  fallback?: ReactNode
}

function SearchParamsContent({ children }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams()
  return <>{children(searchParams)}</>
}

export default function SearchParamsWrapper({ children, fallback = null }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <SearchParamsContent children={children} fallback={fallback} />
    </Suspense>
  )
}
