'use client'

import {ParamProps} from '@/types/appNode'

export default function BrowserInstanceParam({param, updateNodeParamValue, value}: ParamProps) {
  return <p className="text-xs">{param.name}</p>
}
