'use client'

import React, {PropsWithChildren} from 'react'
import {Tooltip, TooltipProvider, TooltipTrigger} from './ui/tooltip'
import {TooltipContent} from '@radix-ui/react-tooltip'

type Props = PropsWithChildren<{
  content: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}>

function TooltipWrapper(props: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent side={props.side}>{props.content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper
