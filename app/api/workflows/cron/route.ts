import {getAppUrl} from '@/lib/helper/apiUrl'
import prisma from '@/lib/prisma'
import {WorkflowStatus} from '@/types/workflow'

export async function GET(req: Request) {
  const now = new Date()
  const workflows = await prisma.workflow.findMany({
    select: {id: true},
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: {not: null},
      nextRunAt: {lte: now}
    }
  })

  console.log('@@workflow to run', workflows.length)
  for (const workflow of workflows) {
    triggerWorkflow(workflow.id)
  }

  return Response.json({workflowToRun: workflows.length}, {status: 200})
}

function triggerWorkflow(id: string) {
  const triggerApiUrl = getAppUrl(`api/workflows/execute?workflowId=${id}`)

  fetch(triggerApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`
    },
    cache: 'no-store'
  }).catch((error) => console.error('error in trigger', id, error.message))
}
