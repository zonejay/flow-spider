'use client'

import {CreateFlowNode} from '@/lib/workflow/createFlowNode'
import {TaskType} from '@/types/task'
import {Workflow} from '@prisma/client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import NodeComponent from './nodes/NodeComponent'
import {DragEvent, DragEventHandler, useCallback, useEffect} from 'react'
import {AppNode} from '@/types/appNode'
import DeletableEdge from './edges/DeletableEdge'
import {TaskRegistry} from '@/lib/workflow/task/registry'

type Props = {
  workflow: Workflow
}

const nodeTypes = {
  FlowScrapeNode: NodeComponent
}

const edgeTypes = {
  default: DeletableEdge
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = {padding: 1}

function FlowEditor({workflow}: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const {setViewport, screenToFlowPosition, updateNodeData} = useReactFlow()

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition)
      if (!flow) return
      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
      if (!flow.viewport) return

      const {x = 0, y = 0, zoom = 1} = flow.viewport
      setViewport({x, y, zoom})
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes, setViewport])

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      const taskType = event.dataTransfer.getData('application/reactflow')
      if (typeof taskType === undefined || !taskType) {
        return
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })

      const newNode = CreateFlowNode(taskType as TaskType, position)
      setNodes((prev) => prev.concat(newNode))
    },
    [screenToFlowPosition, setNodes]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log('connection', connection)
      setEdges((prev) => addEdge({...connection, animated: true}, prev))

      if (!connection.targetHandle) return

      const node = nodes.find((node) => node.id === connection.target)
      if (!node) return
      const nodeInputs = node.data.inputs
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: ''
        }
      })
    },
    [setEdges, updateNodeData, nodes]
  )

  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      // 不允许节点自链接
      if (connection.source === connection.target) {
        return false
      }
      // 输入与输出节点必须相同类型
      const source = nodes.find((node) => node.id === connection.source)
      const target = nodes.find((node) => node.id === connection.target)

      if (!source || !target) return false

      const sourceTask = TaskRegistry[source.data.type]
      const targetTask = TaskRegistry[target.data.type]

      const output = sourceTask.outputs.find((o) => o.name === connection.sourceHandle)
      const input = targetTask.outputs.find((o) => o.name === connection.targetHandle)

      if (output?.type !== input?.type) return false

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false

        visited.add(node.id)

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true
          if (hasCycle(outgoer, visited)) return true
        }
      }
      const detectedCycle = hasCycle(target)
      return !detectedCycle
    },
    [nodes, edges]
  )

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor
