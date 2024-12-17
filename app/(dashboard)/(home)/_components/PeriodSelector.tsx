'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Period} from '@/types/analytics'
import {useRouter, useSearchParams} from 'next/navigation'
import React from 'react'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] as const

export default function PeriodSelector({periods, selectedPeriod}: {periods: Period[]; selectedPeriod: Period}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <Select
      value={`${selectedPeriod.month}-${selectedPeriod.year}`}
      onValueChange={(value) => {
        const [month, year] = value.split('-')
        const params = new URLSearchParams(searchParams)
        params.set('month', month)
        params.set('year', year)
        router.push(`?${params.toString()}`)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {periods.map((item) => (
          <SelectItem key={`${item.year}-${item.month}`} value={`${item.month}-${item.year}`}>
            {`${monthNames[item.month]} ${item.year}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
