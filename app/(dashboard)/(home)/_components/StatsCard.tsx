import ReactCountUpWrapper from '@/components/ReactCountUpWrapper'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import type {LucideIcon} from 'lucide-react'
import React from 'react'

export default function StatsCard({title, value, ...props}: {title: string; value: number; icon: LucideIcon}) {
  return (
    <Card className="relative overflow-hidden h-full">
      <CardHeader
        className="flex pb-2:w
      "
      >
        <CardTitle>{title}</CardTitle>
        <props.icon
          size={120}
          className="text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-10"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <ReactCountUpWrapper value={value} />
        </div>
      </CardContent>
    </Card>
  )
}
