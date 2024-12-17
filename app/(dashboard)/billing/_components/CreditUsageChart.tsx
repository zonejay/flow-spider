'use client'

import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {ChartColumnStackedIcon, Layers2} from 'lucide-react'
import {GetWorkflowExecutionsStatus} from '@/actions/analytics/getWorkflowExecutionsStatus'
import {Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis} from 'recharts'
import {GetCredentialsForUser} from '@/actions/credentials/getUserCredentials'
import {GetCreditsUsageInPeriod} from '@/actions/analytics/getCreditsUsageInPeriod'

export default function CreditUsageChart({
  data,
  title,
  description
}: {
  title: string
  description: string
  data: Awaited<ReturnType<typeof GetCreditsUsageInPeriod>>
}) {
  const chartConfig = {
    success: {
      label: 'Successful Phases credits',
      color: 'hsl(var(--chart-2))'
    },
    failed: {
      label: 'Failed Phases credits',
      color: 'hsl(var(--chart-1))'
    }
  }
  return (
    <Card>
      <CardHeader>
        <ChartColumnStackedIcon className="w-6 h-6 text-primary" />
        <CardTitle className="text-2xl font-bold flex items-center gap-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart data={data} height={200} accessibilityLayer margin={{top: 20}}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={'date'}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('zh-CN', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip content={<ChartTooltipContent className="w-[250px]" />} />
            <Bar
              dataKey={'success'}
              type={'monotone'}
              fill="var(--color-success)"
              fillOpacity={0.8}
              radius={[0, 0, 4, 4]}
              stroke="var(--color-success)"
              stackId={'a'}
            />
            <Bar
              dataKey={'failed'}
              type={'monotone'}
              fill="var(--color-failed)"
              fillOpacity={0.8}
              radius={[4, 4, 0, 0]}
              stroke="var(--color-failed)"
              stackId={'a'}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
