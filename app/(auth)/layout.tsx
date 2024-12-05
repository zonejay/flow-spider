import Logo from '@/components/Logo'
import React, {PropsWithChildren} from 'react'

function layout({children}: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo />
      {children}
    </div>
  )
}

export default layout
