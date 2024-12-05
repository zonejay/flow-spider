'use client'

import React from 'react'
import type {LucideIcon} from 'lucide-react'
import {DialogHeader} from './ui/dialog'
import {DialogTitle} from '@radix-ui/react-dialog'
import {cn} from '@/lib/utils'
import {Separator} from './ui/separator'

type Props = {
  icon: LucideIcon
  title?: string
  subTitle?: string

  iconClassName?: string
  titleClassName?: string
  subtitleClassName?: string
}

function CustomDialogHeader({icon: Icon, subTitle, title, ...classes}: Props) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && <Icon size={30} className={cn('stroke-primary', classes.iconClassName)} />}
          {title && <p className={cn('text-xl text-primary', classes.titleClassName)}>{title}</p>}
          {subTitle && <p className={cn('text-sm text-muted-foreground', classes.subtitleClassName)}>{subTitle}</p>}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  )
}

export default CustomDialogHeader
