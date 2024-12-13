'use server'

import prisma from '@/lib/prisma'
import {duplicateWorkflowSchema, DuplicateWorkflowSchema} from '@/schema/workflow'
import {WorkflowStatus} from '@/types/workflow'
import {auth} from '@clerk/nextjs/server'
import {revalidatePath} from 'next/cache'

export async function DuplicateWorkflow(form: DuplicateWorkflowSchema) {
  const {success, data} = duplicateWorkflowSchema.safeParse(form)
  if (!success) {
    throw new Error('invalid form data')
  }

  const {userId} = auth()
  if (!userId) {
    throw new Error('unauthenticated')
  }

  const sourceWorkflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: data.workflowId
    }
  })

  if (!sourceWorkflow) {
    throw new Error('workflow not found')
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
      status: WorkflowStatus.DRAFT,
      definition: sourceWorkflow.definition
    }
  })

  if (!result) {
    throw new Error('Failed to duplicate workflow')
  }

  revalidatePath('/workflows')
}
