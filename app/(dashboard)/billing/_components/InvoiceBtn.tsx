'use client'

import {DownloadInvoice} from '@/actions/billing/downloadInvoice'
import {Button} from '@/components/ui/button'
import {useMutation} from '@tanstack/react-query'
import {Loader2Icon} from 'lucide-react'
import React from 'react'
import {toast} from 'sonner'

export default function InvoiceBtn({id}: {id: string}) {
  const mutation = useMutation({
    mutationFn: DownloadInvoice,
    onSuccess: (data) => {
      window.location.href = data as string
    },
    onError: () => {
      toast.error('something went wrong', {id})
    }
  })
  return (
    <Button
      onClick={() => {
        mutation.mutate(id)
      }}
      disabled={mutation.isPending}
      variant={'ghost'}
      size={'sm'}
      className="text-xs gap-2 text-muted-foreground px-1"
    >
      Invoice
      {mutation.isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
    </Button>
  )
}
