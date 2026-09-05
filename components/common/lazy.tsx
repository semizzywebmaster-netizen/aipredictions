'use client'
import dynamic from 'next/dynamic'
import { LoadingState } from '@/components/ui/empty-state'

export const LazyFootballDashboard = dynamic(() => import('@/features/football/dashboard'), { loading: () => <LoadingState title="Loading football dashboard..." />, ssr: false })
export const LazyBasketballDashboard = dynamic(() => import('@/features/basketball/dashboard'), { loading: () => <LoadingState title="Loading basketball dashboard..." />, ssr: false })
