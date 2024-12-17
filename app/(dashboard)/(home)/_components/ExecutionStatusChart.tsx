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
import {Layers2} from 'lucide-react'
import {GetWorkflowExecutionsStatus} from '@/actions/analytics/getWorkflowExecutionsStatus'
import {Area, AreaChart, CartesianGrid, XAxis} from 'recharts'

export default function ExecutionStatusChart({data}: {data: Awaited<ReturnType<typeof GetWorkflowExecutionsStatus>>}) {
  const chartConfig = {
    success: {
      label: 'Success',
      color: 'hsl(var(--chart-2))'
    },
    failed: {
      label: 'Failed',
      color: 'hsl(var(--chart-1))'
    }
  }
  return (
    <Card>
      <CardHeader>
        <Layers2 className="w-6 h-6 text-primary" />
        <CardTitle className="text-2xl font-bold flex items-center gap-2">Execution Status</CardTitle>
        <CardDescription>Daily number of successful and failed workflow executions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <AreaChart data={data} height={200} accessibilityLayer margin={{top: 20}}>
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
            <Area
              dataKey={'success'}
              min={0}
              type={'monotone'}
              fill="var(--color-success)"
              fillOpacity={0.6}
              stroke="var(--color-success)"
              stackId={'a'}
            />
            <Area
              dataKey={'failed'}
              min={0}
              type={'monotone'}
              fill="var(--color-failed)"
              fillOpacity={0.6}
              stroke="var(--color-failed)"
              stackId={'a'}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
