'use client'

import {cn} from '@/lib/utils'
import {TaskParam} from '@/types/task'
import {Handle, Position} from '@xyflow/react'
import {PropsWithChildren} from 'react'
import {ColorForHandle} from './Common'

export function NodeOutputs({children}: PropsWithChildren) {
  return <div className="flex flex-col divide-y gap-1">{children}</div>
}

export function NodeOutput({output}: {output: TaskParam; nodeId: string}) {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        className={cn(
          '!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4',
          ColorForHandle[output.type]
        )}
        id={output.name}
        type="source"
        position={Position.Right}
      />
    </div>
  )
}
