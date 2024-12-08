'use server'

import prisma from '@/lib/prisma'
import {WorkflowStatus} from '@/types/workflow'
import {auth} from '@clerk/nextjs/server'
import {revalidatePath} from 'next/cache'

export default async function UpdateWorkflow({id, definition}: {id: string; definition: string}) {
  const {userId} = auth()

  if (!userId) {
    throw new Error('unathenticated')
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId
    }
  })

  if (!workflow) throw new Error('Workflow not found')

  if (workflow.status !== WorkflowStatus.DRAFT) throw new Error('Workflow is not draft')

  await prisma.workflow.update({
    where: {
      id,
      userId
    },
    data: {
      definition
    }
  })

  revalidatePath('/workflows')
}
