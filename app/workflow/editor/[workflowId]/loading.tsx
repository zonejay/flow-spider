import {Loader2Icon} from 'lucide-react'

function loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2Icon size={30} className="animate-spin stroke-primary" />
    </div>
  )
}

export default loading
