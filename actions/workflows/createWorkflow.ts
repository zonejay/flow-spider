'use server'

import prisma from '@/lib/prisma'
import {createWorkflowSchema, CreateWorkflowSchema} from '@/schema/workflow'
import {WorkflowStatus} from '@/types/workflow'
import {auth} from '@clerk/nextjs/server'
import {redirect} from 'next/navigation'

export async function CreateWorkflow(form: CreateWorkflowSchema) {
  const {success, data} = createWorkflowSchema.safeParse(form)

  if (!success) {
    throw new Error('invalid form data')
  }

  const {userId} = auth()

  if (!userId) {
    throw new Error('unathenticated')
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: 'TODO',
      ...data
    }
  })

  if (!result) {
    throw new Error('failed to create workflow')
  }

  redirect(`/workflow/editor/${result.id}`)
}
